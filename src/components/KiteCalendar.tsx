import { Wind } from "lucide-react";

export function KiteCalendar() {
  return (
    <div className="bg-card rounded-xl px-4 py-3 shadow-sm flex items-center justify-between">
      <div>
        <h3 className="font-serif text-sm font-semibold mb-1">今日风筝</h3>
        <p className="text-xs text-muted-foreground">风力 3 级，适合放沙燕</p>
      </div>
      <Wind className="text-secondary shrink-0" size={24} />
    </div>
  );
}
