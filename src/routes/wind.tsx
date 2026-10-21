import { useState, useEffect } from "react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { Wind, Thermometer, Droplets, Compass, AlertTriangle, CheckCircle2, CloudRain, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/wind")({
  component: WindPage,
});

// 模拟潍坊地区风力数据
const WIND_DATA = {
  current: { speed: 3.2, direction: "东南", level: 2 },
  hourly: [
    { time: "现在", speed: 3.2, level: 2 },
    { time: "10:00", speed: 4.1, level: 3 },
    { time: "11:00", speed: 5.3, level: 3 },
    { time: "12:00", speed: 6.8, level: 4 },
    { time: "13:00", speed: 7.2, level: 4 },
    { time: "14:00", speed: 6.5, level: 4 },
    { time: "15:00", speed: 5.8, level: 3 },
    { time: "16:00", speed: 4.9, level: 3 },
  ],
};

function getWindAdvice(level: number) {
  if (level <= 1) return { text: "风力过小，适合微型风筝试飞", icon: Wind, color: "text-muted-foreground" };
  if (level === 2) return { text: "微风宜人，适合小型软翅风筝", icon: CheckCircle2, color: "text-primary" };
  if (level === 3) return { text: "风力适中，大多数风筝可稳定飞行", icon: CheckCircle2, color: "text-primary" };
  if (level === 4) return { text: "风力较强，建议选用骨架坚固的大型风筝", icon: AlertTriangle, color: "text-amber-500" };
  if (level >= 5) return { text: "风力过猛，普通风筝易受损，请谨慎放飞", icon: AlertTriangle, color: "text-destructive" };
  return { text: "风力异常，不建议放飞", icon: AlertTriangle, color: "text-destructive" };
}

function WindPage() {
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const advice = getWindAdvice(WIND_DATA.current.level);
  const AdviceIcon = advice.icon;

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

      {/* 当前风力 + 放飞建议（合并） */}
      <section className="mb-6 reveal">
        <h1 className="font-serif text-xl font-bold text-foreground mb-4">今日风力检测</h1>
        <div className={`rounded-2xl p-6 border shadow-sm ${advice.color.includes("primary") ? "bg-primary/5 border-primary/20" : advice.color.includes("amber") ? "bg-amber-50 border-amber-200" : "bg-destructive/5 border-destructive/20"}`}>
          {/* 风力数据 */}
          <div className="text-center mb-4">
            <Wind className="text-primary mx-auto mb-3" size={40} />
            <p className="text-5xl font-bold text-primary tabular-nums">{WIND_DATA.current.speed}</p>
            <p className="text-sm text-muted-foreground mt-1">m/s · {WIND_DATA.current.direction}风</p>
            <p className="text-lg font-semibold text-foreground mt-2">{WIND_DATA.current.level} 级风</p>
          </div>

          {/* 分隔线 */}
          <div className="border-t border-current opacity-20 my-4"></div>

          {/* 放飞建议 */}
          <div className="flex items-start gap-3">
            <AdviceIcon className={`${advice.color} shrink-0 mt-0.5`} size={20} />
            <div>
              <h3 className="font-serif text-sm font-semibold text-foreground mb-1">放飞建议</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{advice.text}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 逐时预报 */}
      <section className="mb-6 reveal">
        <h2 className="font-serif text-base font-semibold mb-3 px-1">逐时风力预报</h2>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {WIND_DATA.hourly.map((hour) => (
            <div
              key={hour.time}
              className={`shrink-0 w-16 rounded-xl p-3 text-center border shadow-sm ${
                hour.time === "现在" ? "bg-primary/10 border-primary/30" : "bg-card border-border"
              }`}
            >
              <p className="text-[10px] text-muted-foreground mb-1">{hour.time}</p>
              <Wind className="mx-auto mb-1" size={16} />
              <p className="text-sm font-bold text-foreground tabular-nums">{hour.speed}</p>
              <p className="text-[10px] text-muted-foreground">{hour.level}级</p>
            </div>
          ))}
        </div>
      </section>

      {/* 环境参数 */}
      <section className="space-y-3 mb-6">
        <div className="bg-card rounded-xl p-4 border border-border shadow-sm flex items-center gap-3 reveal">
          <Thermometer className="text-primary shrink-0" size={20} />
          <div className="flex-1">
            <p className="text-xs text-muted-foreground">气温</p>
            <p className="text-sm font-semibold text-foreground">18°C · 体感舒适</p>
          </div>
        </div>

        <div className="bg-card rounded-xl p-4 border border-border shadow-sm flex items-center gap-3 reveal">
          <Droplets className="text-primary shrink-0" size={20} />
          <div className="flex-1">
            <p className="text-xs text-muted-foreground">湿度</p>
            <p className="text-sm font-semibold text-foreground">45% · 纸张不易受潮</p>
          </div>
        </div>

        <div className="bg-card rounded-xl p-4 border border-border shadow-sm flex items-center gap-3 reveal">
          <Compass className="text-primary shrink-0" size={20} />
          <div className="flex-1">
            <p className="text-xs text-muted-foreground">风向</p>
            <p className="text-sm font-semibold text-foreground">东南风 · 适合开阔场地</p>
          </div>
        </div>

        <div className="bg-card rounded-xl p-4 border border-border shadow-sm flex items-center gap-3 reveal">
          <CloudRain className="text-primary shrink-0" size={20} />
          <div className="flex-1">
            <p className="text-xs text-muted-foreground">降水概率</p>
            <p className="text-sm font-semibold text-foreground">10% · 适宜放飞</p>
          </div>
        </div>
      </section>

      {/* 安全提示 */}
      <section className="reveal">
        <div className="bg-muted/50 rounded-xl p-4 border border-border">
          <h3 className="font-serif text-sm font-semibold text-foreground mb-2">放飞安全须知</h3>
          <ul className="text-xs text-muted-foreground space-y-1.5 list-disc list-inside">
            <li>远离高压输电线路，避免风筝线导电引发触电</li>
            <li>避开人群密集区域，防止风筝线伤人</li>
            <li>儿童放飞需家长全程陪同指导</li>
            <li>发现乌云聚集应立即收回风筝，切勿在雷电天气中继续放飞</li>
            <li>断线风筝若挂在树上，切勿攀爬，应寻求专业帮助</li>
          </ul>
        </div>
      </section>
    </PageLayout>
  );
}
