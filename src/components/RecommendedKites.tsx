import { Link } from "@tanstack/react-router";

const kites = [
  { id: "yangjiabu", name: "杨家埠风筝", desc: "年画风格，色彩鲜艳", image: "https://g.cdn.meoo.host/y9abx2r52424/ai-images/rec-kite-yangjiabu.png?auth_key=ede8b7137a32df0d95333b6201d2b79516347a19ebe5ab79c31c470770634ff6" },
  { id: "dragon", name: "龙头蜈蚣", desc: "百米长龙，气势磅礴", image: "https://g.cdn.meoo.host/y9abx2r52424/ai-images/rec-kite-dragon.png?auth_key=bcfe9ce26ef2d87e938c39dd149690e8a1d51f184a21847c7621ccf96623559c" },
  { id: "swallow", name: "沙燕", desc: "北京流派，形似燕子", image: "https://g.cdn.meoo.host/y9abx2r52424/ai-images/rec-kite-swallow.png?auth_key=609a5d5bc1520c2f9465837c4e1906d6d107951b95319cef48ef01f1e3dfa0ee" },
  { id: "banyao", name: "板鹞", desc: "哨音悦耳，南通特色", image: "https://g.cdn.meoo.host/y9abx2r52424/ai-images/rec-kite-banyao.png?auth_key=e47e644e1a08a54e4bbf1f454a223993a5b1016657223fea2bcfbbca54b0dfa3" },
];

export function RecommendedKites() {
  return (
    <div className="reveal">
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {kites.map((kite) => (
          <Link
            key={kite.id}
            to="/kite/$id"
            params={{ id: kite.id }}
            className="shrink-0 w-32 h-40 rounded-2xl bg-card border border-border shadow-[0_2px_6px_rgba(139,115,85,0.06)] overflow-hidden cursor-pointer hover:shadow-[0_4px_12px_rgba(139,115,85,0.12)] transition-shadow block"
          >
            <div className="h-24 bg-muted overflow-hidden">
              <img
                src={kite.image}
                alt={kite.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-2">
              <h4 className="text-sm font-medium text-foreground truncate">
                {kite.name}
              </h4>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                {kite.desc}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
