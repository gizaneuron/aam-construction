import { useEffect, useRef, useState } from 'react';
import { Link } from "react-router-dom";
import useAbout from "../hooks/useAbout";

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const displayData = useAbout();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 md:py-40 lg:py-48 px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className={`space-y-8 transition-all duration-1200 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-[#1a1a1a] leading-[1.1]">
              {displayData.heading}
            </h2>
            <div className="w-16 h-px bg-[#1a1a1a]"></div>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed font-light">
              {displayData.tagline}
            </p>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed font-light">
              {displayData.description}
            </p>
            <Link
              to="/about"
              className="mt-10 inline-block px-10 py-3.5 border border-[#1a1a1a] text-[#1a1a1a] text-xs font-medium tracking-[0.2em] hover:bg-[#1a1a1a] hover:text-white transition-all duration-500 uppercase group relative overflow-hidden"
            >
              <span className="relative z-10">{displayData.button_text}</span>
              <span className="absolute inset-0 bg-[#1a1a1a] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
            </Link>
          </div>

          <div className={`relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden transition-all duration-1200 ease-out delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <img
              src={displayData.image_url}
              alt="Luxury Interior"
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
