import type { CSSProperties } from "react";

export function ScatterText({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className} aria-label={text}>
      {[...text].map((ch, i) => {
        const r = ((i * 137) % 17) - 8;
        const y = ((i * 89) % 13) - 6;
        const style = { "--scatter-r": `${r}deg`, "--scatter-y": `${y}px` } as CSSProperties;
        return (
          <span key={i} aria-hidden data-scatter-letter className="inline-block" style={style}>
            {ch === " " ? " " : ch}
          </span>
        );
      })}
    </span>
  );
}
