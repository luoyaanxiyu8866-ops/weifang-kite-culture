import { createFileRoute, useRouter } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { ArrowLeft, Award, MapPin, Calendar, BookOpen } from "lucide-react";

export const Route = createFileRoute("/inheritor_/$id")({
  component: InheritorDetailPage,
});

const INHERITOR_DETAILS: Record<string, {
  name: string;
  title: string;
  avatar: string;
  region: string;
  specialty: string;
  bio: string;
  achievements: string[];
  works: string[];
  quote?: string;
}> = {
  "zhang-xiaodong": {
    name: "张效东",
    title: "国家级非物质文化遗产传承人",
    avatar: "https://g.cdn.meoo.host/y9abx2r52424/ai-images/zhang-xiaodong-avatar.png?auth_key=2c8994d59e658e00e853f1d3e4495afc14efaf08743feda88e8a2166512236c4",
    region: "山东潍坊",
    specialty: "龙头蜈蚣风筝",
    bio: "张效东是潍坊风筝制作的代表性传承人，自幼跟随父亲学习风筝制作技艺。他精通龙头蜈蚣风筝的制作，能够独立完成从选材、扎制到彩绘的全过程。其作品气势恢宏，最长可达数百米，在国内外风筝比赛中屡获殊荣。",
    achievements: [
      "2008年入选国家级非物质文化遗产传承人名单",
      "多次获得潍坊国际风筝节金奖",
      "创作百米龙头蜈蚣风筝，创世界纪录",
      "培养徒弟30余人，传承技艺"
    ],
    works: ["百米龙头蜈蚣", "双龙戏珠", "凤凰展翅", "百鸟朝凤"],
    quote: "风筝不仅是手艺，更是文化的传承。每一根竹篾都承载着祖辈的智慧。"
  },
  "wang-yongxun": {
    name: "王永训",
    title: "省级非物质文化遗产传承人",
    avatar: "https://g.cdn.meoo.host/y9abx2r52424/ai-images/wang-yongxun-avatar.png?auth_key=a8b7a85bf8d735ce2fdf781d8cacee7ca3a54bf60366de6e28e661896db9a8f0",
    region: "山东潍坊",
    specialty: "精巧型风筝",
    bio: "王永训以制作精巧型风筝闻名，他的作品结构严谨、造型优美、飞行性能卓越。他曾创造多项风筝放飞世界纪录，包括最高放飞高度和最长滞空时间。他的技艺融合了传统与创新，为潍坊风筝的发展做出了重要贡献。",
    achievements: [
      "创造风筝放飞高度世界纪录（5000米）",
      "获得吉尼斯世界纪录认证",
      "省级非物质文化遗产传承人",
      "出版《潍坊风筝制作技法》专著"
    ],
    works: ["微型沙燕", "精致蝴蝶", "玲珑金鱼", "精巧蜻蜓"],
    quote: "小中见大，精中求妙。风筝虽小，却蕴含无限可能。"
  },
  "guo-hongli": {
    name: "郭洪利",
    title: "青年传承人",
    avatar: "https://g.cdn.meoo.host/y9abx2r52424/ai-images/guo-hongli-avatar.png?auth_key=be2c6f39d5493a7ed9f0398feb3faf1f54d4698e6256b1e583bc2a11d79c06f5",
    region: "山东潍坊",
    specialty: "创新设计风筝",
    bio: "郭洪利是潍坊风筝界的青年代表，致力于将传统风筝技艺与现代设计理念相结合。他擅长运用新材料、新工艺，创作出既保留传统韵味又具有现代审美的风筝作品。他还积极推动风筝文化的国际化传播。",
    achievements: [
      "获得中国工艺美术大师称号",
      "作品入选国家对外文化交流项目",
      "创办风筝文化工作室",
      "推动风筝技艺进校园活动"
    ],
    works: ["现代荷花", "抽象几何", "卡通形象", "科技主题"],
    quote: "传统不是守旧，创新不能忘本。要在传承中寻找新的表达方式。"
  },
  "yang-fushan": {
    name: "杨福山",
    title: "国家级非物质文化遗产传承人",
    avatar: "https://g.cdn.meoo.host/y9abx2r52424/ai-images/yang-fushan-avatar.png?auth_key=dummy1",
    region: "山东潍坊杨家埠",
    specialty: "杨家埠木版年画风筝",
    bio: "杨福山出身于杨家埠木版年画世家，是将木版年画艺术与风筝制作完美结合的代表人物。他精通木版雕刻和风筝扎制两门技艺，作品色彩浓烈、造型夸张，具有浓厚的民间艺术特色。",
    achievements: [
      "国家级非物质文化遗产传承人",
      "杨家埠木版年画第X代传人",
      "作品被中国美术馆收藏",
      "多次参加国际民间艺术展览"
    ],
    works: ["门神风筝", "财神风筝", "福禄寿三星", "年年有余"],
    quote: "年画是平面的艺术，风筝是立体的年画。两者结合，让传统文化飞得更高。"
  },
  "liu-zongren": {
    name: "刘宗仁",
    title: "省级非物质文化遗产传承人",
    avatar: "https://g.cdn.meoo.host/y9abx2r52424/ai-images/liu-zongren-avatar.png?auth_key=dummy2",
    region: "北京",
    specialty: "沙燕风筝",
    bio: "刘宗仁是京派沙燕风筝的杰出代表，师从曹氏传人，深得沙燕制作精髓。他的作品造型优美、比例协调、飞行稳定，被誉为'活燕子'。他致力于京派风筝技艺的传承和推广。",
    achievements: [
      "省级非物质文化遗产传承人",
      "北京风筝协会副会长",
      "作品获全国风筝大赛特等奖",
      "编写《沙燕风筝制作教程》"
    ],
    works: ["经典沙燕", "双燕齐飞", "燕归巢", "春燕报喜"],
    quote: "沙燕之美，在于灵动。要让风筝像真燕子一样在空中自由飞翔。"
  },
  "chen-guanqun": {
    name: "陈冠群",
    title: "市级非物质文化遗产传承人",
    avatar: "https://g.cdn.meoo.host/y9abx2r52424/ai-images/chen-guanqun-avatar.png?auth_key=dummy3",
    region: "江苏南通",
    specialty: "板鹞风筝哨音工艺",
    bio: "陈冠群是南通板鹞风筝哨音工艺的专家，精通各种哨子的制作和调音技术。他能够根据风力大小调整哨音的高低和音色，使风筝在空中奏出悦耳动听的'交响乐'。",
    achievements: [
      "市级非物质文化遗产传承人",
      "南通板鹞风筝研究会会长",
      "研制出12种不同音色的哨子",
      "举办板鹞风筝音乐节"
    ],
    works: ["五音板鹞", "八音合奏", "风鸣九天", "空中交响"],
    quote: "哨音是板鹞的灵魂。好的哨音能让风筝在空中唱歌，让人心旷神怡。"
  },
  "zhao-ming": {
    name: "赵明",
    title: "青年传承人",
    avatar: "https://g.cdn.meoo.host/y9abx2r52424/ai-images/zhao-ming-avatar.png?auth_key=dummy4",
    region: "浙江杭州",
    specialty: "蝴蝶风筝创新设计",
    bio: "赵明是一位年轻的风筝设计师，专注于蝴蝶风筝的创新设计。他将现代美学理念融入传统蝴蝶风筝制作，运用渐变色彩和流线型设计，创造出极具视觉冲击力的作品。",
    achievements: [
      "获得青年工艺美术师称号",
      "作品入选杭州亚运会文创产品",
      "创立个人风筝设计品牌",
      "开设线上风筝设计课程"
    ],
    works: ["幻彩蝴蝶", "流光蝶影", "蝶舞春风", "梦幻之翼"],
    quote: "蝴蝶是大自然的画家，我要用风筝把这份美丽定格在空中。"
  },
  "sun-wei": {
    name: "孙伟",
    title: "民间艺人",
    avatar: "https://g.cdn.meoo.host/y9abx2r52424/ai-images/sun-wei-avatar.png?auth_key=dummy5",
    region: "河南开封",
    specialty: "八卦风筝",
    bio: "孙伟是一位深耕传统文化的民间艺人，专精于八卦风筝的制作。他深谙易经八卦文化，将阴阳五行理念融入风筝设计，作品不仅具有观赏价值，更蕴含深厚的文化内涵。",
    achievements: [
      "开封市民间工艺大师",
      "作品被多家博物馆收藏",
      "举办八卦文化讲座",
      "参与非遗进社区活动"
    ],
    works: ["太极八卦", "乾坤天地", "阴阳调和", "五行相生"],
    quote: "八卦不仅是符号，更是宇宙的运行规律。风筝飞起时，便是天人合一的时刻。"
  }
};

function InheritorDetailPage() {
  const router = useRouter();
  const { id } = Route.useParams();
  const inheritor = INHERITOR_DETAILS[id];

  if (!inheritor) {
    return (
      <PageLayout>
        <div className="text-center py-20">
          <p className="text-muted-foreground">未找到该传承人信息</p>
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

      {/* 头像和基本信息 */}
      <section className="mb-6 reveal">
        <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-muted shrink-0">
              <img
                src={inheritor.avatar}
                alt={inheritor.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h1 className="font-serif text-2xl font-bold text-foreground mb-1">{inheritor.name}</h1>
              <p className="text-sm text-primary font-medium">{inheritor.title}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="flex items-center gap-2 text-sm">
              <MapPin size={16} className="text-muted-foreground shrink-0" />
              <span className="text-muted-foreground">{inheritor.region}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Award size={16} className="text-muted-foreground shrink-0" />
              <span className="text-muted-foreground">{inheritor.specialty}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 个人简介 */}
      <section className="mb-6 reveal">
        <h2 className="font-serif text-base font-semibold mb-3 flex items-center gap-2">
          <BookOpen size={18} className="text-primary" />
          个人简介
        </h2>
        <div className="bg-card rounded-xl p-4 border border-border shadow-sm">
          <p className="text-sm text-foreground leading-relaxed">{inheritor.bio}</p>
        </div>
      </section>

      {/* 主要成就 */}
      <section className="mb-6 reveal">
        <h2 className="font-serif text-base font-semibold mb-3 flex items-center gap-2">
          <Award size={18} className="text-primary" />
          主要成就
        </h2>
        <div className="space-y-2">
          {inheritor.achievements.map((achievement, index) => (
            <div key={index} className="bg-card rounded-lg p-3 border border-border shadow-sm flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5"></div>
              <p className="text-sm text-foreground">{achievement}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 代表作品 */}
      <section className="mb-6 reveal">
        <h2 className="font-serif text-base font-semibold mb-3">代表作品</h2>
        <div className="flex flex-wrap gap-2">
          {inheritor.works.map((work, index) => (
            <span key={index} className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full">
              {work}
            </span>
          ))}
        </div>
      </section>

      {/* 匠人语录 */}
      {inheritor.quote && (
        <section className="reveal">
          <h2 className="font-serif text-base font-semibold mb-3">匠人语录</h2>
          <div className="bg-primary/5 rounded-xl p-4 border border-primary/20 shadow-sm">
            <p className="text-sm text-foreground italic leading-relaxed">"{inheritor.quote}"</p>
          </div>
        </section>
      )}
    </PageLayout>
  );
}
