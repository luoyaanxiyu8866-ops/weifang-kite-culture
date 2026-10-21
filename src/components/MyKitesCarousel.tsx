import { Plus } from "lucide-react";
import { Link } from "@tanstack/react-router";

const mockKites = [
  { id: 1, name: "沙燕", image: "https://g.cdn.meoo.host/y9abx2r52424/ai-images/my-kite-swallow.png?auth_key=9ded0faf94ee90e83e084df35564eed8cd955e25bcf4bb88f7a0d4f8a3022c67" },
  { id: 2, name: "龙头蜈蚣", image: "https://g.cdn.meoo.host/y9abx2r52424/ai-images/my-kite-dragon.png?auth_key=63868c9f7e72f9bcfa552e2a12bd8c5ac2aac64b55ccd3aaff00d6b66d9c361f" },
  { id: 3, name: "板鹞", image: "https://g.cdn.meoo.host/y9abx2r52424/ai-images/my-kite-banyao.png?auth_key=349067881fe32cf1afbf3953f2f89eaac7f7dc790f5364efb393cbd61f67689a" },
];

export function MyKitesCarousel() {
  return (
    <Link to="/profile" className="block reveal">
      <h3 className="font-serif text-base font-semibold text-foreground mb-3">
        我的风筝
      </h3>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {mockKites.map((kite) => (
          <div
            key={kite.id}
            className="shrink-0 w-24 h-24 rounded-lg bg-card border border-border flex items-center justify-center shadow-sm cursor-pointer hover:shadow-md transition-shadow overflow-hidden"
          >
            <img
              src={kite.image}
              alt={kite.name}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        <div className="shrink-0 w-24 h-24 rounded-lg bg-muted border border-dashed border-border flex items-center justify-center cursor-pointer hover:bg-muted/80 transition-colors">
          <Plus className="text-muted-foreground" size={24} />
        </div>
      </div>
    </Link>
  );
}
