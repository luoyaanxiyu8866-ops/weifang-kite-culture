import { createFileRoute, useRouter } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/kite_/$id")({
  component: KiteDetailPage,
});

const KITE_DETAILS: Record<string, { name: string; image: string; desc: string; origin: string; author?: string; features: string[]; history: string; tips: string }> = {
  "yangjiabu": {
    name: "杨家埠风筝",
    image: "https://g.cdn.meoo.host/y9abx2r52424/ai-images/yangjiabu-kite-blue.png?auth_key=0fbe6baea2c507f671df31e4d30f22161e661bb2d1155fabc7bac5be134eff3e",
    desc: "潍坊代表，年画风格，色彩浓烈",
    origin: "山东潍坊",
    author: "杨家埠匠人",
    features: ["年画风格浓郁", "高饱和配色", "木版印线工艺", "手工填色", "吉祥寓意丰富"],
    history: "杨家埠风筝源于清代杨家埠木版年画，将平面年画艺术立体化为风筝。作为潍坊风筝的重要流派，它融合了民间艺术的精髓，色彩鲜艳夺目，造型夸张生动，具有浓厚的乡土气息和民间艺术特色。",
    tips: "适合2-3级微风，因采用年画风格彩绘，色彩鲜艳醒目。放飞时注意保护画面，避免刮擦。"
  },
  "dragon": {
    name: "龙头蜈蚣",
    image: "https://g.cdn.meoo.host/y9abx2r52424/ai-images/dragon-centipede-kite-1.png?auth_key=717663e513228863338715a2e81e69afe88993c477d72392b71fdbb1520189cc",
    desc: "百米长龙，气势恢宏，需多人协作",
    origin: "山东潍坊",
    author: "张效东",
    features: ["模块化设计", "百米长度", "多人协作放飞", "动态飘逸", "视觉震撼"],
    history: "龙头蜈蚣风筝是潍坊风筝的代表作，最早可追溯至明代。由一个精美的龙头和数十节身体组成，最长可达数百米，被誉为'空中巨龙'，是潍坊国际风筝节的标志性作品，象征中华民族的龙图腾。",
    tips: "放飞需要较强风力（3-4级）和开阔场地，建议至少3-5人协作。先放起龙头，再逐节释放身体，注意保持线张力均匀。"
  },
  "swallow": {
    name: "沙燕风筝",
    image: "https://g.cdn.meoo.host/y9abx2r52424/ai-images/shayan-kite-new.png?auth_key=eaf3cf30ac35ae829312b4388a4c6f765fc2a6b5ff5cc1a150264fe8072721ff",
    desc: "北京流派，形似燕子，轻盈灵动",
    origin: "北京",
    author: "曹氏传人",
    features: ["对称双翼结构", "尾部呈燕尾分叉", "飞行稳定灵活", "彩绘图案精美", "轻盈小巧"],
    history: "沙燕风筝是北京风筝的代表，因形似燕子而得名。清代曹雪芹在《南鹞北鸢考工志》中详细记载了沙燕的制作技法。其造型优美，飞行性能卓越，是北方风筝的经典之作，寓意春天和生机。",
    tips: "适合2-3级微风，飞行稳定性好，适合初学者练习。注意调整提线角度，保持平衡。"
  },
  "banyao": {
    name: "板鹞风筝",
    image: "https://g.cdn.meoo.host/y9abx2r52424/ai-images/banyao-kite-new.png?auth_key=3478b68ed8dfaca94c8c01905fe85675326be803cbcbcd5220a4ed8c677035f9",
    desc: "南通特色，哨音悦耳，空中鸣响",
    origin: "江苏南通",
    author: "南通匠人",
    features: ["六角或八角平板结构", "装有竹制哨口", "风中发出悦耳哨音", "非遗传承", "声光一体"],
    history: "板鹞风筝源自江苏南通，历史可追溯至唐代，是南通非物质文化遗产。其最大特点是在风筝上安装大小不一的竹制哨口，风吹过时发出高低不同的哨音，如同空中交响乐，被誉为'空中音乐家'。",
    tips: "需要3级以上风力才能发出清晰哨音。放飞时注意听辨哨音变化，可判断风力是否适宜。夜间放飞需注意安全，选择无电线区域。"
  },
  "bagua": {
    name: "八卦风筝",
    image: "https://g.cdn.meoo.host/y9abx2r52424/ai-images/bagua-kite-blue.png?auth_key=7d54d56e908a2198afba19bf1f407ba07151ab14613f94a16700e91e8d0aad77",
    desc: "传统几何纹样，寓意吉祥",
    origin: "全国各地",
    author: "传统匠人",
    features: ["八卦图案设计", "几何纹样装饰", "对称结构", "传统文化内涵", "阴阳调和寓意"],
    history: "八卦风筝源于古代八卦文化，将哲学思想融入风筝艺术。以八卦图形为基础设计骨架，用对比鲜明的色彩绘制八卦符号和几何纹样，体现天人合一的理念，寓意吉祥如意、阴阳调和。",
    tips: "适合2-3级微风，因图案复杂，制作时需保证对称性。放飞时注意观察平衡，及时调整提线。"
  },
  "butterfly": {
    name: "蝴蝶风筝",
    image: "https://g.cdn.meoo.host/y9abx2r52424/ai-images/butterfly-kite-blue.png?auth_key=a269a646d78644ece5626cbd65d4f62e6d64fd59ba0879e77243740c34d1634c",
    desc: "造型优美，色彩斑斓",
    origin: "全国各地",
    author: "民间艺人",
    features: ["仿生双翅结构", "色彩渐变绚丽", "轻盈飘逸", "浪漫唯美", "逼真度高"],
    history: "蝴蝶风筝自古就有制作传统，象征美好爱情和自由飞翔。精心扎制对称的双翅骨架，用渐变色彩绘制翅膀花纹，追求逼真效果。双翅展开如真蝶飞舞，极具观赏性和艺术价值。",
    tips: "适合2-3级微风，因双翅结构需保持完美对称。放飞时注意风向，避免侧风导致失衡。"
  },
  "phoenix": {
    name: "凤凰风筝",
    image: "https://g.cdn.meoo.host/y9abx2r52424/ai-images/phoenix-kite.png?auth_key=22553e473d339695525fd6c01e8a3e241a4e9a25c42753b3f81d90e8fcc7b29c",
    desc: "红金配色，尾羽飘逸，象征祥瑞",
    origin: "全国各地",
    author: "传统匠人",
    features: ["凤凰造型华丽", "红金主色调", "长尾羽飘逸", "吉祥寓意深厚", "工艺复杂精细"],
    history: "凤凰风筝源于中国古代神话传说，凤凰是百鸟之王，象征吉祥如意、天下太平。风筝以红金为主色调，尾羽修长飘逸，在空中飞舞时如同神鸟降临，是传统节日庆典中的经典款式。",
    tips: "适合3级以上风力，因尾羽较长需要足够风力支撑。放飞时注意保持线张力，避免尾羽缠绕。"
  },
  "carp": {
    name: "鲤鱼风筝",
    image: "https://g.cdn.meoo.host/y9abx2r52424/ai-images/carp-kite.png?auth_key=79c8127ac02ddf6e72b7f14921e0bde53b45392cf9397c08fabb7402ea60e96c",
    desc: "橙红鳞片，鱼尾舒展，寓意年年有余",
    origin: "全国各地",
    author: "民间艺人",
    features: ["鱼形仿生设计", "橙红鳞片纹样", "鱼尾舒展灵动", "寓意丰收富足", "色彩鲜艳醒目"],
    history: "鲤鱼风筝取'年年有余'之谐音寓意，是中国民间最受欢迎的吉祥风筝之一。鱼身采用橙红色调绘制鳞片纹路，鱼尾宽大舒展，在空中游动时栩栩如生，象征生活富足、事业有成。",
    tips: "适合2-3级微风，鱼形结构飞行稳定。注意调整提线角度，保持鱼身水平姿态。"
  },
  "eagle": {
    name: "雄鹰风筝",
    image: "https://g.cdn.meoo.host/y9abx2r52424/ai-images/eagle-kite.png?auth_key=75a3b6fa7def9e410fbdbc1c4c17245455d1c9f4a55d86d721a9396b7b40cd4d",
    desc: "棕白羽翼，展翅翱翔，气势威猛",
    origin: "全国各地",
    author: "传统匠人",
    features: ["猛禽造型逼真", "棕白羽毛层次", "双翼宽阔有力", "眼神锐利传神", "气势磅礴震撼"],
    history: "雄鹰风筝以天空霸主为原型，展现力量与自由的完美结合。棕白色羽毛层次分明，双翼宽阔有力，眼部刻画锐利传神。放飞时如真鹰翱翔天际，气势磅礴，深受男性风筝爱好者喜爱。",
    tips: "适合3-4级较强风力，因翼展较大需要足够升力。选择开阔场地放飞，注意高空风向变化。"
  },
  "peacock": {
    name: "孔雀风筝",
    image: "https://g.cdn.meoo.host/y9abx2r52424/ai-images/peacock-kite.png?auth_key=5aac9653c6d0a06557c31d3efc949172d54f452c0383d842990553c32fbfb977",
    desc: "蓝绿尾羽开屏，眼斑华丽，雍容华贵",
    origin: "全国各地",
    author: "民间艺人",
    features: ["孔雀开屏造型", "蓝绿渐变尾羽", "眼斑图案精美", "雍容华贵气质", "工艺极为复杂"],
    history: "孔雀风筝以百鸟之王孔雀为灵感，尾羽呈扇形展开，蓝绿色渐变搭配华丽眼斑图案，每一根羽毛都精心绘制。放飞时尾羽随风摆动，如同孔雀开屏般华美壮观，是风筝艺术中的精品之作。",
    tips: "适合2-3级微风，因尾羽面积大需注意平衡。放飞时缓慢放线，让尾羽自然展开，避免急拉导致变形。"
  }
};

function KiteDetailPage() {
  const router = useRouter();
  const { id } = Route.useParams();
  const kite = KITE_DETAILS[id];

  if (!kite) {
    return (
      <PageLayout>
        <div className="text-center py-20">
          <p className="text-muted-foreground">未找到该风筝信息</p>
        </div>
      </PageLayout>
    );
  }

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

      {/* 风筝图片 */}
      <section className="mb-6 reveal">
        <div className="rounded-2xl overflow-hidden border border-border shadow-sm bg-muted">
          <img
            src={kite.image}
            alt={kite.name}
            className="w-full h-64 object-cover"
          />
        </div>
      </section>

      {/* 基本信息 */}
      <section className="mb-6 reveal">
        <h1 className="font-serif text-2xl font-bold text-foreground mb-2">{kite.name}</h1>
        <p className="text-sm text-muted-foreground mb-3">{kite.desc}</p>
        {kite.author && (
          <p className="text-xs text-secondary mb-3">匠人：{kite.author}</p>
        )}
        <div className="bg-card rounded-xl p-4 border border-border shadow-sm">
          <p className="text-xs text-muted-foreground mb-1">发源地</p>
          <p className="text-sm font-semibold text-foreground">{kite.origin}</p>
        </div>
      </section>

      {/* 特点 */}
      <section className="mb-6 reveal">
        <h2 className="font-serif text-base font-semibold mb-3">主要特点</h2>
        <div className="space-y-2">
          {kite.features.map((feature, index) => (
            <div key={index} className="bg-card rounded-lg p-3 border border-border shadow-sm flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5"></div>
              <p className="text-sm text-foreground">{feature}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 历史渊源 */}
      <section className="mb-6 reveal">
        <h2 className="font-serif text-base font-semibold mb-3">历史渊源</h2>
        <div className="bg-card rounded-xl p-4 border border-border shadow-sm">
          <p className="text-sm text-foreground leading-relaxed">{kite.history}</p>
        </div>
      </section>

      {/* 放飞技巧 */}
      <section className="reveal">
        <h2 className="font-serif text-base font-semibold mb-3">放飞技巧</h2>
        <div className="bg-primary/5 rounded-xl p-4 border border-primary/20 shadow-sm">
          <p className="text-sm text-foreground leading-relaxed">{kite.tips}</p>
        </div>
      </section>
    </PageLayout>
  );
}
