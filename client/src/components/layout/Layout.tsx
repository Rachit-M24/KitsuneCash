import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className="min-h-svh bg-background text-foreground">
      <Outlet />
    </div>
  );
}
