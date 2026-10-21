import { useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

export function KiteFestivalCountdown() {
  const daysLeft = useMemo(() => {
    const target = new Date("2027-04-01");
    const now = new Date();
    const diff = Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(0, diff);
  }, []);

  return (
    <Link to="/countdown" className="block card-tap reveal">
      <div className="bg-card rounded-2xl h-[60px] px-4 shadow-sm border border-border flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs text-muted-foreground truncate">
            距离第 44 届潍坊国际风筝会
          </p>
        </div>

        <div className="flex items-center gap-3 mx-3">
          <span className="text-2xl font-bold text-primary">{daysLeft}</span>
          <span className="text-sm text-muted-foreground">天</span>
        </div>

        <div className="flex items-center gap-1 border border-primary/30 text-primary px-3 py-1.5 rounded-full text-xs font-medium shrink-0">
          <span>去看看</span>
          <ChevronRight size={14} />
        </div>
      </div>
    </Link>
  );
}
