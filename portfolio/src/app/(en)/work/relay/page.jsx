import { RelayCaseContent } from "@/components/site/RelayCaseContent";

export const metadata = {
  title: "Relay — Ecommerce exception decision workspace",
  description: "A research prototype for investigating, assigning and resolving cross-border ecommerce exceptions with synthetic data.",
  alternates: { canonical: "/work/relay", languages: { "en-CA": "/work/relay", "fr-CA": "/fr/work/relay" } },
};

export default function RelayCasePage() {
  return <RelayCaseContent lang="en" />;
}
