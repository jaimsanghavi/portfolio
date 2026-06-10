export function GridLayer() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <div className="mx-auto grid h-full max-w-6xl grid-cols-2 md:grid-cols-4 border-x border-grid/70 px-0">
        <div className="border-r border-grid/50" />
        <div className="hidden md:block border-r border-grid/50" />
        <div className="hidden md:block border-r border-grid/50" />
        <div />
      </div>
    </div>
  );
}
