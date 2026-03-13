import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const slides = [
  {
    title: "Spring Sale is Here",
    subtitle: "Up to 50% off electronics, fashion & more",
    cta: "Shop Deals",
    gradient: "from-[hsl(210,29%,20%)] to-[hsl(210,29%,30%)]",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1440&h=500&fit=crop",
  },
  {
    title: "New Arrivals Daily",
    subtitle: "Discover the latest in tech, home & lifestyle",
    cta: "Explore Now",
    gradient: "from-[hsl(210,29%,15%)] to-[hsl(210,40%,25%)]",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1440&h=500&fit=crop",
  },
  {
    title: "Free Delivery on Orders $25+",
    subtitle: "Fast, reliable shipping to your doorstep",
    cta: "Start Shopping",
    gradient: "from-[hsl(36,60%,25%)] to-[hsl(36,80%,35%)]",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1440&h=500&fit=crop",
  },
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((p) => (p + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((p) => (p - 1 + slides.length) % slides.length);
  const next = () => setCurrent((p) => (p + 1) % slides.length);

  return (
    <div className="relative w-full h-[250px] md:h-[400px] lg:h-[500px] overflow-hidden">
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ${i === current ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          <img src={slide.image} alt={slide.title} className="absolute inset-0 w-full h-full object-cover" />
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} opacity-70`} />
          <div className="absolute inset-0 flex items-center">
            <div className="container-main">
              <div className="max-w-lg text-header-foreground">
                <h1 className="text-3xl md:text-5xl font-bold mb-3 leading-tight">{slide.title}</h1>
                <p className="text-base md:text-xl mb-6 opacity-90">{slide.subtitle}</p>
                <Link to="/products" className="btn-primary px-8 py-3 text-base md:text-lg inline-block">
                  {slide.cta}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
      <button onClick={prev} className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background text-foreground w-10 h-16 md:w-12 md:h-20 rounded flex items-center justify-center transition">
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button onClick={next} className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background text-foreground w-10 h-16 md:w-12 md:h-20 rounded flex items-center justify-center transition">
        <ChevronRight className="w-6 h-6" />
      </button>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`w-3 h-3 rounded-full transition ${i === current ? "bg-primary" : "bg-background/50"}`} />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
