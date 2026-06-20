import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../constants/app.routes";


export interface NavItem {
  key: string;
  label: string;
  icon: string;
  path: string;
}

export interface UseBottomNavbarReturn {
  navItems: NavItem[];
  isActive: (path: string) => boolean;
  navigateTo: (path: string) => void;
  activePathname: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    key: "speech",
    label: "Voice",
    icon: "Mic",
    path: APP_ROUTES.dashboard,
  },
  {
    key: "ai",
    label: "AI",
    icon: "Sparkles",
    path: APP_ROUTES.dashboard,
  },
  {
    key: "budget",
    label: "Budget",
    icon: "Wallet",
    path: APP_ROUTES.budget,
  },
  {
    key: "expense",
    label: "Expense",
    icon: "Receipt",
    path: APP_ROUTES.expense,
  },
  {
    key: "category",
    label: "Category",
    icon: "Tag",
    path: APP_ROUTES.category,
  },
  {
    key: "goal",
    label: "Goal",
    icon: "Target",
    path: APP_ROUTES.goal,
  },
  {
    key: "settings",
    label: "Settings",
    icon: "Settings",
    path: APP_ROUTES.settings,
  },
];

export function useBottomNavbar(): UseBottomNavbarReturn {
  const location = useLocation();
  const navigate = useNavigate();

  const activePathname = location.pathname;

  /**
   * A route is considered active when the current pathname starts with the
   * nav item's path. This supports nested routes (e.g. /expense/123 still
   * highlights the Expense tab).
   */
  const isActive = useCallback(
    (path: string): boolean => {
      return activePathname === path || activePathname.startsWith(`${path}/`);
    },
    [activePathname],
  );

  const navigateTo = useCallback(
    (path: string): void => {
      navigate(path);
    },
    [navigate],
  );

  return {
    navItems: NAV_ITEMS,
    isActive,
    navigateTo,
    activePathname,
  };
}
