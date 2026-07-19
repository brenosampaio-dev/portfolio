import { Reveal } from "@/components/site/Reveal";

/*
 * CaseSnapshot — compact, scannable fact strip (role / type / platform /
 * stack / status / delivered). Sits between the hero lede and the mockup so
 * a reader can read the essentials in five seconds, before any prose.
 * No icons — this is information, not decoration.
 */
export function CaseSnapshot({ items = [] }) {
  return (
    <Reveal className="case-facts">
      {items.map((item) => (
        <div className="case-facts__item" key={item.label}>
          <span className="case-facts__label">{item.label}</span>
          <span className="case-facts__value">{item.value}</span>
        </div>
      ))}
    </Reveal>
  );
}
