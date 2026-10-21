import { User, Settings, Bell, Heart, Share2, LogOut, Wind, ChevronRight, Plus } from "lucide-react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";

export const Route = createFileRoute("/profile")({
  component: Profile,
});

// 模拟用户数据
const userData = {
  name: "白礼",
  avatar: "https://conversation.cdn.meoo.host/conversations/365058141735612416/image/2026-10-11/1791712054053-image.png?auth_key=d29a7fe1cc058106056d9ad6c9391e2f4e1507c7c0763de940a9b5c612e756a5",
  type: "本地用户",
};

// 统计数据
const stats = {
  kites: 3,
  progress: 63,
  favorites: 12,
};

// 最新风筝（模拟数据）
const latestKites = [
  { id: "swallow", name: "沙燕手稿", image: "https://g.cdn.meoo.host/y9abx2r52424/ai-images/swallow-sketch-1.png?auth_key=6e4090f398e06cb91b5535bbcfee54b35857ad8f4ac3062f65bb75054cb384e2" },
  { id: "butterfly", name: "蝴蝶手稿", image: "https://g.cdn.meoo.host/y9abx2r52424/ai-images/butterfly-sketch.png?auth_key=45b4f524478bb6c7df5726301a054bdc0281f5edf3ceb945d87112d26940390f" },
  { id: "dragon", name: "龙头蜈蚣手稿", image: "https://g.cdn.meoo.host/y9abx2r52424/ai-images/dragon-sketch.png?auth_key=1a44c16f8068aaf293cedc5430506419d50427e04ee63c86a27f414025532a37" },
];

// 功能菜单配置
const menuItems = [
  { 
    icon: Heart, 
    label: "我的收藏", 
    desc: "查看收藏的风筝图鉴和文章",
    path: "/profile_favorites",
    iconBg: "icon-circle-vermilion"
  },
  { 
    icon: Share2, 
    label: "我的分享", 
    desc: "管理已分享的设计图链接",
    path: "/profile_shares",
    iconBg: "icon-circle-teal"
  },
  { 
    icon: Bell, 
    label: "消息通知", 
    desc: "系统通知和活动提醒",
    path: "/profile_notifications",
    iconBg: "icon-circle-bamboo"
  },
  { 
    icon: Settings, 
    label: "设置", 
    desc: "账号与偏好设置",
    path: "/profile_settings",
    iconBg: "icon-circle-primary"
  },
];

function Profile() {
  return (
    <PageLayout>
      {/* 顶部个人信息卡片 - 竹篾底纹 */}
      <section className="mb-6 reveal">
        <div className="bamboo-pattern bg-card rounded-2xl p-6 border border-border shadow-sm relative">
          {/* 头像与昵称 */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-teal/40 bg-muted">
              <img
                src={userData.avatar}
                alt="用户头像"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h2 className="font-serif text-xl font-semibold text-foreground">
                {userData.name}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">{userData.type}</p>
            </div>
          </div>

          {/* 统计数据 - 带图标和进度条 */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Wind size={14} className="text-teal" />
                <p className="text-lg font-bold text-bamboo">{stats.kites}</p>
              </div>
              <p className="text-xs text-muted-foreground">我的风筝</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-bamboo mb-1">{stats.progress}%</p>
              <div className="progress-bar mb-1">
                <div 
                  className="progress-bar-fill" 
                  style={{ width: `${stats.progress}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground">学习进度</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-bamboo mb-1">{stats.favorites}</p>
              <p className="text-xs text-muted-foreground">收藏图鉴</p>
            </div>
          </div>
        </div>
      </section>

      {/* 我的最新风筝 - 横向滑动区域 */}
      <section className="mb-6 reveal">
        <div className="bg-card rounded-2xl p-4 border border-border shadow-sm">
          <h3 className="font-serif text-base font-semibold text-foreground mb-3">我的最新设计</h3>
          
          {latestKites.length > 0 ? (
            <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
              {latestKites.map((kite) => (
                <Link
                  key={kite.id}
                  to="/kite/$id"
                  params={{ id: kite.id }}
                  className="shrink-0 w-28 card-tap"
                >
                  <div className="aspect-square rounded-xl bg-muted overflow-hidden mb-2">
                    <img
                      src={kite.image}
                      alt={kite.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-xs text-center text-foreground truncate">{kite.name}</p>
                </Link>
              ))}
            </div>
          ) : (
            <Link
              to="/workshop"
              className="flex flex-col items-center justify-center py-8 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-3">
                <Plus size={24} className="text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">去创作我的第一只风筝</p>
            </Link>
          )}
        </div>
      </section>

      {/* 功能列表 - 独立彩色圆角卡片 */}
      <section className="mb-6 space-y-3">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            to={item.path as any}
            className="block bg-card rounded-2xl p-4 border border-border shadow-sm card-tap reveal"
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full ${item.iconBg} flex items-center justify-center shrink-0`}>
                <item.icon size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-foreground">{item.label}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
              </div>
              <ChevronRight size={18} className="text-muted-foreground shrink-0" />
            </div>
          </Link>
        ))}
      </section>

      {/* 退出登录 - 文字按钮 */}
      <section className="pt-8 pb-4 reveal">
        <button className="w-full text-center text-sm text-muted-foreground hover:text-vermilion transition-colors py-2">
          退出登录
        </button>
      </section>
    </PageLayout>
  );
}
