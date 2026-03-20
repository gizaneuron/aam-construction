import { Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase, type Testimonial } from '../lib/supabase';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchTestimonials() {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (!error && data) {
        setTestimonials(data);
      }
      setLoading(false);
    }

    fetchTestimonials();
  }, []);

  const defaultTestimonials: Testimonial[] = [
    {
      id: '1',
      text: 'All Construction delivered outstanding workmanship and attention to detail. Their commitment to quality and professionalism exceeded our expectations. Our custom home is now a timeless showcase of their talent.',
      author: 'Michael S.',
      role: 'Waterfront Custom Home',
      rating: 5,
      sort_order: 1,
      is_active: true,
      created_at: ''
    },
    {
      id: '2',
      text: 'Working with All Construction was a seamless and enjoyable experience. The team was professional, communicative, and dedicated to quality at every step. We couldn\'t be happier with how much they delivered.',
      author: 'Jennifer L.',
      role: 'Modern Kitchen Renovation',
      rating: 5,
      sort_order: 2,
      is_active: true,
      created_at: ''
    },
    {
      id: '3',
      text: 'The craftsmanship and designer level of All Construction turned our backyard into a resort-like oasis. From concept to completion, they demonstrated expertise and care. They deserve top marks.',
      author: 'David & Emily R.',
      role: 'Outdoor Living Area',
      rating: 5,
      sort_order: 3,
      is_active: true,
      created_at: ''
    }
  ];

  const displayTestimonials = testimonials.length > 0 ? testimonials : defaultTestimonials;
  const extendedTestimonials = [...displayTestimonials, ...displayTestimonials];

  useEffect(() => {
    if (displayTestimonials.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayTestimonials.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [displayTestimonials.length]);

  return (
    <section className="py-32 md:py-40 lg:py-48 px-6 lg:px-8 bg-neutral-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 md:mb-28">
          <p className="text-xs tracking-[0.3em] text-gray-500 mb-4 uppercase">Client Experiences</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#1a1a1a]">
            Testimonials
          </h2>
        </div>

        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-1000 ease-out"
            style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
          >
            {extendedTestimonials.map((testimonial, index) => (
              <div key={`${testimonial.id}-${index}`} className="min-w-[100%] md:min-w-[33.333%] px-6">
                <div className="bg-white p-12 md:p-14">
                  <div className="flex justify-center mb-8">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={14} fill="#1a1a1a" stroke="#1a1a1a" className="mx-0.5" />
                    ))}
                  </div>
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-10 font-light text-center">
                    "{testimonial.text}"
                  </p>
                  <div className="border-t border-gray-200 pt-8 text-center">
                    <p className="text-sm font-medium text-[#1a1a1a] tracking-wide">
                      {testimonial.author}
                    </p>
                    <p className="text-xs text-gray-500 mt-2 tracking-wider uppercase">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
