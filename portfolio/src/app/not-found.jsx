import Link from "next/link";
import { Text } from "@/components/ds";

export default function NotFound() {
  return (
    <section className="container not-found" aria-labelledby="not-found-title">
      <span className="eyebrow eyebrow--accent">404 · Page not found</span>
      <Text variant="display" id="not-found-title">
        This route has no <span className="accent">next action</span>.
      </Text>
      <p>
        The page may have moved. Return to the selected work or start again from the home page.
      </p>
      <div className="not-found__actions">
        <Link href="/#work" className="link-arrow">Explore selected work <span aria-hidden="true">↗</span></Link>
        <Link href="/">Go home</Link>
      </div>
    </section>
  );
}
