import { createFileRoute, useRouter } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { ArrowLeft, Heart, Bookmark } from "lucide-react";

export const Route = createFileRoute("/profile_favorites")({
  component: FavoritesPage,
});

const favorites = [
  { id: "swallow", name: "沙燕风筝", type: "图鉴", image: "https://g.cdn.meoo.host/y9abx2r52424/ai-images/sand-swallow-kite.png?auth_key=85e31ddd6df3e6d2a5e3af7355977cb4f82f4000a44b75aa02bf2e04e801bfa0" },
  { id: "dragon", name: "龙头蜈蚣", type: "图鉴", image: "https://g.cdn.meoo.host/y9abx2r52424/ai-images/dragon-centipede-kite-1.png?auth_key=717663e513228863338715a2e81e69afe88993c477d72392b71fdbb1520189cc" },
  { id: "zhazhu", name: "竹篾骨架教程", type: "文章", image: "" },
  { id: "huzhi", name: "裱糊蒙面教程", type: "文章", image: "" },
];

function FavoritesPage() {
  const router = useRouter();

  return (
    <PageLayout>
      {/* 返回按钮 */}
      <button
        onClick={() => router.history.back()}
        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
      >
        <ArrowLeft size={16} />
        <span>返回</span>
      </button>

      {/* 标题 */}
      <section className="mb-6 reveal">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Heart className="text-primary" size={20} />
          </div>
          <div>
            <h1 className="font-serif text-xl font-bold text-foreground">我的收藏</h1>
            <p className="text-xs text-muted-foreground mt-0.5">共收藏 {favorites.length} 项内容</p>
          </div>
        </div>
      </section>

      {/* 收藏列表 */}
      <section>
        <div className="space-y-3">
          {favorites.map((item, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-4 border border-border shadow-sm reveal flex items-center gap-3"
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              {item.image ? (
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-16 h-16 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
                  <Bookmark className="text-secondary" size={24} />
                </div>
              )}
              <div className="flex-1">
                <h3 className="text-sm font-medium text-foreground">{item.name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{item.type}</p>
              </div>
              <Heart className="text-destructive shrink-0" size={18} fill="currentColor" />
            </div>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
