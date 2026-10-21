import { useState, useEffect } from "react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { Calendar, Clock, MapPin, Users, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/countdown")({
  component: CountdownPage,
});

const TARGET_DATE = new Date("2027-04-01T00:00:00");

function getTimeLeft() {
  const now = new Date();
  const diff = Math.max(0, TARGET_DATE.getTime() - now.getTime());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

function CountdownPage() {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { value: timeLeft.days, label: "天" },
    { value: timeLeft.hours, label: "时" },
    { value: timeLeft.minutes, label: "分" },
    { value: timeLeft.seconds, label: "秒" },
  ];

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
      <section className="text-center mb-8 reveal">
        <h1 className="font-serif text-2xl font-bold text-foreground mb-2">
          第 44 届潍坊国际风筝会
        </h1>
        <p className="text-sm text-muted-foreground">2027 年 4 月 · 世界风筝都</p>
      </section>

      {/* 倒计时数字 */}
      <section className="mb-8 reveal">
        <div className="flex justify-center gap-3">
          {timeUnits.map((unit) => (
            <div
              key={unit.label}
              className="bg-card rounded-xl border border-border shadow-sm px-5 py-4 min-w-[72px]"
            >
              <p className="text-3xl font-bold text-primary tabular-nums">
                {String(unit.value).padStart(2, "0")}
              </p>
              <p className="text-xs text-muted-foreground mt-1">{unit.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 活动信息卡片 */}
      <section className="space-y-3 mb-6">
        <div className="bg-card rounded-xl p-4 border border-border shadow-sm flex items-start gap-3 reveal">
          <Calendar className="text-primary shrink-0 mt-0.5" size={20} />
          <div>
            <h3 className="font-serif text-sm font-semibold text-foreground mb-1">活动时间</h3>
            <p className="text-xs text-muted-foreground">2027 年 4 月 1 日 — 4 月 7 日</p>
          </div>
        </div>

        <div className="bg-card rounded-xl p-4 border border-border shadow-sm flex items-start gap-3 reveal">
          <MapPin className="text-primary shrink-0 mt-0.5" size={20} />
          <div>
            <h3 className="font-serif text-sm font-semibold text-foreground mb-1">活动地点</h3>
            <p className="text-xs text-muted-foreground">山东省潍坊市浮烟山国际风筝放飞场</p>
          </div>
        </div>

        <div className="bg-card rounded-xl p-4 border border-border shadow-sm flex items-start gap-3 reveal">
          <Users className="text-primary shrink-0 mt-0.5" size={20} />
          <div>
            <h3 className="font-serif text-sm font-semibold text-foreground mb-1">参与规模</h3>
            <p className="text-xs text-muted-foreground">预计来自 60+ 国家和地区的数千名风筝爱好者</p>
          </div>
        </div>

        <div className="bg-card rounded-xl p-4 border border-border shadow-sm flex items-start gap-3 reveal">
          <Clock className="text-primary shrink-0 mt-0.5" size={20} />
          <div>
            <h3 className="font-serif text-sm font-semibold text-foreground mb-1">精彩看点</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              百米龙头蜈蚣、夜光风筝表演、国际特技风筝大赛、传统工艺展示、创意风筝设计赛
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
