export function SectionLabel({ no, title }: { no: string; title: string }) {
  return (
    <p className="mb-10 font-mono text-[11px] tracking-[0.25em] text-accent" data-reveal="rise">
      SEC.{no} — {title}
    </p>
  );
}
