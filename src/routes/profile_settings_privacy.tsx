import { createFileRoute, useRouter } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { ArrowLeft, Shield, Eye, Lock, Trash2 } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/profile_settings_privacy")({
  component: PrivacySettingsPage,
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

function PrivacySettingsPage() {
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
            <Shield className="text-primary" size={20} />
          </div>
          <div>
            <h1 className="font-serif text-xl font-bold text-foreground">隐私与安全</h1>
            <p className="text-xs text-muted-foreground mt-0.5">数据权限和安全设置</p>
          </div>
        </div>
      </section>

      {/* 隐私设置 */}
      <section className="mb-4 reveal">
        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="text-sm font-medium text-foreground">隐私控制</h3>
            <p className="text-xs text-muted-foreground mt-0.5">管理您的数据可见性</p>
          </div>
          <Toggle label="公开我的作品" desc="允许其他用户查看您的设计作品" defaultChecked={true} />
          <Toggle label="显示学习进度" desc="在个人主页展示学习进度信息" defaultChecked={false} />
          <Toggle label="允许收藏统计" desc="显示您收藏的图鉴数量" defaultChecked={true} />
        </div>
      </section>

      {/* 安全设置 */}
      <section className="mb-4 reveal">
        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="text-sm font-medium text-foreground">账户安全</h3>
            <p className="text-xs text-muted-foreground mt-0.5">保护您的账户安全</p>
          </div>
          <button className="w-full flex items-center gap-4 p-4 text-left hover:bg-muted/50 transition-colors border-b border-border">
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
              <Lock className="text-foreground" size={20} />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-foreground">修改密码</h3>
              <p className="text-xs text-muted-foreground mt-0.5">定期更换密码保障安全</p>
            </div>
            <svg className="w-5 h-5 text-muted-foreground shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <button className="w-full flex items-center gap-4 p-4 text-left hover:bg-muted/50 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
              <Eye className="text-foreground" size={20} />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-foreground">登录设备管理</h3>
              <p className="text-xs text-muted-foreground mt-0.5">查看和管理已登录的设备</p>
            </div>
            <svg className="w-5 h-5 text-muted-foreground shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </section>

      {/* 危险操作 */}
      <section className="reveal">
        <div className="bg-card rounded-2xl border border-destructive/20 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-destructive/10">
            <h3 className="text-sm font-medium text-destructive">危险操作</h3>
            <p className="text-xs text-muted-foreground mt-0.5">以下操作不可撤销</p>
          </div>
          <button className="w-full flex items-center gap-4 p-4 text-left hover:bg-destructive/5 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0">
              <Trash2 className="text-destructive" size={20} />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-destructive">删除账户</h3>
              <p className="text-xs text-muted-foreground mt-0.5">永久删除所有数据和记录</p>
            </div>
            <svg className="w-5 h-5 text-muted-foreground shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </section>
    </PageLayout>
  );
}
