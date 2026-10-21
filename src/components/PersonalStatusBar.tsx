import { User } from "lucide-react";

export function PersonalStatusBar() {
  return (
    <div className="flex items-center justify-between bg-card rounded-xl px-4 py-3 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center bg-[#c1e1cb] w-[49px] h-[46px] rounded-[19px] flex">
          <User className="text-primary" size={20} />
        </div>
        <span className="font-serif text-sm font-semibold">风筝爱好者</span>
      </div>
    </div>
  );
}
