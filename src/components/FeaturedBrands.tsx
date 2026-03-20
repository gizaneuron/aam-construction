import { useEffect, useState } from 'react';
import { supabase, type Brand } from '../lib/supabase';

export default function FeaturedBrands() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBrands() {
      const { data, error } = await supabase
        .from('brands')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (!error && data) {
        setBrands(data);
      }
      setLoading(false);
    }

    fetchBrands();
  }, []);

  const defaultBrands: Brand[] = [
    { id: '1', name: 'SUB-ZERO', logo_text: 'SUB-ZERO', sort_order: 1, is_active: true, created_at: '' },
    { id: '2', name: 'WOLF', logo_text: 'WOLF', sort_order: 2, is_active: true, created_at: '' },
    { id: '3', name: 'KOHLER', logo_text: 'KOHLER', sort_order: 3, is_active: true, created_at: '' },
    { id: '4', name: 'EMTEK', logo_text: 'EMTEK', sort_order: 4, is_active: true, created_at: '' }
  ];

  const displayBrands = brands.length > 0 ? brands : defaultBrands;
  const extendedBrands = [...displayBrands, ...displayBrands];

  return (
    <section className="py-28 md:py-36 px-6 lg:px-8 bg-white overflow-hidden border-y border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <p className="text-xs tracking-[0.3em] text-gray-500 mb-4 uppercase">Partnerships</p>
          <h2 className="text-3xl md:text-4xl font-light text-[#1a1a1a] mb-4">
            Featured Brands
          </h2>
          <p className="text-sm text-gray-600 font-light">
            We work with brands that inspire trust and durability.
          </p>
        </div>

        <div className="relative overflow-hidden">
          <div className="flex scroll-left">
            {extendedBrands.map((brand, index) => (
              <div key={`${brand.id}-${index}`} className="flex-shrink-0 px-12">
                <div className="flex items-center justify-center py-8 min-w-[220px]">
                  <span className="text-2xl md:text-3xl font-light text-[#1a1a1a] tracking-[0.15em] opacity-60 hover:opacity-100 transition-opacity duration-500">
                    {brand.logo_text}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
