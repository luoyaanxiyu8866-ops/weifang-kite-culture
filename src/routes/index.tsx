import { Clock, ChevronRight } from "lucide-react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { BannerCarousel } from "@/components/BannerCarousel";
import { WorkshopEntryCard } from "@/components/WorkshopEntryCard";
import { RecommendedKites } from "@/components/RecommendedKites";
import { WindDirectionCard } from "@/components/WindDirectionCard";
import { KiteFestivalCountdown } from "@/components/KiteFestivalCountdown";

export const Route = createFileRoute("/")({
  component: Index,
});

const CRAFTS = [
  { id: "zhazhu", name: "扎", desc: "竹选材，烤弯绑扎", image: "https://g.cdn.meoo.host/y9abx2r52424/ai-images/craft-zha.png?auth_key=975604423c8b486a4a374be1b76c5bcaca787916dc0da850d157d3536f2da8c5" },
  { id: "huzhi", name: "糊", desc: "选纸裱糊，绷平无皱", image: "https://g.cdn.meoo.host/y9abx2r52424/ai-images/craft-hu.png?auth_key=61bd61aa318fdef7121b467158b5410b81354f5e39eccb3c390ff72e442267c3" },
  { id: "huihua", name: "绘", desc: "杨家埠木版印线，手工上色", image: "https://g.cdn.meoo.host/y9abx2r52424/ai-images/craft-hui.png?auth_key=9cd2252e962515344dd9138375d2551b4c2859daf2fca407f63af8c692e86e5c" },
  { id: "fangfei", name: "放", desc: "提线拴法，放飞技巧", image: "https://g.cdn.meoo.host/y9abx2r52424/ai-images/craft-fang.png?auth_key=58d1b9d98f55aeaaa1f22eabbcd8980b8f71577cc726605a587c65c8d402416f" },
];

function Index() {
  return (
    <PageLayout>
      {/* 1. 顶部轮播图 */}
      <section className="mb-4">
        <BannerCarousel />
      </section>

      {/* 2. 核心入口：参数化风筝工坊 */}
      <section className="mb-4">
        <WorkshopEntryCard />
      </section>

      {/* 3. 每日推荐（横向滑动） */}
      <section className="mb-6">
        <h2 className="font-serif text-base font-semibold mb-3 px-1 text-primary section-title-decoration">每日推荐</h2>
        <RecommendedKites />
      </section>

      {/* 4. 热门工艺（双列网格） */}
      <section className="mb-6">
        <h2 className="font-serif text-base font-semibold mb-3 px-1 text-primary section-title-decoration">热门工艺</h2>
        <div className="grid grid-cols-2 gap-3">
          {CRAFTS.map((craft) => (
            <Link
              key={craft.name}
              to="/tutorial/$id"
              params={{ id: craft.id }}
              className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border card-tap block"
            >
              <div className="h-24 bg-muted overflow-hidden">
                <img
                  src={craft.image}
                  alt={craft.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <h3 className="font-serif text-sm font-semibold mb-1">{craft.name}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{craft.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. 今日风向标 */}
      <section className="mb-4">
        <WindDirectionCard />
      </section>

      {/* 6. 历史时间轴入口 */}
      <section className="mb-4">
        <Link
          to="/library"
          search={{ tab: "timeline" }}
          className="block bg-card rounded-2xl px-4 py-3 shadow-sm flex items-center justify-between border border-border card-tap reveal"
        >
          <div className="flex items-center gap-3">
            <Clock className="text-bamboo shrink-0" size={20} />
            <div>
              <h3 className="font-serif text-sm font-semibold">历史时间轴</h3>
              <p className="text-xs text-muted-foreground">从春秋木鸢到现代风筝</p>
            </div>
          </div>
          <ChevronRight className="text-muted-foreground shrink-0" size={18} />
        </Link>
      </section>

      {/* 7. 风筝会倒计时 */}
      <section className="mb-6">
        <KiteFestivalCountdown />
      </section>
    </PageLayout>
  );
}
