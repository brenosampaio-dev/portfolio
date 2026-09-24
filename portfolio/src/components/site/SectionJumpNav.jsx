export function SectionJumpNav({ sections, label, title }) {
  if (!sections.length) return null;

  return (
    <nav className="section-jump-nav" aria-label={label}>
      <span className="section-jump-nav__title">{title}</span>
      {sections.map((section) => (
        <a key={section.id} href={`#${section.id}`}>
          {section.label}
        </a>
      ))}
    </nav>
  );
}
