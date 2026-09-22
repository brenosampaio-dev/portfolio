import { SupportCaseContent } from "@/components/site/SupportCaseContent";

export const metadata = {
  title: "Access Restored — Windows 11 & Microsoft 365 Support Lab",
  description: "An independent Windows 11 and Microsoft 365 access-support simulation showing layered diagnosis, PowerShell evidence, safe resolution, validation and escalation boundaries.",
  alternates: { canonical: "/work/access-restored" },
};

export default function AccessRestoredCase() {
  return <SupportCaseContent slug="access-restored" />;
}
