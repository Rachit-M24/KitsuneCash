import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, Shield, Sparkles, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AUTH_ROUTES } from "@/constants/auth.routes";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import FloatingLines from "@/components/animations/FloatLines/FloatingLines";
import CurvedLoop from "@/components/animations/CurvedLoop/CurverLoopText";

const features = [
  {
    icon: Wallet,
    title: "Unified wallet",
    description:
      "See every account, balance, and transaction in one calm, focused view.",
  },
  {
    icon: BarChart3,
    title: "Insightful budgets",
    description:
      "Set goals, track spending patterns, and stay ahead of your month.",
  },
  {
    icon: Shield,
    title: "Built for trust",
    description:
      "Secure authentication and thoughtful design keep your data protected.",
  },
] as const;

export function HomePage() {
  const { isAuthenticated, actions } = useAuth();

  return (
    <main className="relative min-h-svh overflow-x-hidden bg-zinc-950 text-white">
      <div className="pointer-events-none fixed inset-0 z-0">
        <FloatingLines
          enabledWaves={["top", "middle", "bottom"]}
          lineCount={8}
          lineDistance={8}
          bendRadius={8}
          bendStrength={-2}
          interactive
          parallax
          animationSpeed={1}
          linesGradient={["#ff6800", "#6f6f6f", "#6a6a6a"]}
        />
      </div>

      <div className="pointer-events-none fixed inset-0 -z-10 bg-linear-to-b from-zinc-950/30 via-zinc-950/70 to-zinc-950" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(255,104,0,0.18),transparent)]" />

      <header className="sticky top-0 z-50 border-b border-white/5 bg-zinc-950/60 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-xl bg-orange-500/15 ring-1 ring-orange-500/30">
              <Sparkles className="size-4 text-orange-400" aria-hidden />
            </span>
            <span className="text-sm font-semibold tracking-wide sm:text-base">
              KitsuneCash
            </span>
          </div>

          <nav className="flex items-center gap-2 sm:gap-3">
            {isAuthenticated ? (
              <Button
                variant="outline"
                size="sm"
                className="border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                onClick={() => void actions.logOut()}
              >
                Sign out
              </Button>
            ) : (
              <>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="hidden text-white/70 hover:bg-white/10 hover:text-white sm:inline-flex"
                >
                  <Link to={AUTH_ROUTES.login}>Sign in</Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className="bg-orange-500 text-white shadow-lg shadow-orange-500/25 hover:bg-orange-400"
                >
                  <Link to={AUTH_ROUTES.register}>Get started</Link>
                </Button>
              </>
            )}
          </nav>
        </div>
      </header>

      <section className="relative mx-auto max-w-6xl px-4 pb-16 pt-12 sm:px-6 sm:pb-24 sm:pt-20 lg:px-8 lg:pt-28">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-xs font-medium tracking-wide text-orange-200 sm:text-sm">
            <span className="size-1.5 rounded-full bg-orange-400" />
            Personal finance, reimagined
          </div>

          <h1 className="text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="block text-white/90">Your money,</span>
            <span className="mt-1 block bg-gradient-to-r from-orange-300 via-orange-400 to-amber-200 bg-clip-text text-transparent">
              beautifully clear.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:mt-8 sm:text-lg md:text-xl">
            KitsuneCash brings clarity to spending, saving, and planning — so
            every decision feels intentional.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4">
            {isAuthenticated ? (
              <Button
                variant="outline"
                size="lg"
                className="h-11 w-full min-w-[10rem] border-white/10 bg-white/5 px-6 text-white hover:bg-white/10 hover:text-white sm:w-auto"
                onClick={() => void actions.logOut()}
              >
                Sign out
              </Button>
            ) : (
              <>
                <Button
                  asChild
                  size="lg"
                  className="group h-11 w-full min-w-[10rem] bg-orange-500 px-6 text-white shadow-xl shadow-orange-500/30 hover:bg-orange-400 sm:w-auto"
                >
                  <Link to={AUTH_ROUTES.register}>
                    Create free account
                    <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-11 w-full min-w-[10rem] border-white/15 bg-white/5 px-6 text-white hover:bg-white/10 hover:text-white sm:w-auto"
                >
                  <Link to={AUTH_ROUTES.login}>Sign in</Link>
                </Button>
              </>
            )}
          </div>

          <dl className="mt-12 grid grid-cols-3 gap-3 border-t border-white/5 pt-8 sm:mt-16 sm:gap-6">
            {[
              { label: "Setup", value: "< 2 min" },
              { label: "Accounts", value: "Unlimited" },
              { label: "Cost", value: "Free" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <dt className="text-[0.65rem] font-medium uppercase tracking-widest text-zinc-500 sm:text-xs">
                  {stat.label}
                </dt>
                <dd className="mt-1 text-lg font-semibold text-white sm:text-xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-4 pb-20 sm:px-6 sm:pb-28 lg:px-8">
        <div className="mb-8 text-center sm:mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-400/80">
            Why KitsuneCash
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Everything you need to stay in control
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className={cn(
                "group relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] p-6 backdrop-blur-sm transition-colors",
                "hover:border-orange-500/25 hover:bg-white/[0.05]",
              )}
            >
              <div className="pointer-events-none absolute -right-6 -top-6 size-24 rounded-full bg-orange-500/10 blur-2xl transition-opacity group-hover:opacity-100 opacity-0" />
              <div className="relative">
                <div className="mb-4 inline-flex size-11 items-center justify-center rounded-xl bg-orange-500/10 ring-1 ring-orange-500/20">
                  <feature.icon
                    className="size-5 text-orange-400"
                    aria-hidden
                  />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {feature.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {!isAuthenticated && (
        <section className="relative mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-orange-500/20 bg-gradient-to-br from-orange-500/15 via-white/[0.04] to-transparent px-6 py-10 text-center sm:px-10 sm:py-14">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,104,0,0.2),transparent_55%)]" />
            <div className="relative">
              <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Ready to take the first step?
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-zinc-400 sm:text-base">
                Join KitsuneCash today and turn everyday spending into confident
                financial momentum.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="h-11 w-full bg-orange-500 px-6 text-white shadow-lg shadow-orange-500/25 hover:bg-orange-400 sm:w-auto"
                >
                  <Link to={AUTH_ROUTES.register}>Create account</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-11 w-full border-white/15 bg-transparent px-6 text-white hover:bg-white/10 hover:text-white sm:w-auto"
                >
                  <Link to={AUTH_ROUTES.login}>I already have an account</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="relative w-full overflow-hidden border-t border-white/5 pb-6 pt-2 opacity-70 [&>div]:!h-24 [&>div]:!min-h-0 [&>div]:!items-end sm:[&>div]:!h-32">
        <CurvedLoop
          marqueeText="KitsuneCash · Smart money · Clear decisions · "
          speed={1.5}
          curveAmount={180}
          interactive={true}
          className="fill-orange-400/70"
        />
      </section>

      <footer className="border-t border-white/5 px-4 py-8 text-center text-xs text-zinc-500 sm:px-6">
        <p>
          &copy; {new Date().getFullYear()} KitsuneCash. Crafted for clarity.
        </p>
      </footer>
    </main>
  );
}
