import { EmailerDashboard } from "@dreamplay/emailer/dashboard";

export default function EmailerPage() {
  return (
    <EmailerDashboard
      title="Belgium Concert Emailer"
      initialWorkspace="concert_marketing"
      workspaces={["concert_marketing"]}
      apiBasePath="/api/emailer/editor"
    />
  );
}
