import { Star, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

const ProductCard = ({ product, compact = false }: ProductCardProps) => {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Link
      to={`/product/${product.id}`}
      className="group bg-card rounded-lg border border-border card-hover overflow-hidden flex flex-col"
    >
      {/* Image */}
      <div className="relative bg-muted p-4 aspect-square flex items-center justify-center overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover rounded group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {product.badge && (
          <span className="absolute top-2 left-2 bg-sale text-primary-foreground text-xs font-bold px-2 py-1 rounded">
            {product.badge}
          </span>
        )}
      </div>

      {/* Info */}
      <div className={`flex flex-col flex-1 p-3 ${compact ? "p-2" : "p-3 md:p-4"}`}>
        <h3 className={`font-medium text-card-foreground line-clamp-2 mb-1 ${compact ? "text-sm" : "text-sm md:text-base"}`}>
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-1.5">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-[14px] h-[14px] ${star <= Math.round(product.rating) ? "fill-primary text-primary" : "fill-muted text-muted"}`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">{product.reviewCount.toLocaleString()}</span>
        </div>

        {/* Price */}
        <div className="mt-auto">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className={`font-bold text-card-foreground ${compact ? "text-lg" : "text-xl md:text-2xl"}`}>
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <>
                <span className="text-xs text-muted-foreground line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
                <span className="text-xs text-sale">-{discount}%</span>
              </>
            )}
          </div>
          {product.freeDelivery && (
            <p className="badge-prime mt-1">FREE Delivery</p>
          )}
        </div>

        {/* Add to Cart */}
        {!compact && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="mt-3 w-full btn-primary py-2.5 text-sm flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
