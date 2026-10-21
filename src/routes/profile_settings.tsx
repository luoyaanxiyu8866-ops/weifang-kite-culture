import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { User, Bell, Palette, Globe, Shield, Info, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/profile_settings")({
  component: SettingsPage,
});

const settingsItems = [
  { icon: User, label: "账号信息", desc: "修改昵称、头像等个人信息", to: "/profile_settings_account" },
  { icon: Bell, label: "通知设置", desc: "管理消息推送偏好", to: "/profile_settings_notifications" },
  { icon: Palette, label: "外观设置", desc: "主题颜色和显示风格", to: "/profile_settings_appearance" },
  { icon: Globe, label: "语言设置", desc: "切换应用显示语言", to: "/profile_settings_language" },
  { icon: Shield, label: "隐私与安全", desc: "数据权限和安全设置", to: "/profile_settings_privacy" },
  { icon: Info, label: "关于应用", desc: "版本信息和用户协议", to: "/profile_settings_about" },
];

function SettingsPage() {
  const router = useRouter();

  return (
    <PageLayout>
      {/* 返回按钮 */}
      <button
        onClick={() => router.history.back()}
        className="flex items-center gap-2 px-4 py-2.5 bg-card border border-border rounded-xl shadow-sm hover:bg-muted/50 transition-all mb-4 group"
      >
        <ArrowLeft size={20} className="text-foreground group-hover:-translate-x-0.5 transition-transform" />
        <span className="text-sm font-medium text-foreground">返回</span>
      </button>

      {/* 标题 */}
      <section className="mb-6 reveal">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Shield className="text-primary" size={20} />
          </div>
          <div>
            <h1 className="font-serif text-xl font-bold text-foreground">设置</h1>
            <p className="text-xs text-muted-foreground mt-0.5">管理您的应用偏好</p>
          </div>
        </div>
      </section>

      {/* 设置列表 */}
      <section>
        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          {settingsItems.map((item, index) => (
            <Link
              key={item.label}
              to={item.to}
              className={`w-full flex items-center gap-4 p-4 text-left hover:bg-muted/50 transition-colors ${
                index !== settingsItems.length - 1 ? "border-b border-border" : ""
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
            </Link>
          ))}
        </div>
      </section>

      {/* 版本信息 */}
      <section className="mt-6 reveal">
        <div className="text-center text-xs text-muted-foreground">
          <p>潍坊风筝文化 v1.0.0</p>
          <p className="mt-1">传承非遗文化，放飞传统之美</p>
        </div>
      </section>
    </PageLayout>
  );
}
