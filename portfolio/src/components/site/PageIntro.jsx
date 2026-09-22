import { Text } from "@/components/ds";
import { Reveal } from "@/components/site/Reveal";
import { Scramble } from "@/components/site/Scramble";

export function PageIntro({ eyebrow, title, lead, actions }) {
  return (
    <div className="page-intro">
      <Scramble className="eyebrow eyebrow--accent" text={eyebrow} delay={80} />
      <Reveal mask delay={50}>
        <Text variant="display">{title}</Text>
      </Reveal>
      <Reveal delay={140}>
        <Text variant="body-lg" style={{ color: "var(--graphite)", maxWidth: "58ch" }}>{lead}</Text>
      </Reveal>
      {actions ? <Reveal className="page-intro__actions" delay={200}>{actions}</Reveal> : null}
    </div>
  );
}
