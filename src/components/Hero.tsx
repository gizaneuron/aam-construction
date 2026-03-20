import { useEffect, useState } from 'react';
import { supabase, type Hero as HeroData } from '../lib/supabase';

export default function Hero() {
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHero() {
      const { data, error } = await supabase
        .from('hero')
        .select('*')
        .eq('is_active', true)
        .maybeSingle();

      if (!error && data) {
        setHeroData(data);
      }
      setLoading(false);
    }

    fetchHero();
  }, []);

  const defaultHero: HeroData = {
  id: '',
  tagline: 'Inspiring the right home.',
  heading: 'Elevate the way you live.',
  subheading: 'Where Architecture Meets Lifestyle',
  button_text: 'Schedule Consultation',
  background_image: '',
  video_url: '/hero.mp4', // 👈 AGREGA ESTA LÍNEA
  is_active: true,
  created_at: ''
};

  const displayData = {
    ...defaultHero,
    ...heroData
  };
  const videoUrl = displayData.video_url || '/hero.mp4';

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 object-cover"
        >
            <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
          </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"></div>
      </div>

      <div className="relative h-full flex flex-col items-center justify-center text-center px-6 max-w-6xl mx-auto">
        <p className="text-white text-xs md:text-sm font-light tracking-[0.4em] mb-6 uppercase animate-fade-in-up" style={{ animationDelay: '0.3s', opacity: 0 }}>
          {displayData.tagline}
        </p>
        <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-light mb-6 max-w-5xl leading-[1.1] animate-fade-in-up" style={{ animationDelay: '0.5s', opacity: 0 }}>
          {displayData.heading}
        </h1>
        <p className="text-white/90 text-sm md:text-base font-light tracking-[0.25em] mb-16 uppercase animate-fade-in-up" style={{ animationDelay: '0.7s', opacity: 0 }}>
          {displayData.subheading}
        </p>
        <button className="px-12 py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white text-xs font-medium tracking-[0.2em] hover:bg-white hover:text-[#273246] transition-all duration-500 uppercase animate-fade-in-up" style={{ animationDelay: '0.9s', opacity: 0 }}>
          {displayData.button_text}
        </button>
      </div>
    </section>
  );
}
