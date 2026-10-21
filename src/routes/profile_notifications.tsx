import { createFileRoute, useRouter } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { ArrowLeft, Bell, Calendar, Info, Sparkles, CheckCheck, Inbox } from "lucide-react";
import { useState, useMemo } from "react";

export const Route = createFileRoute("/profile_notifications")({
  component: NotificationsPage,
});

type NotificationType = "all" | "event" | "system" | "info";

interface NotificationItem {
  id: number;
  type: "event" | "system" | "info";
  title: string;
  desc: string;
  date: string;
  icon: typeof Calendar | typeof Sparkles | typeof Info;
  unread: boolean;
}

const initialNotifications: NotificationItem[] = [
  { id: 1, type: "event", title: "潍坊国际风筝节即将开幕", desc: "2025年4月，第42届潍坊国际风筝节期待您的参与", date: "2小时前", icon: Calendar, unread: true },
  { id: 2, type: "system", title: "新功能上线：参数化工坊升级", desc: "新增骨架形状、蒙面材质等更多定制选项", date: "昨天", icon: Sparkles, unread: true },
  { id: 3, type: "info", title: "风筝制作技巧更新", desc: "新增了八卦风筝和蝴蝶风筝的详细教程", date: "3天前", icon: Info, unread: true },
  { id: 4, type: "event", title: "春季风筝放飞活动报名开启", desc: "本周六上午9点，人民广场集合，欢迎参加", date: "5天前", icon: Calendar, unread: false },
  { id: 5, type: "system", title: "账号安全提醒", desc: "您的账号于昨日在新设备登录，如非本人操作请及时修改密码", date: "1周前", icon: Sparkles, unread: false },
];

const filterTabs: { key: NotificationType; label: string }[] = [
  { key: "all", label: "全部" },
  { key: "event", label: "活动" },
  { key: "system", label: "系统" },
  { key: "info", label: "教程" },
];

function NotificationsPage() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<NotificationType>("all");
  const [notifications, setNotifications] = useState(initialNotifications);

  const unreadCount = useMemo(() => notifications.filter(n => n.unread).length, [notifications]);

  const filteredNotifications = useMemo(() => {
    if (activeFilter === "all") return notifications;
    return notifications.filter(n => n.type === activeFilter);
  }, [notifications, activeFilter]);

  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const handleCardClick = (id: number) => {
    markAsRead(id);
  };

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
      <section className="mb-4 reveal">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center relative">
              <Bell className="text-primary" size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full text-[10px] text-white flex items-center justify-center font-medium">
                  {unreadCount}
                </span>
              )}
            </div>
            <div>
              <h1 className="font-serif text-xl font-bold text-foreground">消息通知</h1>
              <p className="text-xs text-muted-foreground mt-0.5">
                {unreadCount > 0 ? `${unreadCount} 条未读消息` : "暂无未读消息"}
              </p>
            </div>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors px-3 py-1.5 rounded-lg hover:bg-primary/5"
            >
              <CheckCheck size={14} />
              <span>全部已读</span>
            </button>
          )}
        </div>
      </section>

      {/* 分类筛选标签 */}
      <section className="mb-4 reveal">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {filterTabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeFilter === tab.key
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* 通知列表 */}
      <section>
        {filteredNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center reveal">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Inbox size={32} className="text-muted-foreground/50" />
            </div>
            <p className="text-sm text-muted-foreground">暂无{activeFilter !== "all" ? filterTabs.find(t => t.key === activeFilter)?.label : ""}消息</p>
            <p className="text-xs text-muted-foreground/70 mt-1">有新通知时会在这里显示</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredNotifications.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleCardClick(item.id)}
                  className={`w-full text-left bg-card rounded-xl p-4 border shadow-sm reveal transition-all hover:shadow-md ${
                    item.unread ? "border-primary/30 bg-primary/[0.02]" : "border-border"
                  }`}
                  style={{ transitionDelay: `${index * 60}ms` }}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 relative ${
                      item.unread ? "bg-primary/10" : "bg-muted"
                    }`}>
                      <IconComponent size={18} className={item.unread ? "text-primary" : "text-foreground"} />
                      {item.unread && (
                        <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className={`text-sm truncate ${item.unread ? "font-semibold text-foreground" : "font-medium text-foreground/80"}`}>
                          {item.title}
                        </h3>
                        <span className="text-xs text-muted-foreground shrink-0">{item.date}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{item.desc}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </section>
    </PageLayout>
  );
}
