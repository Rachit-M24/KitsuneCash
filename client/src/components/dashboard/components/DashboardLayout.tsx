import { Link, useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { BottomNavbar } from "@/components/navbar/BottomNavbar";
import FloatingLines from "@/components/animations/FloatLines/FloatingLines";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { actions } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="relative min-h-svh overflow-hidden bg-zinc-950 text-white">
      <div className="pointer-events-none fixed inset-0 z-0">
        <FloatingLines
          enabledWaves={["top", "bottom"]}
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

      <div className="pointer-events-none fixed inset-0 z-[1] bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(255,104,0,0.12),transparent)]" />

      <div className="pointer-events-none fixed inset-0 z-[2] bg-zinc-950/55" />

      <div className="relative z-10 flex min-h-svh flex-col">
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


          </div>
        </header>

        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 pb-24 sm:px-6 sm:py-10 sm:pb-28 lg:px-8">
          {children}
        </main>

        <BottomNavbar />
      </div>
    </div>
  );
}