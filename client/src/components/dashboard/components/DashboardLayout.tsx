import { Link, useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { actions } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-svh bg-zinc-950 text-white">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(255,104,0,0.12),transparent)]" />

      <header className="sticky top-0 z-50 border-b border-white/5 bg-zinc-950/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/dashboard" className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-xl bg-orange-500/15 ring-1 ring-orange-500/30">
              <Sparkles className="size-4 text-orange-400" aria-hidden />
            </span>
            <span className="text-sm font-semibold tracking-wide sm:text-base">
              KitsuneCash
            </span>
          </Link>

          <nav className="flex items-center gap-2 sm:gap-3">
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="text-white/70 hover:bg-white/10 hover:text-white"
            >
              <Link to="/">Home</Link>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white"
              onClick={() => {
                void actions.logOut();
                navigate("/");
              }}
            >
              Sign out
            </Button>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        {children}
      </main>
    </div>
  );
}
