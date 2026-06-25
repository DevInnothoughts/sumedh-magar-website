export default function SectionHeading({ eyebrow, title, sub, center }: { eyebrow?: string; title: string; sub?: string; center?: boolean }) {
  return (
    <div className={center ? 'text-center max-w-3xl mx-auto mb-12' : 'max-w-3xl mb-12'}>
      {eyebrow && <span className="eyebrow mb-4">{eyebrow}</span>}
      <h2 className="mt-3 text-4xl md:text-5xl font-bold text-navy leading-tight">{title}</h2>
      {sub && <p className="mt-4 text-muted-foreground text-lg">{sub}</p>}
    </div>
  );
}
