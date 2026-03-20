import { useEffect, useRef, useState } from 'react';
import { supabase, type Stat } from '../lib/supabase';

export default function StatsBanner() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState<number[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    async function fetchStats() {
      const { data, error } = await supabase
        .from('stats')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (!error && data) {
        setStats(data);
        setCounts(data.map(() => 0));
      }
      setLoading(false);
    }

    fetchStats();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const defaultStats: Stat[] = [
    {
      id: '1',
      number: 2000,
      suffix: '+',
      label: 'Completed Projects',
      sort_order: 1,
      is_active: true,
      created_at: ''
    },
    {
      id: '2',
      number: 1500,
      suffix: '+',
      label: 'Happy Customers',
      sort_order: 2,
      is_active: true,
      created_at: ''
    },
    {
      id: '3',
      number: 15,
      suffix: '+',
      label: 'Experience',
      sort_order: 3,
      is_active: true,
      created_at: ''
    }
  ];

  const displayStats = stats.length > 0 ? stats : defaultStats;

  useEffect(() => {
    if (displayStats.length > 0 && counts.length === 0) {
      setCounts(displayStats.map(() => 0));
    }
  }, [displayStats]);

  useEffect(() => {
    if (!isVisible || displayStats.length === 0 || hasAnimated.current) return;

    hasAnimated.current = true;

    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    displayStats.forEach((stat, index) => {
      let currentCount = 0;
      const statNumber =
        typeof stat.number === 'string'
          ? parseInt(stat.number, 10)
          : stat.number;

      const increment = statNumber / steps;

      const timer = setInterval(() => {
        currentCount += increment;

        if (currentCount >= statNumber) {
          currentCount = statNumber;
          clearInterval(timer);
        }

        setCounts((prev) => {
          const newCounts = [...prev];
          newCounts[index] = Math.floor(currentCount);
          return newCounts;
        });
      }, interval);
    });
  }, [isVisible, displayStats]);

  return (
    <section ref={sectionRef} className="py-32 md:py-40 lg:py-48 px-6 lg:px-8 bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 md:mb-28">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight max-w-4xl mx-auto">
            Designed to Reflect Your Vision
          </h2>
          <p className="text-lg md:text-xl font-light text-white/80">
            Built to elevate your lifestyle.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
          {displayStats.map((stat, index) => (
            <div key={stat.id} className="text-center py-12">
              <h3 className="text-5xl md:text-6xl lg:text-7xl font-light text-white mb-4">
                {counts[index]?.toLocaleString() || '0'}{stat.suffix}
              </h3>
              <div className="w-12 h-px bg-white/30 mx-auto mb-4"></div>
              <p className="text-xs text-white/70 tracking-[0.25em] uppercase font-light">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
