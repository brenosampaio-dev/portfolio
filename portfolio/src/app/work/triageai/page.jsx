import { TriageAIContent } from "@/components/site/TriageAIContent";

export const metadata = {
  title: "Multilingual Support Triage",
  description:
    "Technical-functional concept for structuring, prioritising and routing multilingual support requests with human approval, escalation rules and failure handling.",
  alternates: {
    canonical: "/work/triageai",
  },
};

export default function TriageAICase() {
  return <TriageAIContent />;
}
