import Header from "../../components/Header";
import Footer from "../../components/Footer";
import useReveal from "../../hooks/useReveal";
import useServiceOverride from "../../hooks/useServiceOverride";

export default function PoolCage() {

  const heroReveal = useReveal();
  const introReveal = useReveal();
  const block1Reveal = useReveal();
  const block2Reveal = useReveal();
  const processReveal = useReveal();

  const override = useServiceOverride("pool-cage");

  return (
    <div className="bg-white">

      <Header />

      {/* HERO */}
      <section className="relative h-[70vh] w-full overflow-hidden">

        <img
          src={override?.banner || "/services/poolcage-banner.png"}
          alt="Pool Cage"
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
            {override?.title || "Pool Cage"}
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
            "Pool cage enclosures designed to protect, enhance and elevate your outdoor pool area with style and durability."
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
          src={override?.image1 || "/services/poolcage1.png"}
          alt="Pool Cage"
          className="w-full h-[500px] object-cover"
        />

        <div>

          <h2 className="text-3xl md:text-4xl font-light mb-6">
            {override?.block1_title || "Protection & Comfort"}
          </h2>

          <p className="text-gray-600 leading-relaxed">
            {override?.block1_text ||
              "Our pool enclosures provide protection from insects, debris and weather while maintaining visibility and comfort."
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
            {override?.block2_title || "Engineered for Durability"}
          </h2>

          <p className="text-gray-600 leading-relaxed">
            {override?.block2_text ||
              "We use high-quality aluminum structures and resistant screening systems to ensure long-lasting performance."
            }
          </p>

        </div>

        <img
          src={override?.image2 || "/services/poolcage2.png"}
          alt="Pool Cage"
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
              {override?.process1_title || "Assessment"}
            </h3>
            <p className="text-white/80">
              {override?.process1_text ||
                "We evaluate your pool area and define the ideal enclosure solution."
              }
            </p>
          </div>

          <div>
            <h3 className="text-xl font-light mb-4">
              {override?.process2_title || "Fabrication"}
            </h3>
            <p className="text-white/80">
              {override?.process2_text ||
                "We build a custom structure using high-end materials."
              }
            </p>
          </div>

          <div>
            <h3 className="text-xl font-light mb-4">
              {override?.process3_title || "Installation"}
            </h3>
            <p className="text-white/80">
              {override?.process3_text ||
                "We install your enclosure ensuring safety and precision."
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