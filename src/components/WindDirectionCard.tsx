import { useState } from "react";
import { Sparkles, RefreshCw, Wind } from "lucide-react";

const knowledgeList = [
  { title: "鲁班造鹊", brief: "春秋时期，鲁班削竹为鹊，三日不下，是最早的风筝雏形。" },
  { title: "选竹之道", brief: "扎风筝的竹篾要选三年以上的老竹子，韧性最好。" },
  { title: "风力经验", brief: "一级风能起，五级风不折，是放风筝的经验之谈。" },
  { title: "提线平衡", brief: "提线拴法决定风筝的平衡，单点适合小风筝，两点更稳。" },
  { title: "尾巴的作用", brief: "风筝的尾巴不仅美观，更是保持飞行稳定的关键。" },
  { title: "逆风起飞", brief: "逆风奔跑是起飞的关键，顺风反而飞不起来。" },
  { title: "清明习俗", brief: "宋代民间已有清明放风筝的习俗，寓意放走晦气。" },
  { title: "四艺标准", brief: "一只好的风筝，扎得正、糊得平、绘得美、放得稳。" },
];

const windSuggestions = [
  "风力 3 级，适合放沙燕",
  "风力 2-3 级，宜放小型风筝",
  "风力 4 级，可放大型风筝",
  "微风轻拂，适合初学者练习",
];

export function WindDirectionCard() {
  const [knowledgeIndex, setKnowledgeIndex] = useState(
    Math.floor(Date.now() / (1000 * 60 * 60 * 24)) % knowledgeList.length
  );
  const [windIndex, setWindIndex] = useState(
    Math.floor(Date.now() / (1000 * 60 * 60)) % windSuggestions.length
  );

  const handleRefresh = () => {
    setKnowledgeIndex((prev) => (prev + 1) % knowledgeList.length);
    setWindIndex((prev) => (prev + 1) % windSuggestions.length);
  };

  const todayKnowledge = knowledgeList[knowledgeIndex];
  const todayWind = windSuggestions[windIndex];

  return (
    <div className="bg-card rounded-2xl p-4 shadow-sm border border-border reveal card-tap">
      <div className="flex items-start gap-3">
        <Sparkles className="text-primary shrink-0 mt-0.5" size={20} strokeWidth={1.5} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-serif text-base font-semibold text-foreground">
              今日风向标
            </h3>
            <button
              onClick={handleRefresh}
              className="p-1.5 rounded-full hover:bg-muted transition-colors"
            >
              <RefreshCw size={16} className="text-muted-foreground" />
            </button>
          </div>
          
          <p className="text-sm text-foreground leading-relaxed mb-2">
            {todayKnowledge.brief}
          </p>
          
          <div className="flex items-center gap-2 pt-2 border-t border-border">
            <Wind size={14} className="text-primary shrink-0" strokeWidth={1.5} />
            <p className="text-xs text-muted-foreground">
              {todayWind}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
