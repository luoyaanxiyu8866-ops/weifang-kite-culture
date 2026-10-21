import { createFileRoute, useRouter } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { ArrowLeft, Calendar, BookOpen, Lightbulb, Users } from "lucide-react";

export const Route = createFileRoute("/history_/$id")({
  component: HistoryDetailPage,
});

const HISTORY_DETAILS: Record<string, {
  year: string;
  title: string;
  subtitle: string;
  icon: any;
  color: string;
  bgColor: string;
  description: string;
  background: string;
  significance: string;
  relatedFigures?: string[];
  artifacts?: string[];
}> = {
  "spring-autumn": {
    year: "春秋时期（约公元前5世纪）",
    title: "鲁班削竹为鹊，三日不下",
    subtitle: "最早的风筝雏形",
    icon: Calendar,
    color: "text-primary",
    bgColor: "bg-primary/10",
    description: "据《墨子·鲁问》记载，公输班（鲁班）用竹子制作了一只木鹊，能够在空中飞行三天而不落地。这是中国历史上关于飞行器最早的文字记录之一，被视为风筝的雏形。",
    background: "春秋战国时期，各国争霸，军事技术迅速发展。鲁班作为著名的工匠和发明家，在机械制造方面有着卓越的才能。他制作的木鹊虽然可能更多是传说色彩，但反映了当时人们对飞行的向往和探索。",
    significance: "这一记载标志着人类对飞行器的早期探索，为后世风筝的发展奠定了思想基础。虽然木鹊与后来的风筝在结构和用途上有所不同，但它体现了古人利用自然力量实现飞行的智慧。",
    relatedFigures: ["鲁班（公输班）", "墨子"],
    artifacts: ["《墨子·鲁问》文献记载"]
  },
  "han": {
    year: "汉代（公元前202年-公元220年）",
    title: "韩信以纸鸢测量距离",
    subtitle: "军事用途的开端",
    icon: Calendar,
    color: "text-primary",
    bgColor: "bg-primary/10",
    description: "相传汉初名将韩信在围攻项羽时，使用纸鸢（早期风筝）来测量城墙高度和距离，以便制定攻城策略。这是风筝最早用于军事目的的记载。",
    background: "楚汉相争时期，军事谋略和工程技术都达到了新的高度。韩信作为杰出的军事家，善于运用各种手段获取战场信息。纸鸢的使用体现了古代军事智慧与创新思维的结合。",
    significance: "这标志着风筝从单纯的玩具或工艺品向实用工具转变，开启了风筝在军事侦察、通信等领域的应用历史。同时也说明了风筝技术在汉代已经相当成熟。",
    relatedFigures: ["韩信", "项羽"],
    artifacts: ["汉代壁画中的风筝形象", "《史记》相关记载"]
  },
  "tang": {
    year: "唐代（618年-907年）",
    title: "造纸术普及，纸鸢流行",
    subtitle: "民间娱乐兴起",
    icon: Calendar,
    color: "text-primary",
    bgColor: "bg-primary/10",
    description: "随着造纸术的普及和改进，纸张成本降低，质量提高，使得用纸张制作风筝成为可能。纸鸢逐渐从宫廷走向民间，成为一种流行的娱乐活动。",
    background: "唐代是中国历史上文化繁荣、经济发达的时期。造纸术在这一时期得到进一步发展和普及，为纸鸢的制作提供了物质基础。同时，唐代社会开放包容，民间娱乐活动丰富多彩。",
    significance: "纸鸢的出现是风筝发展史上的重要转折点。相比竹木制成的早期风筝，纸鸢更轻便、成本更低、更容易制作，这使得风筝能够真正走进普通百姓的生活，成为大众化的娱乐活动。",
    relatedFigures: ["蔡伦（造纸术改进者）"],
    artifacts: ["唐代纸鸢实物残片", "唐诗中关于放风筝的描述"]
  },
  "song": {
    year: "宋代（960年-1279年）",
    title: "清明放风筝成习俗",
    subtitle: "寓意放走晦气",
    icon: Calendar,
    color: "text-primary",
    bgColor: "bg-primary/10",
    description: "宋代时期，清明节放风筝成为一种广泛流行的民俗活动。人们相信，将风筝放上天后剪断线绳，让风筝随风飘走，可以带走一年的晦气和疾病，带来好运和健康。",
    background: "宋代城市经济繁荣，市民文化兴盛，各种节庆活动丰富多彩。清明节作为重要的传统节日，除了扫墓祭祖外，也逐渐融入了踏青、放风筝等娱乐活动。这种习俗在《东京梦华录》等文献中有详细记载。",
    significance: "这一习俗的形成标志着风筝从单纯的娱乐工具转变为具有文化内涵和精神寄托的载体。放风筝不再仅仅是为了好玩，更承载了人们对美好生活的祈愿和对传统文化的传承。",
    relatedFigures: ["宋代文人墨客"],
    artifacts: ["《清明上河图》中的风筝场景", "宋代诗词中的风筝描写"]
  },
  "ming-qing": {
    year: "明清时期（1368年-1912年）",
    title: "风筝发展鼎盛期",
    subtitle: "种类多达上百种",
    icon: Calendar,
    color: "text-primary",
    bgColor: "bg-primary/10",
    description: "明清两代是风筝发展的黄金时期，风筝的种类、制作工艺和艺术水平都达到了前所未有的高度。出现了沙燕、龙头蜈蚣、蝴蝶、八卦等上百种不同造型的风筝，各地形成了各具特色的风筝流派。",
    background: "明清时期，手工业和商业高度发达，民间艺术蓬勃发展。风筝制作技艺在这一时期得到了极大的提升，不仅注重飞行性能，更追求艺术美感。北京、潍坊、南通等地形成了各自独特的风筝风格和制作传统。",
    significance: "这一时期奠定了现代风筝的基本格局，许多经典的风筝造型和制作技法都源自明清。同时，风筝也开始成为文人雅士吟诗作画的题材，进入了高雅艺术的殿堂。曹雪芹的《南鹞北鸢考工志》就是这一时期的代表作。",
    relatedFigures: ["曹雪芹", "各地风筝匠人"],
    artifacts: ["《南鹞北鸢考工志》", "明清风筝实物", "古代风筝图谱"]
  },
  "modern": {
    year: "现代（1984年至今）",
    title: "潍坊国际风筝节",
    subtitle: "每年四月，全球盛会",
    icon: Calendar,
    color: "text-primary",
    bgColor: "bg-primary/10",
    description: "自1984年起，潍坊每年四月举办国际风筝节，吸引了来自世界各地的风筝爱好者和专业人士。如今，潍坊国际风筝节已成为世界上规模最大、影响最广的风筝盛会，被誉为'风筝之都'。",
    background: "改革开放后，中国政府重视传统文化的保护和传承。潍坊作为风筝的重要发源地之一，于1984年创办了首届国际风筝节。经过几十年的发展，风筝节已成为集文化交流、经贸合作、旅游观光于一体的综合性国际盛会。",
    significance: "潍坊国际风筝节的成功举办，不仅推动了风筝文化的国际传播，也促进了中外文化交流。它使风筝从传统的民间艺术走向了世界舞台，成为中国文化的一张亮丽名片。同时，也带动了当地经济的发展和风筝产业的繁荣。",
    relatedFigures: ["潍坊市政府", "国际风筝协会"],
    artifacts: ["历届风筝节照片", "吉尼斯世界纪录认证"]
  },
  "2006": {
    year: "2006年",
    title: "入选国家级非遗",
    subtitle: "潍坊风筝制作技艺",
    icon: Calendar,
    color: "text-primary",
    bgColor: "bg-primary/10",
    description: "2006年，潍坊风筝制作技艺被国务院批准列入第一批国家级非物质文化遗产名录。这是对潍坊风筝历史文化价值和艺术成就的官方认可，也为风筝技艺的保护和传承提供了制度保障。",
    background: "进入21世纪，中国政府加大了对非物质文化遗产保护的力度。2006年，国务院公布第一批国家级非物质文化遗产名录，潍坊风筝制作技艺因其悠久的历史、精湛的工艺和深厚的文化底蕴而入选。",
    significance: "入选国家级非遗名录，标志着潍坊风筝制作技艺得到了国家层面的认可和保护。这不仅有利于技艺的传承和发展，也提高了风筝文化的社会地位和影响力。此后，一批批风筝传承人被评为国家级、省级非遗传承人，为风筝技艺的延续注入了新的活力。",
    relatedFigures: ["国务院", "文化部", "非遗传承人"],
    artifacts: ["国家级非物质文化遗产证书", "传承人名单"]
  }
};

function HistoryDetailPage() {
  const router = useRouter();
  const { id } = Route.useParams();
  const history = HISTORY_DETAILS[id];

  if (!history) {
    return (
      <PageLayout>
        <div className="text-center py-20">
          <p className="text-muted-foreground">未找到该历史事件信息</p>
        </div>
      </PageLayout>
    );
  }

  const IconComponent = history.icon;

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

      {/* 标题区域 */}
      <section className="mb-6 reveal">
        <div className={`rounded-2xl p-6 ${history.bgColor} border border-border shadow-sm`}>
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center bg-white/80`}>
              <IconComponent className={history.color} size={28} />
            </div>
            <div>
              <span className="text-xs font-medium text-muted-foreground bg-white/60 px-2 py-0.5 rounded">
                {history.year}
              </span>
              <h1 className="font-serif text-xl font-bold text-foreground mt-1">{history.title}</h1>
              <p className="text-sm text-muted-foreground mt-1">{history.subtitle}</p>
            </div>
          </div>
          <p className="text-sm text-foreground leading-relaxed">{history.description}</p>
        </div>
      </section>

      {/* 历史背景 */}
      <section className="mb-6 reveal">
        <h2 className="font-serif text-base font-semibold mb-3 flex items-center gap-2">
          <BookOpen size={18} className="text-primary" />
          历史背景
        </h2>
        <div className="bg-card rounded-xl p-4 border border-border shadow-sm">
          <p className="text-sm text-foreground leading-relaxed">{history.background}</p>
        </div>
      </section>

      {/* 历史意义 */}
      <section className="mb-6 reveal">
        <h2 className="font-serif text-base font-semibold mb-3 flex items-center gap-2">
          <Lightbulb size={18} className="text-primary" />
          历史意义
        </h2>
        <div className="bg-primary/5 rounded-xl p-4 border border-primary/20 shadow-sm">
          <p className="text-sm text-foreground leading-relaxed">{history.significance}</p>
        </div>
      </section>

      {/* 相关人物 */}
      {history.relatedFigures && history.relatedFigures.length > 0 && (
        <section className="mb-6 reveal">
          <h2 className="font-serif text-base font-semibold mb-3 flex items-center gap-2">
            <Users size={18} className="text-primary" />
            相关人物
          </h2>
          <div className="flex flex-wrap gap-2">
            {history.relatedFigures.map((figure, index) => (
              <span key={index} className="text-xs bg-secondary/10 text-secondary px-3 py-1.5 rounded-full">
                {figure}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* 相关文物 */}
      {history.artifacts && history.artifacts.length > 0 && (
        <section className="reveal">
          <h2 className="font-serif text-base font-semibold mb-3">相关文物/文献</h2>
          <div className="space-y-2">
            {history.artifacts.map((artifact, index) => (
              <div key={index} className="bg-card rounded-lg p-3 border border-border shadow-sm flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5"></div>
                <p className="text-sm text-foreground">{artifact}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </PageLayout>
  );
}
