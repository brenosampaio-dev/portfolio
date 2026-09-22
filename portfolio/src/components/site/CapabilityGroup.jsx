import { Status, Text } from "@/components/ds";

export function CapabilityGroup({ title, status, items }) {
  return (
    <article className="capability-group">
      <div className="capability-group__head">
        <Text as="h3" variant="h3">{title}</Text>
        <Status>{status}</Status>
      </div>
      <ul className="capability-group__list">
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </article>
  );
}
