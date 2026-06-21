// Particle target generators. Each returns flat xyz position + rgb color buffers
// of length n*3, mapped into a shared world plane so any two targets can be
// morphed into each other by lerping position/color per particle index.

export interface TargetData {
  positions: Float32Array;
  colors: Float32Array;
}

const SPAN_X = 10; // world units across the sampling plane (compact, denser type)

const WARM: [number, number, number] = [0.96, 0.93, 0.86];
const ACCENT: [number, number, number] = [0.88, 0.42, 0.22];

export function chaosTarget(n: number): TargetData {
  const positions = new Float32Array(n * 3);
  const colors = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const r = Math.pow(Math.random(), 0.45) * 7.5;
    const a = Math.random() * Math.PI * 2;
    positions[i * 3] = Math.cos(a) * r;
    positions[i * 3 + 1] = Math.sin(a) * r * 0.62;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 7;
    const c = Math.random() < 0.12 ? ACCENT : WARM;
    colors[i * 3] = c[0];
    colors[i * 3 + 1] = c[1];
    colors[i * 3 + 2] = c[2];
  }
  return { positions, colors };
}

interface Sample {
  cand: number[];
  cols: number[];
  w: number;
  h: number;
}

function collect(
  w: number,
  h: number,
  draw: (ctx: CanvasRenderingContext2D, w: number, h: number) => void,
  alphaMin: number,
): Sample {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d", { willReadFrequently: true })!;
  draw(ctx, w, h);
  const d = ctx.getImageData(0, 0, w, h).data;
  const cand: number[] = [];
  const cols: number[] = [];
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 4;
      if (d[idx + 3] > alphaMin) {
        cand.push(x, y);
        cols.push(d[idx], d[idx + 1], d[idx + 2]);
      }
    }
  }
  return { cand, cols, w, h };
}

function toTargets(s: Sample, n: number, jitterZ: number, span: number, recolor?: (i: number) => [number, number, number]): TargetData {
  const { cand, cols, w, h } = s;
  const count = cand.length / 2;
  const positions = new Float32Array(n * 3);
  const colors = new Float32Array(n * 3);
  const spanX = span;
  const spanY = (spanX * h) / w;
  for (let i = 0; i < n; i++) {
    const j = count ? Math.floor(Math.random() * count) : 0;
    const px = cand[j * 2] ?? w / 2;
    const py = cand[j * 2 + 1] ?? h / 2;
    positions[i * 3] = (px / w - 0.5) * spanX + (Math.random() - 0.5) * 0.03;
    positions[i * 3 + 1] = -(py / h - 0.5) * spanY + (Math.random() - 0.5) * 0.03;
    positions[i * 3 + 2] = (Math.random() - 0.5) * jitterZ;
    const c = recolor ? recolor(i) : ([cols[j * 3] / 255, cols[j * 3 + 1] / 255, cols[j * 3 + 2] / 255] as [number, number, number]);
    colors[i * 3] = c[0];
    colors[i * 3 + 1] = c[1];
    colors[i * 3 + 2] = c[2];
  }
  return { positions, colors };
}

export function textTarget(text: string, n: number, span: number = SPAN_X): TargetData {
  const w = 1000;
  const h = 320;
  const s = collect(
    w,
    h,
    (ctx) => {
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      let fs = 240;
      ctx.font = `700 ${fs}px "Space Grotesk", system-ui, sans-serif`;
      while (ctx.measureText(text).width > w * 0.92 && fs > 20) {
        fs -= 8;
        ctx.font = `700 ${fs}px "Space Grotesk", system-ui, sans-serif`;
      }
      ctx.fillText(text, w / 2, h / 2);
    },
    128,
  );
  return toTargets(s, n, 0.28, span, (i) => (i % 8 === 0 ? ACCENT : WARM));
}

