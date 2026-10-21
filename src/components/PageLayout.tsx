import { ReactNode } from "react";
import { BottomNav } from "./BottomNav";

const KITE_LINEART_BG = "https://g.cdn.meoo.host/y9abx2r52424/ai-images/kite-lineart-pattern.png?auth_key=bf39c515ec58a5b8d487edf984f65b780cfb58e9df3b78a3f115d24d25a0ea58";

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
}

export function PageLayout({ children, className }: PageLayoutProps) {
  return (
    <div
      className={`min-h-screen bg-background pb-20 relative ${className || ""}`}
      style={{
        backgroundImage: `url(${KITE_LINEART_BG})`,
        backgroundSize: '200px',
        backgroundRepeat: 'repeat',
        backgroundPosition: 'center',
        opacity: 1
      }}
    >
      {/* 半透明遮罩层，让背景花纹更淡 */}
      <div className="absolute inset-0 bg-background/90 pointer-events-none" />
      <main className="relative px-4 py-6">{children}</main>
      <BottomNav />
    </div>
  );
}
