import {
    Mic,
    Sparkles,
    Wallet,
    Receipt,
    Tag,
    Target,
    Settings,
    type LucideIcon,
} from "lucide-react";
import { useBottomNavbar, type NavItem } from "./useBottomNavbar";

const ICON_MAP: Record<string, LucideIcon> = {
    Mic,
    Sparkles,
    Wallet,
    Receipt,
    Tag,
    Target,
    Settings,
};


interface NavButtonProps {
    item: NavItem;
    active: boolean;
    onClick: () => void;
}

function NavButton({ item, active, onClick }: NavButtonProps) {
    const Icon = ICON_MAP[item.icon] ?? Wallet;

    return (
        <button
            id={`nav-btn-${item.key}`}
            type="button"
            aria-label={`Navigate to ${item.label}`}
            aria-current={active ? "page" : undefined}
            onClick={onClick}
            className={[
                "relative flex flex-col items-center justify-center gap-0.5",
                "flex-1 min-w-0 h-full px-1 py-2",
                "text-[10px] font-medium leading-none tracking-wide",
                "transition-all duration-200 ease-out",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950",
                "select-none cursor-pointer",
                active
                    ? "text-orange-400"
                    : "text-zinc-500 hover:text-zinc-300",
            ]
                .join(" ")
                .trim()}
        >
            {active && (
                <span
                    aria-hidden
                    className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] w-8 rounded-b-full bg-orange-500 shadow-[0_0_8px_2px_rgba(249,115,22,0.45)]"
                />
            )}

            <span
                className={[
                    "flex items-center justify-center rounded-xl p-1.5 transition-all duration-200",
                    active
                        ? "bg-orange-500/15 ring-1 ring-orange-500/25"
                        : "hover:bg-white/5",
                ].join(" ")}
            >
                <Icon
                    className={[
                        "transition-all duration-200",
                        "w-[18px] h-[18px] sm:w-5 sm:h-5",
                        active ? "text-orange-400" : "text-current",
                    ].join(" ")}
                    aria-hidden
                    strokeWidth={active ? 2.5 : 1.8}
                />
            </span>

            <span className="truncate max-w-full">{item.label}</span>
        </button>
    );
}

export function BottomNavbar() {
    const { navItems, isActive, navigateTo } = useBottomNavbar();

    return (
        <nav
            aria-label="Main navigation"
            className={[
                "fixed bottom-0 left-0 right-0 z-50",
                "h-16 sm:h-[4.25rem]",
                "flex items-stretch",
                "bg-zinc-950/90 backdrop-blur-xl",
                "border-t border-white/[0.06]",
                "shadow-[0_-4px_24px_0_rgba(0,0,0,0.55)]",
            ].join(" ")}
        >
            {navItems.map((item) => (
                <NavButton
                    key={item.key}
                    item={item}
                    active={isActive(item.path)}
                    onClick={() => navigateTo(item.path)}
                />
            ))}
        </nav>
    );
}
