import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/products";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";

const sortOptions = [
  { label: "Best Selling", value: "best" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Highest Rated", value: "rating" },
  { label: "Newest", value: "newest" },
];

const priceRanges = [
  { label: "Under $25", min: 0, max: 25 },
  { label: "$25 – $50", min: 25, max: 50 },
  { label: "$50 – $100", min: 50, max: 100 },
  { label: "$100 – $500", min: 100, max: 500 },
  { label: "$500+", min: 500, max: Infinity },
];

const ProductListing = () => {
  const [sort, setSort] = useState("best");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  const [minRating, setMinRating] = useState(0);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [freeDeliveryOnly, setFreeDeliveryOnly] = useState(false);

  const filtered = useMemo(() => {
    let result = [...products];
    if (selectedCategory) result = result.filter((p) => p.category === selectedCategory);
    if (selectedPrice !== null) {
      const range = priceRanges[selectedPrice];
      result = result.filter((p) => p.price >= range.min && p.price < range.max);
    }
    if (minRating > 0) result = result.filter((p) => p.rating >= minRating);
    if (freeDeliveryOnly) result = result.filter((p) => p.freeDelivery);

    switch (sort) {
      case "price-asc": result.sort((a, b) => a.price - b.price); break;
      case "price-desc": result.sort((a, b) => b.price - a.price); break;
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
      default: result.sort((a, b) => b.reviewCount - a.reviewCount);
    }
    return result;
  }, [sort, selectedCategory, selectedPrice, minRating, freeDeliveryOnly]);

  const activeFilters = [selectedCategory, selectedPrice !== null ? priceRanges[selectedPrice].label : null, minRating > 0 ? `${minRating}+ Stars` : null, freeDeliveryOnly ? "Free Delivery" : null].filter(Boolean);

  const clearFilters = () => { setSelectedCategory(null); setSelectedPrice(null); setMinRating(0); setFreeDeliveryOnly(false); };

  const FilterPanel = () => (
    <div className="space-y-6">
      {/* Category */}
      <div>
        <h3 className="font-bold text-sm mb-3 text-foreground">Category</h3>
        <div className="space-y-1.5">
          {categories.slice(0, 8).map((cat) => (
            <button key={cat.slug} onClick={() => setSelectedCategory(selectedCategory === cat.name ? null : cat.name)} className={`w-full text-left text-sm px-2 py-1.5 rounded transition ${selectedCategory === cat.name ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted"}`}>
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>
      </div>
      {/* Price */}
      <div>
        <h3 className="font-bold text-sm mb-3 text-foreground">Price</h3>
        <div className="space-y-1.5">
          {priceRanges.map((range, i) => (
            <button key={i} onClick={() => setSelectedPrice(selectedPrice === i ? null : i)} className={`w-full text-left text-sm px-2 py-1.5 rounded transition ${selectedPrice === i ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted"}`}>
              {range.label}
            </button>
          ))}
        </div>
      </div>
      {/* Rating */}
      <div>
        <h3 className="font-bold text-sm mb-3 text-foreground">Customer Rating</h3>
        <div className="space-y-1.5">
          {[4, 3, 2, 1].map((r) => (
            <button key={r} onClick={() => setMinRating(minRating === r ? 0 : r)} className={`w-full text-left text-sm px-2 py-1.5 rounded transition ${minRating === r ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted"}`}>
              {r}+ Stars & Up
            </button>
          ))}
        </div>
      </div>
      {/* Free Delivery */}
      <div>
        <label className="flex items-center gap-2 cursor-pointer text-sm">
          <input type="checkbox" checked={freeDeliveryOnly} onChange={(e) => setFreeDeliveryOnly(e.target.checked)} className="rounded border-border accent-primary w-4 h-4" />
          <span className="text-foreground">Free Delivery</span>
        </label>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-muted">
      <Header />
      <div className="container-main py-4 md:py-6">
        {/* Breadcrumb */}
        <nav className="text-sm text-muted-foreground mb-4">
          <span className="hover:text-primary cursor-pointer">Home</span> / <span className="text-foreground font-medium">All Products</span>
        </nav>

        {/* Top bar */}
        <div className="flex items-center justify-between mb-4 gap-3">
          <div className="flex items-center gap-2">
            <button onClick={() => setFiltersOpen(!filtersOpen)} className="md:hidden btn-secondary px-3 py-2 text-sm flex items-center gap-1.5">
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </button>
            <p className="text-sm text-muted-foreground">{filtered.length} results</p>
          </div>
          <div className="relative">
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="btn-secondary px-3 py-2 text-sm appearance-none pr-8 cursor-pointer">
              {sortOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground" />
          </div>
        </div>

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {activeFilters.map((f) => (
              <span key={f} className="bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full">{f}</span>
            ))}
            <button onClick={clearFilters} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
              <X className="w-3 h-3" /> Clear all
            </button>
          </div>
        )}

        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <aside className="hidden md:block w-[260px] shrink-0">
            <div className="bg-card rounded-lg border border-border p-4 sticky top-24">
              <h2 className="font-bold text-base mb-4 text-card-foreground">Filters</h2>
              <FilterPanel />
            </div>
          </aside>

          {/* Mobile Filter Drawer */}
          {filtersOpen && (
            <div className="fixed inset-0 z-50 md:hidden">
              <div className="absolute inset-0 bg-foreground/50" onClick={() => setFiltersOpen(false)} />
              <div className="absolute right-0 top-0 bottom-0 w-[300px] bg-background overflow-y-auto animate-slide-in p-5" style={{ animationDirection: "reverse", transform: "translateX(0)" }}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold text-lg text-foreground">Filters</h2>
                  <button onClick={() => setFiltersOpen(false)}><X className="w-5 h-5" /></button>
                </div>
                <FilterPanel />
              </div>
            </div>
          )}

          {/* Product Grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-lg text-muted-foreground mb-2">No products found</p>
                <button onClick={clearFilters} className="text-primary hover:underline text-sm">Clear filters</button>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductListing;
