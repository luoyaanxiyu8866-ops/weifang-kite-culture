import { useEffect, useState } from "react";
import { X } from "lucide-react";

const BANNERS = [
  {
    image: "https://g.cdn.meoo.host/y9abx2r52424/ai-images/banner-kite-festival.png?auth_key=a04c315ed7f4036a1e5f1f0c3fe8ad6b50b25c4a4c5063a2b52091a93231cbc6",
    caption: "纸花如雪满天飞",
    title: "潍坊国际风筝节",
    description: "每年四月，潍坊都会举办盛大的国际风筝节。来自世界各地的风筝爱好者齐聚一堂，天空中飞舞着各式各样的风筝，从传统的沙燕、龙头蜈蚣到现代创意造型，场面壮观。"
  },
  {
    image: "https://g.cdn.meoo.host/y9abx2r52424/ai-images/banner-dragon-kite.png?auth_key=e1e88e835db23ad1742b2e2c1d054c0e49ba3f082a62f131e59a71af55d54e15",
    caption: "百米长龙，气势磅礴",
    title: "龙头蜈蚣风筝",
    description: "龙头蜈蚣是潍坊风筝的代表作之一，全长可达百米以上。由数十节甚至上百节组成，每节都精心绘制，龙头威武，龙身蜿蜒，放飞时需要多人协作，场面极为震撼。"
  },
  {
    image: "https://g.cdn.meoo.host/y9abx2r52424/ai-images/banner-yangjiabu.png?auth_key=3539fad934461939ffb4eae0babb7f0f78b417f05db28063e8303869b85556f8",
    caption: "挂在墙上是年画，飞在天上是风筝",
    title: "杨家埠木版年画风筝",
    description: "杨家埠风筝将传统木版年画艺术与风筝制作完美结合。先用木版印出线条轮廓，再手工填色，色彩浓烈鲜艳，图案吉祥喜庆，既是精美的工艺品，也是能飞翔的艺术品。"
  },
  {
    image: "https://g.cdn.meoo.host/y9abx2r52424/ai-images/banner-festival-scene.png?auth_key=88b69afd0a38612a2bdf928b059afcfb266583d4683434913afc43692de5f056",
    caption: "世界风筝都",
    title: "潍坊——世界风筝之都",
    description: "潍坊被誉为'世界风筝之都'，风筝制作技艺已有两千多年历史。这里的风筝流派众多，工艺精湛，每年吸引数百万游客前来观赏，是中国非物质文化遗产的重要代表。"
  },
];

export function BannerCarousel() {
  const [current, setCurrent] = useState(0);
  const [selectedBanner, setSelectedBanner] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % BANNERS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className="relative w-full overflow-hidden rounded-2xl shadow-sm">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {BANNERS.map((banner, i) => (
            <div
              key={i}
              className="w-full flex-shrink-0 relative h-[180px] cursor-pointer"
              onClick={() => setSelectedBanner(i)}
            >
              <img
                src={banner.image}
                alt={banner.caption}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-primary/5 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-4 pt-10">
                <p className="text-white font-serif text-base font-semibold">{banner.caption}</p>
                <p className="text-white/80 text-xs mt-1">{banner.title}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {BANNERS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                i === current ? "bg-white scale-125" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* 详情弹窗 */}
      {selectedBanner !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setSelectedBanner(null)}
        >
          <div
            className="bg-card rounded-2xl max-w-md w-full max-h-[80vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={BANNERS[selectedBanner].image}
                alt={BANNERS[selectedBanner].caption}
                className="w-full aspect-[16/9] object-cover rounded-t-2xl"
              />
              <button
                onClick={() => setSelectedBanner(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-5">
              <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                {BANNERS[selectedBanner].title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {BANNERS[selectedBanner].description}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
