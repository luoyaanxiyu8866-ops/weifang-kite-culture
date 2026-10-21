import { createFileRoute, useRouter } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { ArrowLeft, User, Camera, Pencil } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/profile_settings_account")({
  component: AccountSettingsPage,
});

function AccountSettingsPage() {
  const router = useRouter();
  const [nickname, setNickname] = useState("风筝爱好者");
  const [bio, setBio] = useState("热爱传统风筝文化，喜欢制作和放飞风筝");

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
            <User className="text-primary" size={20} />
          </div>
          <div>
            <h1 className="font-serif text-xl font-bold text-foreground">账号信息</h1>
            <p className="text-xs text-muted-foreground mt-0.5">修改昵称、头像等个人信息</p>
          </div>
        </div>
      </section>

      {/* 头像设置 */}
      <section className="mb-4 reveal">
        <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="text-primary" size={40} />
              </div>
              <button className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center shadow-md hover:bg-primary/90 transition-colors">
                <Camera size={14} />
              </button>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-foreground">更换头像</h3>
              <p className="text-xs text-muted-foreground mt-1">支持 JPG、PNG 格式，最大 5MB</p>
            </div>
          </div>
        </div>
      </section>

      {/* 昵称设置 */}
      <section className="mb-4 reveal">
        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="p-4 border-b border-border">
            <label className="block text-xs text-muted-foreground mb-2">昵称</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                placeholder="请输入昵称"
              />
              <Pencil size={16} className="text-muted-foreground shrink-0" />
            </div>
          </div>
          <div className="p-4">
            <label className="block text-xs text-muted-foreground mb-2">个人简介</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              className="w-full bg-transparent text-sm text-foreground outline-none resize-none placeholder:text-muted-foreground"
              placeholder="介绍一下自己..."
            />
          </div>
        </div>
      </section>

      {/* 保存按钮 */}
      <section className="reveal">
        <button className="w-full py-3 px-4 bg-primary text-primary-foreground rounded-xl font-medium text-sm hover:bg-primary/90 transition-colors shadow-sm">
          保存修改
        </button>
      </section>
    </PageLayout>
  );
}
