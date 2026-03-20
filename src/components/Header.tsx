import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from "react-router-dom";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    { name: "Kitchen Cabinets", path: "/services/kitchen-cabinets" },
    { name: "Bathroom Cabinets", path: "/services/bathroom-cabinets" },
    { name: "Outdoor Kitchen", path: "/services/outdoor-kitchen" },
    { name: "Pergolas", path: "/services/pergolas" },
    { name: "Backyard", path: "/services/backyard" },
    { name: "Pool Cage", path: "/services/pool-cage" },
    { name: "Carpenter Design", path: "/services/carpenter-design" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 lg:h-24">

          {/* LOGO */}
          <div className="flex-shrink-0">
            <img
              src="/Imagotipo_AAM_Mesa_de_trabajo_1.png"
              alt="AAM All Construction"
              className={`w-auto object-contain transition-all duration-500 ${
                isScrolled
                  ? 'h-16 md:h-20 lg:h-[72px]'
                  : 'h-16 md:h-20 lg:h-24'
              } ${isScrolled ? '' : 'brightness-0 invert'}`}
            />
          </div>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center space-x-10 lg:space-x-12">

            <Link
              to="/"
              className={`text-xs font-light tracking-[0.15em] uppercase ${
                isScrolled ? 'text-gray-700 hover:text-[#1a1a1a]' : 'text-white hover:text-white/80'
              }`}
            >
              HOME
            </Link>

            <Link
              to="/about"
              className={`text-xs font-light tracking-[0.15em] uppercase ${
                isScrolled ? 'text-gray-700 hover:text-[#1a1a1a]' : 'text-white hover:text-white/80'
              }`}
            >
              ABOUT US
            </Link>

            {/* SERVICES DROPDOWN */}
            <div className="relative group">

              <span
                className={`cursor-pointer text-xs font-light tracking-[0.15em] uppercase ${
                  isScrolled ? 'text-gray-700' : 'text-white'
                }`}
              >
                SERVICES
              </span>

              <div
                className={`absolute left-0 top-full mt-4 w-56 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 ${
                  isScrolled
                    ? 'bg-white border border-gray-200'
                    : 'bg-white/10 backdrop-blur-md border border-white/20'
                }`}
              >

                {services.map((service) => (
                  <Link
                    key={service.path}
                    to={service.path}
                    className={`block px-6 py-3 text-xs tracking-[0.1em] uppercase transition-all duration-300 ${
                      isScrolled
                        ? 'text-gray-700 hover:bg-gray-100'
                        : 'text-white hover:bg-white hover:text-[#1a1a1a]'
                    }`}
                  >
                    {service.name}
                  </Link>
                ))}

              </div>

            </div>

            <a
              href="/#our-projects"
              className={`text-xs font-light tracking-[0.15em] uppercase ${
                isScrolled ? 'text-gray-700 hover:text-[#1a1a1a]' : 'text-white hover:text-white/80'
              }`}
            >
              OUR PROJECTS
            </a>

            <button className={`px-8 py-3 text-xs font-medium tracking-[0.15em] uppercase ${
              isScrolled
                ? 'border border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white'
                : 'bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white hover:text-[#1a1a1a]'
            }`}>
              CONTACT US
            </button>

          </nav>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 ${isScrolled ? 'text-gray-700' : 'text-white'}`}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>
      </div>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-6 py-6 space-y-6">

            <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
              HOME
            </Link>

            <a href="/#about" onClick={() => setIsMobileMenuOpen(false)}>
              ABOUT US
            </a>

            {/* SERVICES */}
            <div className="space-y-3">
              <p className="text-xs uppercase text-gray-400">Services</p>

              {services.map((service) => (
                <Link
                  key={service.path}
                  to={service.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-sm text-gray-700"
                >
                  {service.name}
                </Link>
              ))}
            </div>

            <a href="/#our-projects" onClick={() => setIsMobileMenuOpen(false)}>
              OUR PROJECTS
            </a>

            <button className="w-full px-8 py-3 border border-[#1a1a1a] text-[#1a1a1a] text-xs uppercase">
              CONTACT US
            </button>

          </div>
        </div>
      )}
    </header>
  );
}