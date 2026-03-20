import Header from "../../components/Header";
import Footer from "../../components/Footer";

type ServiceProps = {
  title: string;
  subtitle: string;
  description: string;
  image: string;
};

export default function ServiceTemplate({
  title,
  subtitle,
  description,
  image
}: ServiceProps) {
  return (
    <div className="bg-white min-h-screen">

      <Header />

      {/* HERO */}
      <section className="pt-40 pb-24 px-6 lg:px-8 max-w-6xl mx-auto">

        <h1 className="text-5xl md:text-6xl font-light text-[#1a1a1a] mb-10">
          {title}
        </h1>

        <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
          {subtitle}
        </p>

      </section>

      {/* IMAGE */}
      <section className="px-6 lg:px-8 max-w-6xl mx-auto pb-24">

        <img
          src={image}
          alt={title}
          className="w-full h-[500px] object-cover"
        />

      </section>

      {/* DESCRIPTION */}
      <section className="px-6 lg:px-8 max-w-6xl mx-auto pb-32">

        <p className="text-lg text-gray-600 leading-relaxed">
          {description}
        </p>

      </section>

      {/* CTA */}
      <section className="text-center pb-40">

        <a
          href="/#estimate"
          className="px-12 py-4 border border-[#1a1a1a] text-xs tracking-[0.2em] uppercase hover:bg-[#1a1a1a] hover:text-white transition-all"
        >
          Request Estimate
        </a>

      </section>

      <Footer />

    </div>
  );
}