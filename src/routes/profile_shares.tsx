import { createFileRoute, useRouter } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { ArrowLeft, Share2, Copy, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/profile_shares")({
  component: SharesPage,
});

const shares = [
  { id: 1, name: "我的沙燕设计", date: "2024-10-08", link: "https://example.com/kite/123" },
  { id: 2, name: "龙头蜈蚣参数", date: "2024-10-05", link: "https://example.com/kite/456" },
  { id: 3, name: "蝴蝶风筝配色", date: "2024-09-28", link: "https://example.com/kite/789" },
];

function SharesPage() {
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
            <Share2 className="text-primary" size={20} />
          </div>
          <div>
            <h1 className="font-serif text-xl font-bold text-foreground">我的分享</h1>
            <p className="text-xs text-muted-foreground mt-0.5">共分享 {shares.length} 个设计</p>
          </div>
        </div>
      </section>

      {/* 分享列表 */}
      <section>
        <div className="space-y-3">
          {shares.map((item, index) => (
            <div
              key={item.id}
              className="bg-card rounded-xl p-4 border border-border shadow-sm reveal"
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-sm font-medium text-foreground">{item.name}</h3>
                <span className="text-xs text-muted-foreground">{item.date}</span>
              </div>
              <div className="flex items-center gap-2 bg-muted rounded-lg p-2">
                <code className="text-xs text-muted-foreground flex-1 truncate">{item.link}</code>
                <button className="p-1 hover:bg-background rounded transition-colors" title="复制链接">
                  <Copy size={14} className="text-muted-foreground" />
                </button>
                <button className="p-1 hover:bg-background rounded transition-colors" title="打开链接">
                  <ExternalLink size={14} className="text-muted-foreground" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
