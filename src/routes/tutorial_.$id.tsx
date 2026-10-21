import { createFileRoute, useRouter } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { ArrowLeft, Hammer, Layers, Palette, Cloud, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/tutorial_/$id")({
  component: TutorialDetailPage,
});

const TUTORIAL_DETAILS: Record<string, {
  step: string;
  title: string;
  icon: any;
  color: string;
  bgColor: string;
  intro: string;
  materials: string[];
  steps: { title: string; desc: string; tip?: string }[];
  tips: string[];
  commonMistakes: string[];
}> = {
  "zhazhu": {
    step: "扎",
    title: "竹篾骨架",
    icon: Hammer,
    color: "text-secondary",
    bgColor: "bg-secondary/10",
    intro: "扎制是风筝制作的第一步，也是决定风筝飞行性能的关键。好的骨架需要轻盈、坚固、对称，才能在空中稳定飞行。",
    materials: ["老竹（2-3年生）", "锋利刀具", "细线或棉绳", "砂纸", "火源（烤弯用）"],
    steps: [
      {
        title: "选材劈篾",
        desc: "选择节距均匀、质地坚韧的老竹，沿竹纹纵向劈成宽窄一致的竹篾。粗篾用于主梁，细篾用于辅梁。",
        tip: "竹篾厚度应控制在1-2mm，过厚则重，过薄易断。"
      },
      {
        title: "烤弯定型",
        desc: "将竹篾在火上均匀加热，待软化后按设计形状弯曲定型。冷却后竹篾会保持弯曲形状。",
        tip: "火候要均匀，避免局部过热导致碳化变脆。"
      },
      {
        title: "绑扎骨架",
        desc: "将主梁和辅梁交叉摆放，用细线十字交叉绑扎固定。绑点要牢固，位置要准确对称。",
        tip: "绑扎时可用胶水加固，但用量要少，避免增加重量。"
      },
      {
        title: "校正平衡",
        desc: "将骨架悬挂起来，检查左右是否对称、重心是否居中。如有偏差，微调竹篾长度或位置。",
        tip: "平衡是飞行的关键，宁可多花时间校正，也不要急于进入下一步。"
      }
    ],
    tips: [
      "竹篾要顺纹劈开，逆纹容易断裂",
      "烤弯时温度不宜过高，以手能忍受为度",
      "绑扎点要尽量小，减少重量和阻力",
      "完成后用手掂量，整体应轻盈均匀"
    ],
    commonMistakes: [
      "竹篾厚薄不均，导致重心偏移",
      "绑扎不牢，飞行中骨架散架",
      "左右不对称，风筝偏向一侧飞行",
      "骨架过重，需要较大风力才能起飞"
    ]
  },
  "huzhi": {
    step: "糊",
    title: "裱糊蒙面",
    icon: Layers,
    color: "text-secondary",
    bgColor: "bg-secondary/10",
    intro: "裱糊是将纸张或绢布粘贴到骨架上的过程。蒙面材料的选择和裱糊技巧直接影响风筝的外观和飞行性能。",
    materials: ["宣纸/皮纸/绢布", "浆糊或白乳胶", "毛笔", "剪刀", "夹子"],
    steps: [
      {
        title: "裁剪蒙面",
        desc: "根据骨架形状，在纸上画出轮廓，留出1-2cm的包边余量后剪下。",
        tip: "纸纹方向应与主梁平行，有利于保持形状。"
      },
      {
        title: "涂刷浆糊",
        desc: "用毛笔在骨架边缘均匀涂刷薄层浆糊，注意不要涂到骨架中间。",
        tip: "浆糊要稀薄均匀，过稠会导致纸张起皱。"
      },
      {
        title: "贴合蒙面",
        desc: "将裁好的纸张对准骨架，从中心向四周轻轻按压贴合，确保平整无气泡。",
        tip: "动作要轻柔快速，避免浆糊干燥前纸张移位。"
      },
      {
        title: "修剪包边",
        desc: "待浆糊半干后，修剪多余纸边，将包边翻折粘贴到骨架背面，使边缘整齐美观。",
        tip: "包边要均匀一致，过宽影响美观，过窄容易脱胶。"
      },
      {
        title: "晾干定型",
        desc: "将裱糊好的风筝平放晾干，避免阳光直射和强风，防止变形。",
        tip: "完全干燥需要4-6小时，期间不要移动或触碰。"
      }
    ],
    tips: [
      "宣纸轻薄透气，适合小型风筝",
      "皮纸韧性好，适合大型风筝",
      "绢布质感高级，但成本较高",
      "浆糊浓度以能流动但不滴落为宜"
    ],
    commonMistakes: [
      "纸张绷紧过度，干燥后收缩变形",
      "浆糊涂抹不均，产生气泡或褶皱",
      "包边不齐，影响美观且容易脱胶",
      "未完全干燥就使用，导致蒙面松弛"
    ]
  },
  "huihua": {
    step: "绘",
    title: "彩绘装饰",
    icon: Palette,
    color: "text-secondary",
    bgColor: "bg-secondary/10",
    intro: "彩绘是赋予风筝灵魂的一步。潍坊杨家埠风筝以木版年画风格著称，色彩鲜艳、寓意吉祥，具有浓厚的民间艺术特色。",
    materials: ["国画颜料/丙烯颜料", "毛笔（大中小号）", "调色盘", "清水", "杨家埠木版（可选）"],
    steps: [
      {
        title: "设计图样",
        desc: "根据风筝形状和主题，设计合适的图案。传统题材包括燕子、金鱼、荷花、蝙蝠（谐音'福'）等。",
        tip: "图案要与风筝形状协调，避免过于复杂影响飞行。"
      },
      {
        title: "勾勒轮廓",
        desc: "用细笔蘸墨或深色颜料，轻轻勾勒出图案的主要轮廓线条。",
        tip: "线条要流畅自然，可先用铅笔轻描打底。"
      },
      {
        title: "填充色彩",
        desc: "按照'先浅后深、先大后小'的原则，用大号毛笔填充大面积底色，再用小号笔绘制细节。",
        tip: "潍坊风筝常用红、绿、黄、紫等高饱和度色彩，对比强烈。"
      },
      {
        title: "点睛修饰",
        desc: "最后用细笔添加眼睛、花纹等细节，使图案生动传神。可适当添加金粉或亮片增加华丽感。",
        tip: "点睛之笔要精准，一笔到位，反复修改会显得呆板。"
      },
      {
        title: "晾干保护",
        desc: "待颜料完全干燥后，可喷涂一层透明清漆保护画面，增强耐久性。",
        tip: "清漆要薄涂均匀，过厚会增加重量影响飞行。"
      }
    ],
    tips: [
      "传统潍坊风筝讲究'红配绿，一块玉'的色彩搭配",
      "颜料不宜过稠，否则容易开裂脱落",
      "对称图案要保证左右完全一致",
      "可在颜料中加入少量胶水，增强附着力"
    ],
    commonMistakes: [
      "色彩过于杂乱，失去视觉焦点",
      "颜料过厚，干燥后开裂剥落",
      "左右图案不对称，影响美观",
      "未等底色干透就画细节，导致颜色混浊"
    ]
  },
  "fangfei": {
    step: "放",
    title: "放飞技巧",
    icon: Cloud,
    color: "text-secondary",
    bgColor: "bg-secondary/10",
    intro: "放飞是检验风筝制作成果的最终环节。掌握正确的放飞技巧，才能让精心制作的风筝在空中翩翩起舞。",
    materials: ["风筝线（棉线/尼龙线）", "线轴/线轮", "手套（防割手）", "风向标（可选）"],
    steps: [
      {
        title: "拴提线",
        desc: "在风筝骨架的适当位置拴上提线。一般菱形风筝拴2-3根，形成稳定的三角受力结构。",
        tip: "提线角度决定风筝的迎角，通常为30-45度。"
      },
      {
        title: "判断风向风力",
        desc: "观察旗帜、树叶或感受面部风向，确定风向和风力等级。2-4级风最适合放飞普通风筝。",
        tip: "背风站立，风从背后吹来时为顺风，适合起飞。"
      },
      {
        title: "助跑起飞",
        desc: "一人持风筝迎风举起，另一人手持线轴后退10-20米。持线者喊'放'，举风筝者松手，持线者同时小步助跑并放线。",
        tip: "助跑速度要适中，过快容易失控，过慢升力不足。"
      },
      {
        title: "调整高度",
        desc: "风筝起飞后，通过收放线控制高度。感觉拉力大时放线，拉力小时收线。保持线与地面约45-60度角。",
        tip: "不要一次性放出太多线，应逐步增加高度。"
      },
      {
        title: "稳定飞行",
        desc: "当风筝达到理想高度后，固定线轴，让风筝自由飘浮。偶尔微调线的松紧，保持最佳状态。",
        tip: "如风筝摇摆不定，可能是提线角度不当或风力不稳定。"
      },
      {
        title: "安全收线",
        desc: "放飞结束后，缓慢收线，避免突然拉扯导致风筝坠落损坏。接近地面时，请人协助接住风筝。",
        tip: "收线时要戴手套，防止细线割伤手指。"
      }
    ],
    tips: [
      "选择开阔无障碍物的场地，远离电线和树木",
      "雷雨天气严禁放飞风筝",
      "儿童放飞需有成人陪同",
      "线轴要握紧，防止被风筝拖走"
    ],
    commonMistakes: [
      "逆风起飞，风筝无法获得足够升力",
      "提线角度不当，风筝头朝下或打转",
      "放线过快，风筝失去控制",
      "在人群密集处放飞，存在安全隐患"
    ]
  }
};

function TutorialDetailPage() {
  const router = useRouter();
  const { id } = Route.useParams();
  const tutorial = TUTORIAL_DETAILS[id];

  if (!tutorial) {
    return (
      <PageLayout>
        <div className="text-center py-20">
          <p className="text-muted-foreground">未找到该教程内容</p>
        </div>
      </PageLayout>
    );
  }

  const IconComponent = tutorial.icon;

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
        <div className={`rounded-2xl p-6 ${tutorial.bgColor} border border-border shadow-sm`}>
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center bg-white/80`}>
              <IconComponent className={tutorial.color} size={28} />
            </div>
            <div>
              <span className="text-xs font-medium text-muted-foreground bg-white/60 px-2 py-0.5 rounded">
                第{["zhazhu", "huzhi", "huihua", "fangfei"].indexOf(id) + 1}步
              </span>
              <h1 className="font-serif text-2xl font-bold text-foreground mt-1">{tutorial.title}</h1>
            </div>
          </div>
          <p className="text-sm text-foreground leading-relaxed">{tutorial.intro}</p>
        </div>
      </section>

      {/* 所需材料 */}
      <section className="mb-6 reveal">
        <h2 className="font-serif text-base font-semibold mb-3">所需材料</h2>
        <div className="bg-card rounded-xl p-4 border border-border shadow-sm">
          <div className="flex flex-wrap gap-2">
            {tutorial.materials.map((material, index) => (
              <span key={index} className="text-xs bg-muted px-3 py-1.5 rounded-full text-foreground">
                {material}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 制作步骤 */}
      <section className="mb-6 reveal">
        <h2 className="font-serif text-base font-semibold mb-3">详细步骤</h2>
        <div className="space-y-4">
          {tutorial.steps.map((step, index) => (
            <div key={index} className="bg-card rounded-xl p-4 border border-border shadow-sm">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-sm font-semibold text-primary">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                  {step.tip && (
                    <div className="mt-2 flex items-start gap-1.5 text-xs text-secondary">
                      <CheckCircle2 size={14} className="shrink-0 mt-0.5" />
                      <span>{step.tip}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 技巧要点 */}
      <section className="mb-6 reveal">
        <h2 className="font-serif text-base font-semibold mb-3">技巧要点</h2>
        <div className="bg-primary/5 rounded-xl p-4 border border-primary/20 shadow-sm">
          <ul className="space-y-2">
            {tutorial.tips.map((tip, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-foreground">
                <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5"></div>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 常见错误 */}
      <section className="reveal">
        <h2 className="font-serif text-base font-semibold mb-3">常见错误</h2>
        <div className="bg-destructive/5 rounded-xl p-4 border border-destructive/20 shadow-sm">
          <ul className="space-y-2">
            {tutorial.commonMistakes.map((mistake, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-foreground">
                <span className="text-destructive shrink-0">✕</span>
                <span>{mistake}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PageLayout>
  );
}
