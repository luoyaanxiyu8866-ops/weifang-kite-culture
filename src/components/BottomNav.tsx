import { Home, Wind, BookOpen, User } from "lucide-react";
import { Link, useLocation } from "@tanstack/react-router";

const navItems = [
  { path: "/", label: "首页", icon: Home },
  { path: "/workshop", label: "工坊", icon: Wind },
  { path: "/library", label: "图书馆", icon: BookOpen },
  { path: "/profile", label: "我的", icon: User },
];

export function BottomNav() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-nav-bg border-t border-border z-50">
      <div className="flex justify-around items-center h-[64px] max-w-md mx-auto px-2">
        {navItems.map((item) => {
          const isActive = currentPath === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors ${
                isActive
                  ? "text-nav-active"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <item.icon size={20} strokeWidth={isActive ? 2 : 1.5} />
              <span className="text-[10px] font-medium leading-none">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
