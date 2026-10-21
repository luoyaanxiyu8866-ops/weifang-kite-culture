import { createFileRoute, useRouter } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { ArrowLeft, Info, Heart, Star, FileText, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/profile_settings_about")({
  component: AboutPage,
});

const aboutItems = [
  { icon: FileText, label: "用户协议", desc: "阅读应用使用条款" },
  { icon: Heart, label: "隐私政策", desc: "了解数据使用方式" },
  { icon: Star, label: "给我们评分", desc: "在应用商店评价我们" },
  { icon: ExternalLink, label: "官方网站", desc: "访问潍坊风筝文化官网" },
];

function AboutPage() {
  const router = useRouter();

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
            <Info className="text-primary" size={20} />
          </div>
          <div>
            <h1 className="font-serif text-xl font-bold text-foreground">关于应用</h1>
            <p className="text-xs text-muted-foreground mt-0.5">版本信息和用户协议</p>
          </div>
        </div>
      </section>

      {/* 应用信息卡片 */}
      <section className="mb-4 reveal">
        <div className="bg-card rounded-2xl border border-border shadow-sm p-6 text-center">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
            <Info className="text-primary" size={40} />
          </div>
          <h2 className="font-serif text-lg font-bold text-foreground">潍坊风筝文化</h2>
          <p className="text-xs text-muted-foreground mt-1">传承非遗文化，放飞传统之美</p>
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-muted rounded-full">
            <span className="text-xs font-medium text-foreground">v1.0.0</span>
          </div>
        </div>
      </section>

      {/* 相关链接 */}
      <section className="mb-4 reveal">
        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          {aboutItems.map((item, index) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-4 p-4 text-left hover:bg-muted/50 transition-colors ${
                index !== aboutItems.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                <item.icon className="text-foreground" size={20} />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-foreground">{item.label}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
              </div>
              <svg className="w-5 h-5 text-muted-foreground shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))}
        </div>
      </section>

      {/* 版权信息 */}
      <section className="reveal">
        <div className="text-center text-xs text-muted-foreground space-y-1">
          <p>© 2024 潍坊风筝文化 App</p>
          <p>All rights reserved</p>
        </div>
      </section>
    </PageLayout>
  );
}
