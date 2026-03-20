import { useEffect, useState } from 'react';
import { supabase, type Service } from '../lib/supabase';
import { Link } from "react-router-dom";

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchServices() {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (!error && data) {
        setServices(data);
      }
      setLoading(false);
    }

    fetchServices();
  }, []);

  const defaultServices: Service[] = [
  {
    id: '1',
    title: 'Luxury Carpenter Design',
    image_url: '/luxury.jpeg',
    sort_order: 1,
    is_active: true,
    created_at: ''
  },
  {
    id: '2',
    title: 'Bathroom Cabinets',
    image_url: '/bathroom.png',
    sort_order: 2,
    is_active: true,
    created_at: ''
  },
  {
    id: '3',
    title: 'Kitchen Cabinets',
    image_url: '/kitchen.jpeg',
    sort_order: 3,
    is_active: true,
    created_at: ''
  },
  {
    id: '4',
    title: 'Outdoor Kitchen',
    image_url: '/outdoork.jpeg',
    sort_order: 4,
    is_active: true,
    created_at: ''
  },
  {
    id: '5',
    title: 'Pergolas',
    image_url: '/pergola.jpeg',
    sort_order: 5,
    is_active: true,
    created_at: ''
  },
  {
    id: '6',
    title: 'Backyard',
    image_url: '/Backyard.jpeg',
    sort_order: 6,
    is_active: true,
    created_at: ''
  },
  {
    id: '7',
    title: 'Pool Cage',
    image_url: '/poolcage.jpeg',
    sort_order: 7,
    is_active: true,
    created_at: ''
  }
  
];

  const serviceRoutes: Record<string, string> = {
    "Luxury Carpenter Design": "/services/carpenter-design",
    "Bathroom Cabinets": "/services/bathroom-cabinets",
    "Kitchen Cabinets": "/services/kitchen-cabinets",
    "Outdoor Kitchen": "/services/outdoor-kitchen",
    "Pergolas": "/services/pergolas",
    "Backyard": "/services/backyard",
    "Pool Cage": "/services/pool-cage"
  };

  function getRandomServices(services: Service[], count: number) {
    const shuffled = [...services].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
const baseServices = services.length > 0 ? services : defaultServices;

const displayServices = getRandomServices(
  baseServices.map((service, index) => ({
    ...service,
    image_url:
      service.image_url && service.image_url.trim() !== ''
        ? service.image_url
        : defaultServices[index]?.image_url
  })),
  4
);

  return (
    <section className="py-32 md:py-40 lg:py-48 px-6 lg:px-8 bg-neutral-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 md:mb-28">
          <p className="text-xs tracking-[0.3em] text-gray-500 mb-4 uppercase">What We Offer</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#1a1a1a]">
            Services
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {displayServices.map((service, index) => (
            <div key={service.id} className="group relative overflow-hidden cursor-pointer">
              <div className="relative h-[450px] md:h-[550px] overflow-hidden mb-8">
                <img
                  src={service.image_url}
                  alt={service.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 transition-all duration-700"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                  <h3 className="text-2xl md:text-3xl font-light text-white mb-4 transition-transform duration-500 group-hover:translate-y-[-4px]">
                    {service.title}
                  </h3>
                 <Link
                    to={serviceRoutes[service.title]}
                    className="px-8 py-3 border border-white/80 text-white text-xs font-medium tracking-[0.2em] hover:bg-white hover:text-[#1a1a1a] transition-all duration-500 uppercase opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 inline-block"
                  >
                    Discover More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
