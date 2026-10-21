import { useState, useEffect } from "react";
import { Wind, Hammer, Layers, Palette, Cloud, ChevronRight } from "lucide-react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";

export const Route = createFileRoute("/workshop")({
  component: Workshop,
});

const tutorials = [
  {
    id: "zhazhu",
    step: "扎",
    title: "竹篾骨架",
    desc: "选材、烤弯、绑扎，打造风筝的骨骼",
    icon: Hammer,
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    id: "huzhi",
    step: "糊",
    title: "裱糊蒙面",
    desc: "选纸、裱糊、绷平，赋予风筝形态",
    icon: Layers,
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    id: "huihua",
    step: "绘",
    title: "彩绘装饰",
    desc: "杨家埠木版印线，手工上色点睛",
    icon: Palette,
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    id: "fangfei",
    step: "放",
    title: "放飞技巧",
    desc: "提线拴法、风向判断、起飞要领",
    icon: Cloud,
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
];

const sampleWorks = [
  {
    id: "swallow",
    name: "沙燕风筝",
    author: "张效东",
    desc: "传统北京流派，形似燕子",
    image: "https://g.cdn.meoo.host/y9abx2r52424/ai-images/shayan-kite-new.png?auth_key=eaf3cf30ac35ae829312b4388a4c6f765fc2a6b5ff5cc1a150264fe8072721ff"
  },
  {
    id: "dragon",
    name: "龙头蜈蚣",
    author: "王永训",
    desc: "百米长龙，气势磅礴",
    image: "https://g.cdn.meoo.host/y9abx2r52424/ai-images/dragon-centipede-kite.png?auth_key=26baad1c45aa38c7a49c8b3d3c25bbc7e87afbe168d4b34168ba092b0c437a2a"
  },
  {
    id: "lotus",
    name: "荷花金鱼",
    author: "郭洪利",
    desc: "粉绿配色，寓意吉祥",
    image: "https://g.cdn.meoo.host/y9abx2r52424/ai-images/lotus-goldfish-kite.png?auth_key=55296e1f5257ad8e68690e6507c1d5cd1acdf65b5b20b4d7c343114b3f0465aa"
  },
  {
    id: "banyao",
    name: "板鹞风筝",
    author: "南通匠人",
    desc: "带哨口，声震长空",
    image: "https://g.cdn.meoo.host/y9abx2r52424/ai-images/banyao-kite.png?auth_key=234efa7429efe6111f129a32119e37c6eb38b4ae67793319a9998608b359f95e"
  },
];

// 竹篾纹理 SVG（用于工坊入口卡片背景）
const BAMBOO_TEXTURE = `data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 20 L40 20 M20 0 L20 40' stroke='%238B7355' stroke-width='0.5' fill='none' opacity='0.3'/%3E%3C/svg%3E`;

function Workshop() {
  // 检查是否有草稿（从 localStorage 读取）
  const [hasDraft, setHasDraft] = useState(false);
  const [lastEditedTime, setLastEditedTime] = useState("");

  useEffect(() => {
    const draftData = localStorage.getItem("kite-design-params");
    if (draftData) {
      setHasDraft(true);
      const timestamp = localStorage.getItem("kite-design-timestamp");
      if (timestamp) {
        const date = new Date(parseInt(timestamp));
        setLastEditedTime(`${date.getMonth() + 1}月${date.getDate()}日`);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-start/50 to-white relative overflow-hidden">
      <PageLayout className="!bg-transparent">
        {/* 1. 顶部核心入口：参数化风筝工坊 */}
        <section className="mb-6 reveal">
          <Link
            to="/workshop/designer"
            className="block card-tap animate-breathe-scale"
          >
            <div className="relative w-full h-[140px] rounded-2xl overflow-hidden shadow-sm border border-border bg-gradient-to-br from-teal/10 to-vermilion/5">
              {/* 竹篾纹理背景 */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `url("${BAMBOO_TEXTURE}")`,
                  backgroundSize: '40px',
                }}
              />

              <div className="relative h-full flex items-center justify-between px-5">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-teal/20 flex items-center justify-center shrink-0">
                    <Wind className="text-teal" size={32} />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-foreground">
                      参数化风筝工坊
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      调节滑块，实时计算升力，设计你的专属风筝
                    </p>
                  </div>
                </div>

                <div className="bg-vermilion text-white px-4 py-2 rounded-full text-sm font-medium shrink-0">
                  去创作
                </div>
              </div>
            </div>
          </Link>
        </section>

        {/* 2. 中部：示例作品（横向滑动） */}
        <section className="mb-6">
          <h3 className="font-serif text-lg font-semibold text-foreground mb-4 reveal">
            传承人作品
          </h3>
          <div
            className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4 scrollbar-hide"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {sampleWorks.map((work, index) => (
                <Link
                  key={work.id}
                  to="/kite/$id"
                  params={{ id: work.id }}
                  className="shrink-0 w-[140px] snap-start bg-card rounded-2xl overflow-hidden border border-border shadow-sm card-tap reveal"
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  <div className="h-[100px] bg-muted">
                    <img
                      src={work.image}
                      alt={work.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <h4 className="font-serif text-sm font-semibold text-foreground mb-1 truncate">
                      {work.name}
                    </h4>
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-xs text-teal">{work.author}</span>
                      <span className="text-[10px] text-teal bg-teal/10 px-1.5 py-0.5 rounded">
                        传承人
                      </span>
                    </div>
                    <p className="text-[12px] text-muted-foreground leading-snug line-clamp-2">
                      {work.desc}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </section>

        {/* 3. 下部：四步工艺（竖向时间轴） */}
        <section className="mb-6">
          <h3 className="font-serif text-lg font-semibold text-foreground mb-4 reveal">
            扎糊绘放 · 四步工艺
          </h3>
          <div className="relative pl-8">
            {/* 竖直虚线 */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 border-l-2 border-dashed border-bamboo" />

            <div className="space-y-4">
              {tutorials.map((item, index) => (
                <Link
                  key={item.id}
                  to="/tutorial/$id"
                  params={{ id: item.id }}
                  className="relative block bg-card rounded-2xl p-4 border border-border shadow-sm card-tap reveal"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* 圆圈数字 */}
                  <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-teal text-white flex items-center justify-center text-sm font-bold z-10">
                    {index + 1}
                  </div>

                  <div className="flex items-center gap-4">
                    {/* 左侧图标 */}
                    <div
                      className={`w-12 h-12 rounded-xl ${item.bgColor} flex items-center justify-center shrink-0`}
                    >
                      <item.icon className={item.color} size={24} />
                    </div>

                    {/* 右侧内容 */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded">
                          第{index + 1}步
                        </span>
                        <h4 className="font-serif text-base font-semibold text-foreground">
                          {item.title}
                        </h4>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>

                    {/* 右箭头 */}
                    <ChevronRight className="text-muted-foreground shrink-0" size={18} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 4. 新增模块：我的草稿 */}
        {hasDraft && (
          <section className="mb-6">
            <Link
              to="/workshop/designer"
              className="block bg-card rounded-2xl px-4 py-3 shadow-sm border border-border flex items-center justify-between card-tap reveal"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <Palette size={20} className="text-teal" />
                </div>
                <div>
                  <h3 className="font-serif text-sm font-semibold">继续我的风筝设计</h3>
                  <p className="text-xs text-muted-foreground">上次编辑于 {lastEditedTime}</p>
                </div>
              </div>
              <ChevronRight className="text-muted-foreground shrink-0" size={18} />
            </Link>
          </section>
        )}
      </PageLayout>
    </div>
  );
}
