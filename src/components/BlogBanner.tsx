import { useEffect, useState } from 'react';
import { supabase, type BlogBanner as BlogBannerData } from '../lib/supabase';

export default function BlogBanner() {
  const [bannerData, setBannerData] = useState<BlogBannerData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogBanner() {
      const { data, error } = await supabase
        .from('blog_banner')
        .select('*')
        .eq('is_active', true)
        .maybeSingle();

      if (!error && data) {
        setBannerData(data);
      }
      setLoading(false);
    }

    fetchBlogBanner();
  }, []);

  const defaultBanner: BlogBannerData = {
    id: '',
    heading: 'Inspiration for spaces that feel like home.',
    button_text: 'View Blog',
    background_image: 'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=1920',
    is_active: true,
    created_at: ''
  };

  const displayData = bannerData || defaultBanner;

  return (
    <section className="relative h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${displayData.background_image}')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"></div>
      </div>

      <div className="relative h-full flex flex-col items-center justify-center text-center px-6 max-w-5xl mx-auto">
        <h2 className="text-white text-4xl md:text-6xl lg:text-7xl font-light mb-12 max-w-4xl leading-[1.15]">
          {displayData.heading}
        </h2>
        <button className="px-12 py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white text-xs font-medium tracking-[0.2em] hover:bg-white hover:text-[#1a1a1a] transition-all duration-500 uppercase">
          {displayData.button_text}
        </button>
      </div>
    </section>
  );
}
