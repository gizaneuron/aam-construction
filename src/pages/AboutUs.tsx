import Header from "../components/Header";
import Footer from "../components/Footer";
import useReveal from "../hooks/useReveal";
import useAbout from "../hooks/useAbout";

export default function AboutUs() {

  const heroReveal = useReveal();
  const introReveal = useReveal();
  const block1Reveal = useReveal();
  const block2Reveal = useReveal();
  const data = useAbout();

  return (
    <div className="bg-white">

      <Header />

      {/* HERO */}
      <section className="relative h-[70vh] w-full overflow-hidden">

        <img
          src={data.banner || "/about-banner.png"}
          alt="About AAM"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative h-full flex items-center justify-center text-center px-6">

          <h1
            ref={heroReveal.ref}
            className={`text-white text-5xl md:text-7xl font-light transition-all duration-1000 ${
              heroReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {data.heading || "About Us"}
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
          {data.intro || `At AAM All Construction, we stand out as leaders in the construction and remodeling industry in Tampa Bay, Florida.With years of experience, we have built a solid reputation based on quality, punctuality, and a steadfast commitment to our clients.`}
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
          src={data.block1_image || "/about1.jpeg"}
          alt="Construction Team"
          className="w-full h-[500px] object-cover"
        />

        <div>

          <h2 className="text-3xl md:text-4xl font-light mb-6">
            {data.block1_title || "Built on Trust & Precision"}
          </h2>

          <p className="text-gray-600 leading-relaxed">
            {data.block1_text || `Our focus is on providing tailored solutions that meet the unique needs of every project, whether it’s new construction, comprehensive renovations, or custom designs. Every detail is executed with precision using high-quality materials and modern technologies.`}
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
            {data.block2_title || "More Than Construction"}
          </h2>

          <p className="text-gray-600 leading-relaxed">
            {data.block2_text || `We believe in building not only exceptional spaces but also lasting relationships. Our clients are at the center of everything we do, and every project reflects our commitment to quality, functionality, and timeless design.`}
          </p>

        </div>

        <img
          src={data.block2_image || "/about2.jpeg"}
          alt="Modern Design"
          className="w-full h-[500px] object-cover"
        />

      </section>


      {/* CLOSING */}
      <section className="py-32 text-center max-w-4xl mx-auto px-6">

        <h2 className="text-4xl md:text-5xl font-light mb-8">
          {data.closing_title || "We Turn Ideas Into Reality"}
        </h2>

        <p className="text-gray-600 leading-relaxed text-lg">
          {data.closing_text || `At AAM All Construction, we create spaces that reflect style, functionality, and durability. We are committed to excellence and to being your trusted partner for any project, big or small.`}
        </p>

      </section>

      <Footer />

    </div>
  );
}