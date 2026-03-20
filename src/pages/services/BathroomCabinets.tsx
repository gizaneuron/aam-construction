import Header from "../../components/Header";
import Footer from "../../components/Footer";
import useReveal from "../../hooks/useReveal";
import useServiceOverride from "../../hooks/useServiceOverride";

export default function BathroomCabinets() {

  const heroReveal = useReveal();
  const introReveal = useReveal();
  const block1Reveal = useReveal();
  const block2Reveal = useReveal();
  const processReveal = useReveal();

  const override = useServiceOverride("bathroom-cabinets");

  return (
    <div className="bg-white">

      <Header />

      {/* HERO BANNER */}
      <section className="relative h-[70vh] w-full overflow-hidden">

        <img
          src={override?.banner || "/services/bathroom-banner.png"}
          alt="Bathroom Cabinets"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/30"></div>

        <div className="relative h-full flex items-center justify-center text-center px-6">

          <h1
            ref={heroReveal.ref}
            className={`text-white text-5xl md:text-7xl font-light transition-all duration-1000 ${
              heroReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {override?.title || "Bathroom Cabinets"}
          </h1>

        </div>

      </section>


      {/* INTRO */}
      <section className="py-32 px-6 lg:px-8 max-w-5xl mx-auto text-center">

        <p
          ref={introReveal.ref}
          className={`text-lg md:text-xl text-gray-600 leading-relaxed font-light transition-all duration-1000 ${
            introReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {override?.intro ||
            "Custom bathroom cabinetry designed to combine elegance, storage efficiency and premium finishes for a refined bathroom experience."
          }
        </p>

      </section>


      {/* BLOCK 1 */}
      <section
        ref={block1Reveal.ref}
        className={`py-24 px-6 lg:px-8 max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center transition-all duration-1000 ${
          block1Reveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >

        <img
          src={override?.image1 || "/services/bathroom1.jpeg"}
          alt="Bathroom Cabinets"
          className="w-full h-[500px] object-cover"
        />

        <div>

          <h2 className="text-3xl md:text-4xl font-light mb-6">
            {override?.block1_title || "Elegant Storage Solutions"}
          </h2>

          <p className="text-gray-600 leading-relaxed">
            {override?.block1_text ||
              "Our cabinetry solutions are designed to optimize space, maintain visual harmony and integrate perfectly with the architectural style of your bathroom."
            }
          </p>

        </div>

      </section>


      {/* BLOCK 2 */}
      <section
        ref={block2Reveal.ref}
        className={`py-24 px-6 lg:px-8 max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center transition-all duration-1000 ${
          block2Reveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >

        <div>

          <h2 className="text-3xl md:text-4xl font-light mb-6">
            {override?.block2_title || "Premium Materials"}
          </h2>

          <p className="text-gray-600 leading-relaxed">
            {override?.block2_text ||
              "We use moisture-resistant materials and high-end finishes to ensure durability, sophistication and long-term performance in humid environments."
            }
          </p>

        </div>

        <img
          src={override?.image2 || "/services/bathroom2.jpeg"}
          alt="Bathroom Cabinets"
          className="w-full h-[500px] object-cover"
        />

      </section>


      {/* PROCESS */}
      <section
        ref={processReveal.ref}
        className={`py-32 px-6 lg:px-8 bg-[#1a1a1a] transition-all duration-1000 ${
          processReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >

        <div className="max-w-6xl mx-auto text-center mb-20">

          <h2 className="text-4xl md:text-5xl font-light text-white/80">
            {override?.process_title || "Our Process"}
          </h2>

        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 text-center">

          <div>
            <h3 className="text-xl font-light mb-4">
              {override?.process1_title || "Consultation"}
            </h3>
            <p className="text-white/80">
              {override?.process1_text ||
                "We understand your needs and space requirements."
              }
            </p>
          </div>

          <div>
            <h3 className="text-xl font-light mb-4">
              {override?.process2_title || "Design"}
            </h3>
            <p className="text-white/80">
              {override?.process2_text ||
                "Custom designs tailored to your bathroom layout."
              }
            </p>
          </div>

          <div>
            <h3 className="text-xl font-light mb-4">
              {override?.process3_title || "Installation"}
            </h3>
            <p className="text-white/80">
              {override?.process3_text ||
                "Professional installation ensuring perfect results."
              }
            </p>
          </div>

        </div>

      </section>


      {/* CTA */}
      <section className="py-32 text-center">

        <h2 className="text-4xl font-light mb-8">
          {override?.cta_title || "Start Your Project"}
        </h2>

        <a
          href="/#estimate"
          className="px-12 py-4 border border-[#1a1a1a] text-xs tracking-[0.2em] uppercase hover:bg-[#1a1a1a] hover:text-white transition-all"
        >
          {override?.cta_button || "Request Estimate"}
        </a>

      </section>


      <Footer />

    </div>
  );
}