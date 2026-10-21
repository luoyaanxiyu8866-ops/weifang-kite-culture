import { useState } from "react";
import { createFileRoute, useSearch, Link } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { ChevronRight, Scroll, Feather, Palette, Wind as WindIcon, Calendar, Award, FileText } from "lucide-react";

export const Route = createFileRoute("/library")({
  component: Library,
  validateSearch: (search: Record<string, unknown>) => ({
    tab: (search.tab as string) || "kites",
  }),
});

// 获取等级标签样式
function getLevelTagClass(title: string) {
  if (title.includes("国家级")) return "bg-vermilion text-white";
  if (title.includes("省级")) return "bg-teal text-white";
  if (title.includes("市级")) return "bg-bamboo text-white";
  return "bg-muted text-muted-foreground";
}

const kiteData = [
  { id: "yangjiabu", name: "杨家埠风筝", desc: "潍坊代表，年画风格，色彩浓烈", image: "https://g.cdn.meoo.host/y9abx2r52424/ai-images/yangjiabu-kite-blue.png?auth_key=0fbe6baea2c507f671df31e4d30f22161e661bb2d1155fabc7bac5be134eff3e", region: "潍坊" },
  { id: "dragon", name: "龙头蜈蚣", desc: "百米长龙，气势恢宏，需多人协作", image: "https://g.cdn.meoo.host/y9abx2r52424/ai-images/dragon-centipede-kite-1.png?auth_key=717663e513228863338715a2e81e69afe88993c477d72392b71fdbb1520189cc", region: "潍坊" },
  { id: "swallow", name: "沙燕", desc: "北京流派，形似燕子，轻盈灵动", image: "https://g.cdn.meoo.host/y9abx2r52424/ai-images/shayan-kite-new.png?auth_key=eaf3cf30ac35ae829312b4388a4c6f765fc2a6b5ff5cc1a150264fe8072721ff", region: "北京" },
  { id: "banyao", name: "板鹞", desc: "南通特色，哨音悦耳，空中鸣响", image: "https://g.cdn.meoo.host/y9abx2r52424/ai-images/banyao-kite-new.png?auth_key=3478b68ed8dfaca94c8c01905fe85675326be803cbcbcd5220a4ed8c677035f9", region: "南通" },
  { id: "bagua", name: "八卦风筝", desc: "传统几何纹样，寓意吉祥", image: "https://g.cdn.meoo.host/y9abx2r52424/ai-images/bagua-kite-blue.png?auth_key=7d54d56e908a2198afba19bf1f407ba07151ab14613f94a16700e91e8d0aad77", region: "全国" },
  { id: "butterfly", name: "蝴蝶风筝", desc: "造型优美，色彩斑斓", image: "https://g.cdn.meoo.host/y9abx2r52424/ai-images/butterfly-kite-blue.png?auth_key=a269a646d78644ece5626cbd65d4f62e6d64fd59ba0879e77243740c34d1634c", region: "全国" },
  { id: "phoenix", name: "凤凰风筝", desc: "红金配色，尾羽飘逸，象征祥瑞", image: "https://g.cdn.meoo.host/y9abx2r52424/ai-images/phoenix-kite.png?auth_key=22553e473d339695525fd6c01e8a3e241a4e9a25c42753b3f81d90e8fcc7b29c", region: "全国" },
  { id: "carp", name: "鲤鱼风筝", desc: "橙红鳞片，鱼尾舒展，寓意年年有余", image: "https://g.cdn.meoo.host/y9abx2r52424/ai-images/carp-kite.png?auth_key=79c8127ac02ddf6e72b7f14921e0bde53b45392cf9397c08fabb7402ea60e96c", region: "全国" },
  { id: "eagle", name: "雄鹰风筝", desc: "棕白羽翼，展翅翱翔，气势威猛", image: "https://g.cdn.meoo.host/y9abx2r52424/ai-images/eagle-kite.png?auth_key=75a3b6fa7def9e410fbdbc1c4c17245455d1c9f4a55d86d721a9396b7b40cd4d", region: "全国" },
  { id: "peacock", name: "孔雀风筝", desc: "蓝绿尾羽开屏，眼斑华丽，雍容华贵", image: "https://g.cdn.meoo.host/y9abx2r52424/ai-images/peacock-kite.png?auth_key=5aac9653c6d0a06557c31d3efc949172d54f452c0383d842990553c32fbfb977", region: "全国" },
];

const inheritors = [
  { id: "zhang-xiaodong", name: "张效东", title: "国家级传承人", desc: "擅长龙头蜈蚣风筝，技艺精湛", avatar: "https://g.cdn.meoo.host/y9abx2r52424/ai-images/zhang-xiaodong-avatar.png?auth_key=2c8994d59e658e00e853f1d3e4495afc14efaf08743feda88e8a2166512236c4", masterpiece: "百米龙头蜈蚣" },
  { id: "wang-yongxun", name: "王永训", title: "省级传承人", desc: "以精巧著称，创多项世界纪录", avatar: "https://g.cdn.meoo.host/y9abx2r52424/ai-images/wang-yongxun-avatar.png?auth_key=a8b7a85bf8d735ce2fdf781d8cacee7ca3a54bf60366de6e28e661896db9a8f0", masterpiece: "微型风筝系列" },
  { id: "guo-hongli", name: "郭洪利", title: "青年传承人", desc: "传统与现代结合，推动创新", avatar: "https://g.cdn.meoo.host/y9abx2r52424/ai-images/guo-hongli-avatar.png?auth_key=be2c6f39d5493a7ed9f0398feb3faf1f54d4698e6256b1e583bc2a11d79c06f5", masterpiece: "创新荷花金鱼" },
  { id: "yang-fushan", name: "杨福山", title: "国家级传承人", desc: "杨家埠木版年画风筝代表人物", avatar: "https://g.cdn.meoo.host/y9abx2r52424/ai-images/yang-fushan-avatar.png?auth_key=91ead5f5d6c7fbce3f613b482f7545b91fc91f1b625eb6509273ea87682fb187", masterpiece: "木版年画风筝" },
  { id: "liu-zongren", name: "刘宗仁", title: "省级传承人", desc: "精通沙燕风筝制作，传承京派技艺", avatar: "https://g.cdn.meoo.host/y9abx2r52424/ai-images/liu-zongren-avatar.png?auth_key=1f4c929b138bbbfbca9ffb00fc3844087aa49525b09dd54dafd4f67876e377da", masterpiece: "经典沙燕" },
  { id: "chen-guanqun", name: "陈冠群", title: "市级传承人", desc: "板鹞风筝哨音工艺专家", avatar: "https://g.cdn.meoo.host/y9abx2r52424/ai-images/chen-guanqun-avatar.png?auth_key=c9482d3cbd55caff69190ffd2e12534202ba7e6045db6b3d889d70eb720f254e", masterpiece: "六角板鹞" },
  { id: "zhao-ming", name: "赵明", title: "青年传承人", desc: "创新设计蝴蝶风筝，融合现代美学", avatar: "https://g.cdn.meoo.host/y9abx2r52424/ai-images/zhao-ming-avatar.png?auth_key=7b2e182d0d1030fa549bc697ecc0cf35bff6e2f4b53fc2c1c89b32f55ce36f71", masterpiece: "渐变蝴蝶" },
  { id: "sun-wei", name: "孙伟", title: "民间艺人", desc: "八卦风筝制作高手，深谙传统文化", avatar: "https://g.cdn.meoo.host/y9abx2r52424/ai-images/sun-wei-avatar.png?auth_key=018787f79121c88af8ce6dc791d5ecfdd14ba8c08ae891abe421440f8359bf5e", masterpiece: "八卦阵风筝" },
];

const timeline = [
  { id: "spring-autumn", year: "春秋", event: "鲁班削竹为鹊，三日不下", detail: "最早的风筝雏形", icon: Scroll },
  { id: "han", year: "汉代", event: "韩信以纸鸢测量距离", detail: "军事用途的开端", icon: FileText },
  { id: "tang", year: "唐代", event: "造纸术普及，纸鸢流行", detail: "民间娱乐兴起", icon: Feather },
  { id: "song", year: "宋代", event: "清明放风筝成习俗", detail: "寓意放走晦气", icon: WindIcon },
  { id: "ming-qing", year: "明清", event: "风筝发展鼎盛期", detail: "种类多达上百种", icon: Palette },
  { id: "modern", year: "现代", event: "潍坊国际风筝节", detail: "每年四月，全球盛会", icon: Calendar },
  { id: "2006", year: "2006", event: "入选国家级非遗", detail: "潍坊风筝制作技艺", icon: Award },
];

function KitesSection() {
  return (
    <div className="space-y-3">
      {/* 瀑布流布局 */}
      <div className="masonry-grid">
        {kiteData.map((kite, index) => (
          <Link
            key={kite.id}
            to="/kite/$id"
            params={{ id: kite.id }}
            className="masonry-item block bg-card rounded-2xl border border-border shadow-sm card-tap overflow-hidden reveal"
            style={{ transitionDelay: `${index * 60}ms` }}
          >
            <div className="relative bg-muted">
              <img
                src={kite.image}
                alt={kite.name}
                className="w-full object-cover"
              />
              {/* 地域标签 */}
              <span className="absolute top-2 left-2 text-[10px] px-2 py-0.5 rounded bg-teal/80 text-white backdrop-blur-sm">
                {kite.region}
              </span>
            </div>
            <div className="p-3">
              <h4 className="font-serif text-base font-semibold text-foreground mb-1">
                {kite.name}
              </h4>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {kite.desc}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function InheritorsSection() {
  return (
    <div className="space-y-3">
      {inheritors.map((person, index) => (
        <Link
          key={person.id}
          to="/inheritor/$id"
          params={{ id: person.id }}
          className="block bg-card rounded-2xl p-4 border border-border shadow-sm card-tap reveal"
          style={{ transitionDelay: `${index * 80}ms` }}
        >
          <div className="flex items-start gap-4">
            {/* 放大头像 */}
            <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-teal/30 bg-muted">
              <img
                src={person.avatar}
                alt={person.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-serif text-base font-semibold text-foreground">
                  {person.name}
                </h4>
                {/* 等级标签 */}
                <span className={`text-[10px] px-2 py-0.5 rounded whitespace-nowrap ${getLevelTagClass(person.title)}`}>
                  {person.title}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-1">{person.desc}</p>
              {person.masterpiece && (
                <p className="text-xs text-muted-foreground">代表作：{person.masterpiece}</p>
              )}
            </div>
            {/* 右箭头 */}
            <ChevronRight className="text-muted-foreground shrink-0 mt-1" size={18} />
          </div>
        </Link>
      ))}
    </div>
  );
}

function TimelineSection() {
  return (
    <div className="relative pl-10 space-y-6">
      {/* 加粗竖线 */}
      <div className="absolute left-4 top-0 bottom-0 w-1 bg-bamboo" />

      {timeline.map((item, index) => (
        <Link
          key={item.id}
          to="/history/$id"
          params={{ id: item.id }}
          className="block relative card-tap reveal"
          style={{ transitionDelay: `${index * 100}ms` }}
        >
          {/* 大圆圈节点 */}
          <div className="absolute -left-10 top-6 w-8 h-8 rounded-full border-2 border-teal bg-background flex items-center justify-center z-10">
            <div className="w-3 h-3 rounded-full bg-teal" />
          </div>

          <div className="bg-card rounded-2xl p-4 border border-border shadow-sm relative overflow-hidden">
            {/* 水墨底纹 */}
            <div className="ink-pattern" />

            {/* 年份强调 */}
            <div className="mb-3">
              <span className="text-xl font-bold font-serif text-bamboo">{item.year}</span>
            </div>

            <div className="flex items-start gap-3">
              {/* 代表性图标 */}
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                <item.icon size={20} className="text-bamboo" />
              </div>

              <div className="flex-1">
                <h4 className="text-sm font-medium text-foreground mb-1">{item.event}</h4>
                <p className="text-xs text-muted-foreground">{item.detail}</p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

function Library() {
  const search = useSearch({ from: "/library" });
  const [activeTab, setActiveTab] = useState(search.tab);

  const tabs = [
    { id: "kites", label: "风筝图鉴" },
    { id: "inheritors", label: "传承人档案" },
    { id: "timeline", label: "历史时间轴" },
  ];

  return (
    <PageLayout>
      {/* 顶部标签切换 */}
      <div className="flex gap-2 mb-6 reveal">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2.5 px-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === tab.id
                ? "bg-card text-teal shadow-sm font-semibold"
                : "bg-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 内容区 */}
      <section>
        {activeTab === "kites" && <KitesSection />}
        {activeTab === "inheritors" && <InheritorsSection />}
        {activeTab === "timeline" && <TimelineSection />}
      </section>
    </PageLayout>
  );
}
