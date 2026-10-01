import { Link } from "react-router-dom";
import TaipoButton from "@/components/ui/TaipoButton";
import TaipoButtonSecondary from "@/components/ui/TaipoButtonSecondary";
import Seo from "@/components/Seo";
import aboutbg from "@/assets/about-background.webp";
import aboutContainerbg from "@/assets/About-container-bg.webp";
import aboutcardbg from "@/assets/About-bg.webp";
import instagram1 from "@/assets/instagram photos/Image-1.webp";
import instagram2 from "@/assets/instagram photos/Image-2.webp";
import instagram3 from "@/assets/instagram photos/Image-3.webp";
import instagram4 from "@/assets/instagram photos/Image-4.webp";
import instagram5 from "@/assets/instagram photos/Image-5.webp";
import instagram6 from "@/assets/instagram photos/Image-6.webp";
import instagram7 from "@/assets/instagram photos/Image-7.webp";
import instagram8 from "@/assets/instagram photos/Image-8.webp";
import instagram9 from "@/assets/instagram photos/Image-9.webp";
import instagram10 from "@/assets/instagram photos/Image-10.webp";
import instagram11 from "@/assets/instagram photos/Image-11.webp";
import instagram12 from "@/assets/instagram photos/Image-12.webp";
import instagram13 from "@/assets/instagram photos/Image-13.webp";
import instagram14 from "@/assets/instagram photos/Image-14.webp";
import instagram15 from "@/assets/instagram photos/Image-15.webp";
import instagram16 from "@/assets/instagram photos/Image-16.webp";
import instagram17 from "@/assets/instagram photos/Image-17.webp";
import instagram18 from "@/assets/instagram photos/Image-18.webp";
import instagram19 from "@/assets/instagram photos/Image-19.webp";
import instagram20 from "@/assets/instagram photos/Image-20.webp";
import instagram21 from "@/assets/instagram photos/Image-21.webp";
import instagram22 from "@/assets/instagram photos/Image-22.webp";

const galleryRow1 = [
  instagram1,
  instagram2,
  instagram3,
  instagram4,
  instagram5,
  instagram6,
  instagram7,
  instagram8,
  instagram9,
  instagram10,
  instagram11,
];

const galleryRow2 = [
  instagram12,
  instagram13,
  instagram14,
  instagram15,
  instagram16,
  instagram17,
  instagram18,
  instagram19,
  instagram20,
  instagram21,
  instagram22,
];

export default function About() {
  return (
    <div className="flex-1 flex flex-col">
      <Seo path="/about-us/" />
      {/* Hero + Story Section */}
      <section className="bg-[#E9FCFB] relative overflow-hidden px-5">
        {/* Decorative top watermark */}
        <img
          src={aboutbg}
          alt="About Taipo background Illustration"
          className="absolute top-0 left-0 w-full max-w-3xl pointer-events-none select-none"
          aria-hidden="true"
        />

        {/* White card */}
        <div className="relative max-w-[1240px] mx-auto bg-white mt-8 mb-0 shadow-sm">
          {/* "About Taipo" heading */}
          <div className="flex flex-col items-center gap-1 pt-14 pb-8 px-5">
            <h1 className="text-40 text-taipo">About</h1>
            <span className="text-72 font-carla font-normal">Taipo</span>
          </div>

          {/* Story section */}
          <div className="px-5 max-w-[800px] flex flex-col gap-16 justify-center mx-auto mb-14">
            {/* Row 1: Image left, text right */}

            <p className="w-full text-taipo-dark text-18 text-center !leading-[1.8]">
              Our culinary journey is inspired by the cherished memories of home
              cooked meals and family recipes, aiming to recreate the comforting
              warmth that filled our hearts while growing up thousand of miles
              away in the city of temples, Kathmandu. <br /> <br />
              At Taipo, we embrace the art of staying true to our roots while
              gracefully learning from the world, ensuring every plate tells a
              story of tradition, innovation, and a love for both our heritage,
              and inspirations from around the world. Our menu is a celebration
              of diversity, a bold and flavorful fusion that breaks free from
              convention – a rebellion against the ordinary.
            </p>

            {/* Row 2: Text left, Image right */}
          </div>

          {/* Bottom fade image */}
          <img
            src={aboutContainerbg}
            alt=""
            className="w-full h-20 object-cover pointer-events-none select-none"
            aria-hidden="true"
          />
        </div>
      </section>

      {/* Quote Banner */}
      <section
        className="bg-[#E9FCFB] relative w-full mx-auto overflow-hidden px-5"
        style={{ minHeight: "360px" }}
      >
        <div className="relative w-full max-w-[1240px] mx-auto my-20">
          <img
            src={aboutcardbg}
            alt="Taipo restaurant"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#B0F7F3] mix-blend-multiply" />
          <div className="absolute inset-0 bg-taipo-dark/30" />

          <div className="relative z-10 flex flex-col items-center justify-center min-h-[360px] px-5 py-16 gap-8">
            <p className="text-white text-32 text-center font-normal max-w-[772px]">
              Welcome to a new era of fast casual, where every bite is a journey
              across cultures and every meal is a love letter from Nepal.
            </p>
            <TaipoButtonSecondary
              to="https://orders.taiporestaurants.com/locations/taipo-arlington"
              className="mt-4 self-center hover:bg-[var(--secondary)] hover:text-white z-10"
              target="_blank"
              rel="noopener noreferrer"
            >
              Order Now
            </TaipoButtonSecondary>
          </div>
        </div>
      </section>

      {/* Foods and Place Gallery */}
      <section className="bg-white py-16 md:py-20">
        <div className="flex flex-col items-center gap-3 mb-10 max-w-[1200px] mx-auto px-5">
          <h2 className="text-72 uppercase text-center">Foods and place</h2>
          <p className="text-18 text-center text-[#0A615D] max-w-[588px]">
            We are providing you with the best from our chefs. Contains
            different varieties of foods.
          </p>
        </div>

        {/* Gallery marquee — full width, infinite scroll */}
        <div className="overflow-hidden">
          {/* Row 1: right to left */}
          <div className="flex w-max animate-[marquee-rtl_80s_linear_infinite]">
            {[...galleryRow1, ...galleryRow1].map((src, i) => (
              <div
                key={i}
                className="w-[50vw] md:w-[33.333vw] lg:w-[25vw] aspect-[1/1] flex-shrink-0"
              >
                <img
                  src={src}
                  alt={`Taipo Nepali food and restaurant photo ${(i % galleryRow1.length) + 1}`}
                  loading="lazy"
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>

          {/* Row 2: left to right */}
          <div className="flex w-max animate-[marquee-ltr_80s_linear_infinite]">
            {[...galleryRow2, ...galleryRow2].map((src, i) => (
              <div
                key={i}
                className="w-[50vw] md:w-[33.333vw] lg:w-[25vw] aspect-[1/1] flex-shrink-0"
              >
                <img
                  src={src}
                  alt={`Taipo Nepali food and restaurant photo ${(i % galleryRow2.length) + 12}`}
                  loading="lazy"
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
