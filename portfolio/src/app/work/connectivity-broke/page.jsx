import { SupportCaseContent } from "@/components/site/SupportCaseContent";

export const metadata = {
  title: "Where Connectivity Broke — L1 Network Support Lab",
  description: "An independent L1 network-support simulation using Windows commands to isolate a DNS failure distributed through DHCP, validate the fix and document escalation thresholds.",
  alternates: { canonical: "/work/connectivity-broke" },
};

export default function ConnectivityBrokeCase() {
  return <SupportCaseContent slug="connectivity-broke" />;
}
