import { CheckCircle2, Circle } from "lucide-react";

const steps = [
  { name: "扎", progress: 100 },
  { name: "糊", progress: 75 },
  { name: "绘", progress: 50 },
  { name: "放", progress: 25 },
];

export function ProgressSection() {
  const totalProgress = Math.round(
    steps.reduce((sum, step) => sum + step.progress, 0) / steps.length
  );

  return (
    <div className="reveal">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-serif text-base font-semibold text-foreground">
          学习进度
        </h3>
        <span className="text-sm text-muted-foreground">{totalProgress}%</span>
      </div>
      <div className="space-y-3">
        {steps.map((step) => (
          <div key={step.name} className="flex items-center gap-3">
            {step.progress === 100 ? (
              <CheckCircle2 className="text-secondary shrink-0" size={18} />
            ) : (
              <Circle className="text-muted-foreground shrink-0" size={18} />
            )}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-foreground">{step.name}</span>
                <span className="text-xs text-muted-foreground">
                  {step.progress}%
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all"
                  style={{ width: `${step.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
