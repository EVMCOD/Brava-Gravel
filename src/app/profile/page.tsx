import { PageIntro, SiteShell } from "@/components/site-shell";
import { getDefaultUser, listUploadedRoutes } from "@/lib/db";

export default function ProfilePage() {
  const user = getDefaultUser();
  const routes = listUploadedRoutes();

  return (
    <SiteShell>
      <PageIntro
        eyebrow="Profile"
        title={user.name}
        description="A first local profile view tying routes to a rider identity. Next step is proper auth and multi-user separation."
      />
      <section className="grid gap-6 px-6 pb-10 sm:px-8 lg:grid-cols-[0.72fr_1.28fr] lg:px-10">
        <article className="rounded-[30px] border border-white/10 bg-white p-6 shadow-sm text-stone-900">
          <p className="text-sm text-stone-500">Home region</p>
          <p className="mt-2 text-2xl font-semibold">{user.home_region}</p>
          <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
            <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
              <p className="text-stone-500">Saved routes</p>
              <p className="mt-2 text-xl font-semibold text-stone-950">{routes.length}</p>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
              <p className="text-stone-500">Account type</p>
              <p className="mt-2 text-xl font-semibold text-stone-950">Founder</p>
            </div>
          </div>
        </article>

        <article className="rounded-[30px] border border-white/10 bg-white p-6 shadow-sm text-stone-900">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-stone-500">Recent route library</p>
          <div className="mt-5 space-y-3">
            {routes.length > 0 ? (
              routes.map((route) => (
                <div key={route.id} className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
                  <p className="text-base font-semibold text-stone-950">{route.name}</p>
                  <div className="mt-2 flex flex-wrap gap-3 text-sm text-stone-600">
                    <span>{route.distance_km} km</span>
                    <span>{route.elevation_gain_m} m+</span>
                    <span>{route.point_count} pts</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm leading-7 text-stone-600">No routes uploaded yet.</p>
            )}
          </div>
        </article>
      </section>
    </SiteShell>
  );
}
