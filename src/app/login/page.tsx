import { PageIntro, SiteShell } from "@/components/site-shell";
import { LoginPanel } from "@/components/login-panel";

export default function LoginPage() {
  return (
    <SiteShell>
      <PageIntro
        eyebrow="Login"
        title="Sign in to keep your BRAVA routes and rides"
        description="Use Google to access your account, save your routes, sync Strava and keep your BRAVA activity tied to your profile."
      />
      <section className="px-6 pb-10 sm:px-8 lg:px-10">
        <LoginPanel />
      </section>
    </SiteShell>
  );
}
