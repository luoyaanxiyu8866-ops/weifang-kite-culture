import { createFileRoute, useRouter } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { ArrowLeft, Globe, Check } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/profile_settings_language")({
  component: LanguageSettingsPage,
});

const languages = [
  { id: "zh-CN", label: "简体中文", native: "简体中文" },
  { id: "zh-TW", label: "繁体中文", native: "繁體中文" },
  { id: "en", label: "English", native: "English" },
  { id: "ja", label: "日本語", native: "日本語" },
  { id: "ko", label: "한국어", native: "한국어" },
];

function LanguageSettingsPage() {
  const router = useRouter();
  const [selectedLang, setSelectedLang] = useState("zh-CN");

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
            <Globe className="text-primary" size={20} />
          </div>
          <div>
            <h1 className="font-serif text-xl font-bold text-foreground">语言设置</h1>
            <p className="text-xs text-muted-foreground mt-0.5">切换应用显示语言</p>
          </div>
        </div>
      </section>

      {/* 语言列表 */}
      <section className="reveal">
        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          {languages.map((lang, index) => {
            const isSelected = selectedLang === lang.id;
            return (
              <button
                key={lang.id}
                onClick={() => setSelectedLang(lang.id)}
                className={`w-full flex items-center gap-4 p-4 text-left transition-colors ${
                  index !== languages.length - 1 ? "border-b border-border" : ""
                } ${isSelected ? "bg-primary/5" : "hover:bg-muted/50"}`}
              >
                <div className="flex-1">
                  <h3 className={`text-sm font-medium ${isSelected ? "text-primary" : "text-foreground"}`}>
                    {lang.label}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{lang.native}</p>
                </div>
                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                    <Check size={14} className="text-primary-foreground" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </section>
    </PageLayout>
  );
}
