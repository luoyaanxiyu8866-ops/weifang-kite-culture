import { Wind, ChevronRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function WorkshopEntryCard() {
  return (
    <Link
      to="/workshop"
      className="block reveal card-tap animate-breathe"
    >
      <div className="relative w-full h-28 rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(139,115,85,0.08)] border border-border bg-card">
        <div className="relative h-full flex items-center justify-between px-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl border border-primary/30 flex items-center justify-center">
              <Wind className="text-primary" size={24} strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-serif text-lg font-semibold text-foreground">
                自己扎一只风筝
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                参数化设计 · 实时预览
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 border border-primary text-primary px-4 py-2 rounded-full text-sm font-medium hover:bg-primary/5 transition-colors">
            <span>去工坊</span>
            <ChevronRight size={16} />
          </div>
        </div>
      </div>
    </Link>
  );
}
