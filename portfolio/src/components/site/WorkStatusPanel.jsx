import { Status, Text } from "@/components/ds";

export function WorkStatusPanel({ heading, body, status, id = "work-status-title" }) {
  return (
    <section className="work-status" aria-labelledby={id}>
      <Status>{status}</Status>
      <Text as="h2" variant="h2" id={id}>{heading}</Text>
      <Text variant="body">{body}</Text>
    </section>
  );
}
