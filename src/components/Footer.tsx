import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-earth text-cream py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div>
              <h3 className="font-heading text-2xl font-bold text-honey-light">AMATYA</h3>
              <p className="text-xs tracking-[0.2em] text-cream/70">• THE AMRIT ESSENCE •</p>
            </div>
            <p className="text-cream/80 text-sm leading-relaxed">
              Bringing the purity of rural traditions to your modern kitchen. 
              Rooted in authenticity, committed to delivering natural, chemical-free products straight from the farm.
            </p>
            <p className="text-xs text-cream/60">From The Heart Land Of India (Madhya Pradesh)</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4 text-honey-light">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { name: 'About Us', href: '/about' },
                { name: 'Products', href: '/products' },
                { name: 'Quality & Process', href: '/quality' },
                { name: 'Blog', href: '/blog' },
                { name: 'Contact', href: '/contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href} 
                    className="text-cream/80 hover:text-honey-light transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4 text-honey-light">Policies</h4>
            <ul className="space-y-2">
              {[
                { name: 'Shipping & Returns', href: '/shipping-returns' },
                { name: 'Privacy Policy', href: '/privacy-policy' },
                { name: 'Terms & Conditions', href: '/terms' },
              ].map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href} 
                    className="text-cream/80 hover:text-honey-light transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm font-medium text-honey-light">
              Free delivery above ₹2500/-
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4 text-honey-light">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-cream/80">
                <Mail className="h-4 w-4 mt-0.5 text-honey-light" />
                <span>contact@amatya.in</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-cream/80">
                <Phone className="h-4 w-4 mt-0.5 text-honey-light" />
                <span>+91 XXXXX XXXXX</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-cream/80">
                <MapPin className="h-4 w-4 mt-0.5 text-honey-light" />
                <span>Madhya Pradesh, India</span>
              </li>
            </ul>
            
            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-cream/60 hover:text-honey-light transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-cream/60 hover:text-honey-light transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-cream/60 hover:text-honey-light transition-colors" aria-label="YouTube">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-cream/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-cream/60">
            © {new Date().getFullYear()} AMATYA. All rights reserved.
          </p>
          <p className="text-sm text-cream/60">
            Made with ❤️ for pure, natural living
          </p>
        </div>
      </div>
    </footer>
  );
}
