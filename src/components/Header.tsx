import { Search, ShoppingCart, User, Menu, ChevronDown, MapPin, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { categories } from "@/data/products";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-header text-header-foreground">
        <div className="container-main flex items-center gap-2 h-16 md:h-[68px]">
          {/* Mobile menu button */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 hover:bg-header-secondary rounded">
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-1 shrink-0 px-2 py-1 hover:outline hover:outline-1 hover:outline-header-foreground/50 rounded">
            <span className="text-xl md:text-2xl font-bold tracking-tight">
              Bye<span className="text-primary">Bazar</span>
            </span>
          </Link>

          {/* Deliver to */}
          <div className="hidden lg:flex items-center gap-1 px-2 py-1 hover:outline hover:outline-1 hover:outline-header-foreground/50 rounded cursor-pointer shrink-0">
            <MapPin className="w-4 h-4 text-header-foreground/70" />
            <div className="text-xs leading-tight">
              <span className="text-header-foreground/70">Deliver to</span>
              <p className="font-bold text-sm">Your Location</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 hidden md:flex h-[42px] rounded-lg overflow-hidden">
            <select className="bg-muted text-foreground text-sm px-3 border-r border-border cursor-pointer focus:outline-none">
              <option>All</option>
              {categories.slice(0, 8).map(c => (
                <option key={c.slug}>{c.name}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Search ByeBazar"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 text-foreground text-sm focus:outline-none"
            />
            <button className="bg-primary hover:brightness-110 px-4 transition-colors">
              <Search className="w-5 h-5 text-primary-foreground" />
            </button>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-1">
            <Link to="/" className="hidden md:flex flex-col px-3 py-1 hover:outline hover:outline-1 hover:outline-header-foreground/50 rounded text-xs leading-tight">
              <span className="text-header-foreground/70">Hello, Sign in</span>
              <span className="font-bold text-sm flex items-center gap-0.5">Account <ChevronDown className="w-3 h-3" /></span>
            </Link>
            <Link to="/" className="hidden md:flex flex-col px-3 py-1 hover:outline hover:outline-1 hover:outline-header-foreground/50 rounded text-xs leading-tight">
              <span className="text-header-foreground/70">Returns</span>
              <span className="font-bold text-sm">& Orders</span>
            </Link>
            <Link to="/" className="flex items-center gap-1 px-3 py-1 hover:outline hover:outline-1 hover:outline-header-foreground/50 rounded relative">
              <ShoppingCart className="w-7 h-7" />
              <span className="absolute -top-0.5 right-1 bg-primary text-primary-foreground text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">0</span>
              <span className="hidden md:block font-bold text-sm">Cart</span>
            </Link>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden px-3 pb-2">
          <div className="flex h-[40px] rounded-lg overflow-hidden">
            <input
              type="text"
              placeholder="Search ByeBazar"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 text-foreground text-sm focus:outline-none"
            />
            <button className="bg-primary hover:brightness-110 px-4">
              <Search className="w-5 h-5 text-primary-foreground" />
            </button>
          </div>
        </div>

        {/* Sub Navigation */}
        <nav className="hidden md:block bg-header-secondary">
          <div className="container-main flex items-center gap-1 h-10 overflow-x-auto text-sm">
            <button className="flex items-center gap-1 px-3 py-1 hover:outline hover:outline-1 hover:outline-header-foreground/50 rounded font-bold whitespace-nowrap">
              <Menu className="w-4 h-4" /> All
            </button>
            {["Today's Deals", "Best Sellers", "New Arrivals", "Customer Service", "Gift Cards", "Registry"].map(item => (
              <Link key={item} to="/products" className="px-3 py-1 hover:outline hover:outline-1 hover:outline-header-foreground/50 rounded whitespace-nowrap">
                {item}
              </Link>
            ))}
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div className="absolute inset-0 bg-foreground/50" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-[300px] bg-background animate-slide-in overflow-y-auto">
            <div className="bg-header text-header-foreground p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User className="w-8 h-8" />
                <span className="font-bold text-lg">Hello, Sign in</span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-3">Shop by Category</h3>
              {categories.map(cat => (
                <Link
                  key={cat.slug}
                  to="/products"
                  className="flex items-center gap-3 py-3 border-b border-border text-sm hover:bg-muted px-2 rounded"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="text-xl">{cat.icon}</span>
                  <span>{cat.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
