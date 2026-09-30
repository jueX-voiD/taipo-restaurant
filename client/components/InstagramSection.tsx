import { useRef, useState } from "react";
import instagramSectionBg from "../assets/Instagram-bg.webp";
import nextIcon from "@/assets/icons/next icon.svg";
import prevIcon from "@/assets/icons/prev icon.svg";
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

const instagramPhotos = [
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

export default function InstagramSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0, show: false });

  const scroll = (dir: "prev" | "next") => {
    const el = scrollRef.current;
    if (!el) return;
    const firstChild = el.firstElementChild as HTMLElement | null;
    const gap = 24; // matches gap-6
    const amount = firstChild ? firstChild.offsetWidth + gap : el.clientWidth;
    el.scrollBy({
      left: dir === "next" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative bg-taipo overflow-hidden py-16 md:py-[140px]">
      <div className="w-full md:h-[140px] h-16 absolute top-0 left-0 bg-gradient-to-b from-[#00C1B8] to-transparent z-10" />
      {/* Background overlay */}
      <img
        src={instagramSectionBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      <div className="relative z-10 flex flex-col items-center gap-12 w-full mx-auto ">
        {/* Heading + visit button */}
        <h2 className="text-72 text-center uppercase text-[var(--white)] px-5">
          Follow us on Instagram
        </h2>

        {/* Photos carousel */}
        <div
          className="relative w-full cursor-none"
          onMouseEnter={() => setCursor((c) => ({ ...c, show: true }))}
          onMouseLeave={() => setCursor((c) => ({ ...c, show: false }))}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const overButton = !!(e.target as HTMLElement).closest("button");
            setCursor({
              x: e.clientX - rect.left,
              y: e.clientY - rect.top,
              show: !overButton,
            });
          }}
        >
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {instagramPhotos.map((src, i) => (
              <a
                key={i}
                href="https://www.instagram.com/taipoarlington/"
                target="_blank"
                rel="noopener noreferrer"
                className="snap-center cursor-none flex-shrink-0 basis-[calc(100%-112px)] md:basis-[calc((100%-136px)/2)] lg:basis-[calc((100%-48px)/3)] xl:basis-[calc((100%-72px)/4)]"
              >
                <img
                  src={src}
                  alt={`Taipo Arlington Instagram post ${i + 1}`}
                  loading="lazy"
                  className="w-full aspect-[4/5] object-contain"
                />
              </a>
            ))}
          </div>

          {/* Custom "Visit Instagram" cursor */}
          <span
            aria-hidden="true"
            className="absolute z-20 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center w-28 h-28 rounded-full bg-[var(--white)] transition-opacity duration-200"
            style={{
              left: cursor.x,
              top: cursor.y,
              opacity: cursor.show ? 1 : 0,
            }}
          >
            <span className="font-SofiaPro text-taipo text-xs text-center leading-tight px-2">
              Visit
              <br />
              Instagram
            </span>
          </span>

          {/* Navigation */}
          <button
            type="button"
            onClick={() => scroll("prev")}
            aria-label="Previous"
            className="absolute left-5 top-1/2 -translate-y-1/2 z-30 cursor-pointer transition-opacity hover:opacity-80"
          >
            <img
              src={prevIcon}
              alt=""
              className="lg:w-[120px] lg:h-[120px] md:w-[80px] md:h-[80px] sm:w-[60px] sm:h-[60px] w-0 h-0"
            />
          </button>
          <button
            type="button"
            onClick={() => scroll("next")}
            aria-label="Next"
            className="absolute right-5 top-1/2 -translate-y-1/2 z-30 cursor-pointer transition-opacity hover:opacity-80"
          >
            <img
              src={nextIcon}
              alt=""
              className="lg:w-[120px] lg:h-[120px] md:w-[80px] md:h-[80px] sm:w-[60px] sm:h-[60px] w-0 h-0"
            />
          </button>
        </div>
      </div>
    </section>
  );
}
