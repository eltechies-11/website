export function SiteAtmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-navy" />
      <div className="surface-grid absolute inset-0 opacity-40" />
      <div className="animate-pulse-glow absolute -left-24 top-24 h-72 w-72 rounded-full bg-cyan/15 blur-3xl" />
      <div className="animate-float absolute right-[-6rem] top-[28%] h-80 w-80 rounded-full bg-blue/25 blur-3xl" />
      <div className="animate-float-delayed absolute bottom-[-4rem] left-[20%] h-64 w-64 rounded-full bg-cyan/10 blur-3xl" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-navy via-navy/80 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy via-navy/80 to-transparent" />
    </div>
  );
}
