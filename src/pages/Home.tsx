import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Testimonials from '../components/Testimonials';
import Services from '../components/Services';
import FeaturedBrands from '../components/FeaturedBrands';
import StatsBanner from '../components/StatsBanner';
import Projects from '../components/Projects';
import BlogBanner from '../components/BlogBanner';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <About />
      <Testimonials />
      <Services />
      <FeaturedBrands />
      <StatsBanner />
      <Projects />
      <BlogBanner />
      <Footer />
    </div>
  );
}