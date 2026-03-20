import { Instagram, Facebook } from 'lucide-react';
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white py-20 md:py-24 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-16 mb-16">
          <div>
            <img
              src="/Imagotipo_AAM_Mesa_de_trabajo_2.png"
              alt="AAM All Construction"
              loading="lazy"
              className="h-28 w-auto mb-6 brightness-0 invert"
            />
            <p className="text-sm text-gray-400 leading-relaxed font-light">
              Elevating spaces through design and quality
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-6 tracking-[0.2em] uppercase text-white/90">About Us</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/about"
                  className="text-sm text-gray-400 hover:text-white transition-colors duration-300 font-light"
                >
                  About Us
                </Link>
              </li>
              <li>
                <a href="#blog" className="text-sm text-gray-400 hover:text-white transition-colors duration-300 font-light">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-6 tracking-[0.2em] uppercase text-white/90">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/aamallconstruction/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-300"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.facebook.com/people/AAM-All-Construccion/61572282129204/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-300"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-xs text-gray-500 tracking-wider">
            © 2024 AAM All Construction. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
