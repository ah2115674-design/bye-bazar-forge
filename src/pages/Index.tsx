import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroCarousel from "@/components/HeroCarousel";
import ProductCard from "@/components/ProductCard";
import RatingStars from "@/components/RatingStars";
import { categories, products, deals, reviews } from "@/data/products";
import { Link } from "react-router-dom";
import { ChevronRight, Shield, Truck, RotateCcw, Headphones } from "lucide-react";

const Index = () => {
  const bestSellers = products.filter((p) => p.badge === "Best Seller" || p.rating >= 4.7);
  const dealProducts = products.filter((p) => p.originalPrice);

  return (
    <div className="min-h-screen bg-muted">
      <Header />

      <HeroCarousel />

      {/* Category Tiles */}
      <section className="container-main -mt-8 md:-mt-16 relative z-10 pb-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {categories.slice(0, 12).map((cat) => (
            <Link
              key={cat.slug}
              to="/products"
              className="bg-card rounded-lg p-4 text-center card-hover border border-border group"
            >
              <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">{cat.icon}</div>
              <p className="text-sm font-semibold text-card-foreground">{cat.name}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Trust Badges */}
      <section className="container-main pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Truck, title: "Free Delivery", desc: "On orders over $25" },
            { icon: RotateCcw, title: "Easy Returns", desc: "30-day return policy" },
            { icon: Shield, title: "Secure Payment", desc: "100% protected" },
            { icon: Headphones, title: "24/7 Support", desc: "Dedicated help" },
          ].map((badge) => (
            <div key={badge.title} className="flex items-center gap-3 bg-card rounded-lg p-4 border border-border">
              <badge.icon className="w-8 h-8 text-primary shrink-0" />
              <div>
                <p className="font-semibold text-sm text-card-foreground">{badge.title}</p>
                <p className="text-xs text-muted-foreground">{badge.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="container-main pb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl md:text-2xl font-bold text-foreground">Best Sellers</h2>
          <Link to="/products" className="text-sm text-primary hover:underline flex items-center gap-0.5 font-medium">
            See all <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {bestSellers.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Deals & Promotions */}
      <section className="container-main pb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl md:text-2xl font-bold text-foreground">Today's Deals</h2>
          <Link to="/products" className="text-sm text-primary hover:underline flex items-center gap-0.5 font-medium">
            See all <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {deals.map((deal) => (
            <Link key={deal.id} to="/products" className="relative rounded-lg overflow-hidden h-[160px] group">
              <img src={deal.image} alt={deal.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
              <div className={`absolute inset-0 bg-gradient-to-t ${deal.color} opacity-75`} />
              <div className="absolute inset-0 p-4 flex flex-col justify-end text-header-foreground">
                <h3 className="font-bold text-lg">{deal.title}</h3>
                <p className="text-sm opacity-90">{deal.subtitle}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Recommended Products */}
      <section className="container-main pb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl md:text-2xl font-bold text-foreground">Recommended for You</h2>
          <Link to="/products" className="text-sm text-primary hover:underline flex items-center gap-0.5 font-medium">
            See all <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {dealProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="container-main pb-12">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">What Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.slice(0, 3).map((review) => (
            <div key={review.id} className="bg-card rounded-lg p-5 border border-border">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  {review.avatar}
                </div>
                <div>
                  <p className="font-semibold text-sm text-card-foreground">{review.user}</p>
                  <RatingStars rating={review.rating} size={14} />
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">"{review.text}"</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
