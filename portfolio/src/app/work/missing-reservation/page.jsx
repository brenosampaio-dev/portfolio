import { SupportCaseContent } from "@/components/site/SupportCaseContent";

export const metadata = {
  title: "The Missing Reservation — SaaS Application Support Lab",
  description: "A synthetic SaaS application-support incident traced through HTTP, JSON, webhook logs, scoped SQL, controlled replay and an engineering-ready escalation.",
  alternates: { canonical: "/work/missing-reservation" },
};

export default function MissingReservationCase() {
  return <SupportCaseContent slug="missing-reservation" />;
}
