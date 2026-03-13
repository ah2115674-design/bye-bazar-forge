import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import RatingStars from "@/components/RatingStars";
import { products, reviews } from "@/data/products";
import { ShoppingCart, Zap, Shield, Truck, RotateCcw, Check, Minus, Plus, ChevronRight } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen bg-muted">
        <Header />
        <div className="container-main py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
          <Link to="/products" className="text-primary hover:underline">Browse all products</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const productReviews = reviews.slice(0, 4);

  // Simulate multiple images
  const images = [product.image, product.image, product.image, product.image];

  return (
    <div className="min-h-screen bg-muted">
      <Header />

      <div className="container-main py-4 md:py-6">
        {/* Breadcrumb */}
        <nav className="text-sm text-muted-foreground mb-4 flex items-center gap-1 flex-wrap">
          <Link to="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/products" className="hover:text-primary">{product.category}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground line-clamp-1">{product.title}</span>
        </nav>

        {/* Main Content */}
        <div className="bg-card rounded-lg border border-border p-4 md:p-6 lg:p-8 mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            {/* Image Gallery */}
            <div className="lg:col-span-5">
              <div className="sticky top-24">
                <div className="aspect-square bg-muted rounded-lg overflow-hidden mb-3">
                  <img src={images[selectedImage]} alt={product.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex gap-2">
                  {images.map((img, i) => (
                    <button key={i} onClick={() => setSelectedImage(i)} className={`w-16 h-16 md:w-20 md:h-20 rounded border-2 overflow-hidden transition ${i === selectedImage ? "border-primary" : "border-border hover:border-muted-foreground"}`}>
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="lg:col-span-4">
              <h1 className="text-xl md:text-2xl font-bold text-card-foreground leading-tight mb-2">{product.title}</h1>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm text-muted-foreground">by</span>
                <Link to="/" className="text-sm text-primary hover:underline">{product.vendor}</Link>
              </div>

              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border">
                <RatingStars rating={product.rating} size={18} showValue count={product.reviewCount} />
              </div>

              {/* Price */}
              <div className="mb-4">
                {product.originalPrice && (
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sale text-sm font-bold">-{discount}%</span>
                    <span className="text-xs text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex items-baseline gap-1">
                  <span className="text-sm text-muted-foreground">$</span>
                  <span className="text-3xl font-bold text-card-foreground">{Math.floor(product.price)}</span>
                  <span className="text-lg font-bold text-card-foreground">{(product.price % 1).toFixed(2).substring(1)}</span>
                </div>
              </div>

              {/* Description */}
              {product.description && (
                <div className="mb-4 pb-4 border-b border-border">
                  <h3 className="font-bold text-sm mb-2 text-card-foreground">About this item</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
                </div>
              )}

              {/* Features */}
              {product.features && (
                <div className="mb-4">
                  <h3 className="font-bold text-sm mb-2 text-card-foreground">Key Features</h3>
                  <ul className="space-y-1.5">
                    {product.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-success shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Buy Box */}
            <div className="lg:col-span-3">
              <div className="border border-border rounded-lg p-4 lg:sticky lg:top-24">
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-sm text-muted-foreground">$</span>
                  <span className="text-2xl font-bold text-card-foreground">{Math.floor(product.price)}</span>
                  <span className="text-base font-bold text-card-foreground">{(product.price % 1).toFixed(2).substring(1)}</span>
                </div>

                {product.freeDelivery && (
                  <div className="flex items-center gap-1.5 text-sm mb-1">
                    <Truck className="w-4 h-4 text-primary" />
                    <span className="badge-prime">FREE Delivery</span>
                  </div>
                )}

                <p className={`text-sm font-medium mb-3 ${product.inStock ? "text-success" : "text-sale"}`}>
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </p>

                {/* Quantity */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-sm text-muted-foreground">Qty:</span>
                  <div className="flex items-center border border-border rounded">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 hover:bg-muted"><Minus className="w-3 h-3" /></button>
                    <span className="px-4 text-sm font-medium text-foreground">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="p-2 hover:bg-muted"><Plus className="w-3 h-3" /></button>
                  </div>
                </div>

                <button className="w-full btn-primary py-3 text-sm flex items-center justify-center gap-2 mb-2">
                  <ShoppingCart className="w-4 h-4" /> Add to Cart
                </button>
                <button className="w-full bg-primary/80 hover:bg-primary text-primary-foreground font-semibold rounded-lg py-3 text-sm flex items-center justify-center gap-2 transition">
                  <Zap className="w-4 h-4" /> Buy Now
                </button>

                <div className="mt-4 space-y-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    <span>Secure transaction</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RotateCcw className="w-4 h-4" />
                    <span>30-day return policy</span>
                  </div>
                  <p className="pt-1">Ships from and sold by <strong className="text-card-foreground">ByeBazar</strong></p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-card rounded-lg border border-border p-4 md:p-6 lg:p-8 mb-6">
          <h2 className="text-xl font-bold text-card-foreground mb-4">Customer Reviews</h2>
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
            <div className="text-center">
              <p className="text-4xl font-bold text-card-foreground">{product.rating}</p>
              <RatingStars rating={product.rating} size={16} />
              <p className="text-xs text-muted-foreground mt-1">{product.reviewCount.toLocaleString()} reviews</p>
            </div>
            <div className="flex-1 max-w-xs space-y-1">
              {[5, 4, 3, 2, 1].map((star) => {
                const pct = star === 5 ? 68 : star === 4 ? 20 : star === 3 ? 8 : star === 2 ? 3 : 1;
                return (
                  <div key={star} className="flex items-center gap-2 text-xs">
                    <span className="w-12 text-muted-foreground">{star} star</span>
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="w-8 text-right text-muted-foreground">{pct}%</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="space-y-4">
            {productReviews.map((review) => (
              <div key={review.id} className="pb-4 border-b border-border last:border-0">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">{review.avatar}</div>
                  <span className="text-sm font-medium text-card-foreground">{review.user}</span>
                </div>
                <RatingStars rating={review.rating} size={14} />
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{review.text}</p>
                <p className="text-xs text-muted-foreground mt-1">Reviewed on {new Date(review.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-foreground mb-4">Customers Also Bought</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} compact />
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
