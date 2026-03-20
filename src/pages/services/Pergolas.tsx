import Header from "../../components/Header";
import Footer from "../../components/Footer";
import useReveal from "../../hooks/useReveal";
import useServiceOverride from "../../hooks/useServiceOverride";

export default function Pergolas() {

  const heroReveal = useReveal();
  const introReveal = useReveal();
  const block1Reveal = useReveal();
  const block2Reveal = useReveal();
  const processReveal = useReveal();

  const override = useServiceOverride("pergolas");

  return (
    <div className="bg-white">

      <Header />

      {/* HERO */}
      <section className="relative h-[70vh] w-full overflow-hidden">

        <img
          src={override?.banner || "/services/pergola-banner.png"}
          alt="Pergolas"
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
            {override?.title || "Pergolas"}
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
            "Custom pergolas designed to enhance your outdoor living experience, creating shaded, elegant and functional spaces."
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
          src={override?.image1 || "/services/pergola1.jpeg"}
          alt="Pergolas"
          className="w-full h-[500px] object-cover"
        />

        <div>

          <h2 className="text-3xl md:text-4xl font-light mb-6">
            {override?.block1_title || "Outdoor Comfort & Design"}
          </h2>

          <p className="text-gray-600 leading-relaxed">
            {override?.block1_text ||
              "Our pergolas are designed to provide shade, comfort and architectural value, elevating your outdoor environment."
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
            {override?.block2_title || "Built to Last"}
          </h2>

          <p className="text-gray-600 leading-relaxed">
            {override?.block2_text ||
              "We use high-quality materials and expert craftsmanship to ensure your pergola remains durable and visually stunning over time."
            }
          </p>

        </div>

        <img
          src={override?.image2 || "/services/pergola2.jpeg"}
          alt="Pergolas"
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
              {override?.process1_title || "Design"}
            </h3>
            <p className="text-white/80">
              {override?.process1_text ||
                "We design a pergola that integrates perfectly with your space."
              }
            </p>
          </div>

          <div>
            <h3 className="text-xl font-light mb-4">
              {override?.process2_title || "Build"}
            </h3>
            <p className="text-white/80">
              {override?.process2_text ||
                "Our team builds with precision and premium materials."
              }
            </p>
          </div>

          <div>
            <h3 className="text-xl font-light mb-4">
              {override?.process3_title || "Installation"}
            </h3>
            <p className="text-white/80">
              {override?.process3_text ||
                "We install and finalize every detail to perfection."
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