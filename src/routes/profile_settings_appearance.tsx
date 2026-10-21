import { createFileRoute, useRouter } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { ArrowLeft, Palette, Sun, Moon, Monitor } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/profile_settings_appearance")({
  component: AppearanceSettingsPage,
});

const themes = [
  { id: "light", label: "浅色模式", icon: Sun },
  { id: "dark", label: "深色模式", icon: Moon },
  { id: "system", label: "跟随系统", icon: Monitor },
];

function AppearanceSettingsPage() {
  const router = useRouter();
  const [selectedTheme, setSelectedTheme] = useState("light");

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

      {/* 标题 */}
      <section className="mb-6 reveal">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Palette className="text-primary" size={20} />
          </div>
          <div>
            <h1 className="font-serif text-xl font-bold text-foreground">外观设置</h1>
            <p className="text-xs text-muted-foreground mt-0.5">主题颜色和显示风格</p>
          </div>
        </div>
      </section>

      {/* 主题模式 */}
      <section className="mb-4 reveal">
        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="text-sm font-medium text-foreground">主题模式</h3>
            <p className="text-xs text-muted-foreground mt-0.5">选择应用的整体色调</p>
          </div>
          <div className="grid grid-cols-3 gap-3 p-4">
            {themes.map((theme) => {
              const Icon = theme.icon;
              const isSelected = selectedTheme === theme.id;
              return (
                <button
                  key={theme.id}
                  onClick={() => setSelectedTheme(theme.id)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
                    isSelected
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border bg-muted/30 text-muted-foreground hover:border-primary/30"
                  }`}
                >
                  <Icon size={24} />
                  <span className="text-xs font-medium">{theme.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 字体大小 */}
      <section className="reveal">
        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="text-sm font-medium text-foreground">字体大小</h3>
            <p className="text-xs text-muted-foreground mt-0.5">调整应用内文字显示大小</p>
          </div>
          <div className="p-4">
            <div className="flex items-center gap-4">
              <span className="text-xs text-muted-foreground">Aa</span>
              <input
                type="range"
                min={12}
                max={20}
                defaultValue={14}
                className="flex-1 accent-primary"
              />
              <span className="text-base text-muted-foreground">Aa</span>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
