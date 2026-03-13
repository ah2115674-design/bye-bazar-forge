import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-footer text-footer-foreground">
      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="w-full bg-header-secondary hover:brightness-125 transition py-3 text-sm font-medium"
      >
        Back to top
      </button>

      {/* Main Footer */}
      <div className="container-main py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-bold text-base mb-4">Get to Know Us</h4>
            <ul className="space-y-2 text-sm text-footer-foreground/80">
              <li><Link to="/" className="hover:underline">About ByeBazar</Link></li>
              <li><Link to="/" className="hover:underline">Careers</Link></li>
              <li><Link to="/" className="hover:underline">Press Releases</Link></li>
              <li><Link to="/" className="hover:underline">Investor Relations</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-base mb-4">Make Money with Us</h4>
            <ul className="space-y-2 text-sm text-footer-foreground/80">
              <li><Link to="/" className="hover:underline">Sell on ByeBazar</Link></li>
              <li><Link to="/" className="hover:underline">Become an Affiliate</Link></li>
              <li><Link to="/" className="hover:underline">Advertise Products</Link></li>
              <li><Link to="/" className="hover:underline">Fulfillment by ByeBazar</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-base mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm text-footer-foreground/80">
              <li><Link to="/" className="hover:underline">Your Account</Link></li>
              <li><Link to="/" className="hover:underline">Returns & Replacements</Link></li>
              <li><Link to="/" className="hover:underline">Shipping Rates</Link></li>
              <li><Link to="/" className="hover:underline">Help Center</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-base mb-4">Connect with Us</h4>
            <ul className="space-y-2 text-sm text-footer-foreground/80">
              <li><a href="#" className="hover:underline">Facebook</a></li>
              <li><a href="#" className="hover:underline">Twitter</a></li>
              <li><a href="#" className="hover:underline">Instagram</a></li>
              <li><a href="#" className="hover:underline">YouTube</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-footer-foreground/20">
        <div className="container-main py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/" className="text-xl font-bold">
            Bye<span className="text-primary">Bazar</span>
          </Link>
          <p className="text-xs text-footer-foreground/60">
            © 2026 ByeBazar. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
