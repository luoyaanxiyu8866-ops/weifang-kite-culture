import { createFileRoute, useRouter } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { ArrowLeft, Bell } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/profile_settings_notifications")({
  component: NotificationSettingsPage,
});

function Toggle({ label, desc, defaultChecked = false }: { label: string; desc: string; defaultChecked?: boolean }) {
  const [enabled, setEnabled] = useState(defaultChecked);
  return (
    <div className="flex items-center justify-between p-4 border-b border-border last:border-b-0">
      <div className="flex-1">
        <h3 className="text-sm font-medium text-foreground">{label}</h3>
        <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
      </div>
      <button
        onClick={() => setEnabled(!enabled)}
        className={`relative w-11 h-6 rounded-full transition-colors ${enabled ? "bg-primary" : "bg-muted"}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
            enabled ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}

function NotificationSettingsPage() {
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
            <Bell className="text-primary" size={20} />
          </div>
          <div>
            <h1 className="font-serif text-xl font-bold text-foreground">通知设置</h1>
            <p className="text-xs text-muted-foreground mt-0.5">管理消息推送偏好</p>
          </div>
        </div>
      </section>

      {/* 通知开关 */}
      <section className="mb-4 reveal">
        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          <Toggle label="活动通知" desc="接收风筝节、比赛等活动提醒" defaultChecked={true} />
          <Toggle label="系统通知" desc="接收功能更新、维护公告等" defaultChecked={true} />
          <Toggle label="教程更新" desc="接收新教程、技巧分享通知" defaultChecked={false} />
          <Toggle label="社区互动" desc="接收点赞、评论、关注等互动通知" defaultChecked={true} />
        </div>
      </section>

      {/* 推送方式 */}
      <section className="reveal">
        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="text-sm font-medium text-foreground mb-1">推送方式</h3>
            <p className="text-xs text-muted-foreground">选择接收通知的方式</p>
          </div>
          <Toggle label="应用内通知" desc="在应用内显示通知消息" defaultChecked={true} />
          <Toggle label="浏览器通知" desc="通过浏览器桌面通知提醒" defaultChecked={false} />
        </div>
      </section>
    </PageLayout>
  );
}
