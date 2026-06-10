import type { CSSProperties } from "react";

export function ScatterText({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {[...text].map((ch, i) => {
          const r = ((i * 137) % 17) - 8;
          const y = ((i * 89) % 13) - 6;
          const style = { "--scatter-r": `${r}deg`, "--scatter-y": `${y}px` } as CSSProperties;
          return (
            <span key={i} data-scatter-letter className="inline-block" style={style}>
              {ch === " " ? " " : ch}
            </span>
          );
        })}
      </span>
    </span>
  );
}
