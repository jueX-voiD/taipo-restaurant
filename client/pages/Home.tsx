import TaipoButton from "@/components/ui/TaipoButton";
import TaipoButtonSecondary from "@/components/ui/TaipoButtonSecondary";
import Seo from "@/components/Seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MenuSection from "@/components/MenuSection";
import LocationSection from "@/components/LocationSection";
import InstagramSection from "@/components/InstagramSection";
import heroSectionBg from "@/assets/Home-page-hero-section-bg.webp";
import heroSectionLogo from "@/assets/hero-section-logo.svg";
import withLoveFromNepal from "@/assets/with-love-fromNepal.svg";
import keemaNoodles from "@/assets/Keema-noodles.webp";
import panSearedMomos from "@/assets/Pan-seared-momos.webp";
import chickenChili from "@/assets/Chicken-chilli.webp";
import taipoRestaurant from "@/assets/Taipo-Behind-the-Door.webp";

const specials = [
  {
    name: "Keema Noodles",
    desc: "Freshly boiled lo mein tossed in flavored sesame paste, topped with choice of protein and chili oil.",
    img: keemaNoodles,
  },
  {
    name: "Pan Seared Momos",
    desc: "Delicious dumplings with flavor meat or veggie fillings. ",
    img: panSearedMomos,
  },
  {
    name: "Chicken Chili",
    desc: "Sizzling fresh veggies in the work, with choice of protein.",
    img: chickenChili,
  },
];

function HeroSection() {
  return (
    <section className="relative bg-[var(--primary)] md:min-h-screen flex items-center justify-center overflow-hidden">
      {/* Flower background */}
      <img
        src={heroSectionBg}
        alt=""
        fetchPriority="high"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-5 text-center pt-[160px] md:pb-[340px] pb-[160px]">
        <h1>
          <img
            src={heroSectionLogo}
            alt="Taipo - Authentic Nepali Cuisine in Arlington, TX"
            fetchPriority="high"
            className="w-[clamp(15.5rem,12.5804rem+12.9762vw,22.3125rem)] h-auto"
          />
        </h1>
        <img
          src={withLoveFromNepal}
          alt="With love from Nepal"
          className="h-auto self-end left-5 relative"
        />
        <TaipoButton to="/order-now" className="mt-9 text-[var(--primary)]">
          Order Now
        </TaipoButton>
      </div>
      <div className="absolute bottom-0 md:min-h-[300px] min-h-[180px] bg-gradient-to-b from-transparent to-[#ECFFFE] w-full "></div>
    </section>
  );
}

function SpecialsSection() {
  return (
    <section className="bg-[var(--background)] md:pt-[100px] pt-[50px] md:pb-[56px] pb-[28px]">
      <div className="max-w-[1240px] mx-auto px-5">
        <div className="mb-[72px] max-w-[703px]">
          <h2 className="text-72 uppercase">Taipo specials</h2>
          <p className="text-18 mt-3">
            We are providing you with the best from our chefs. Contains
            different varieties of foods.
          </p>
        </div>

        <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory -mx-5 px-5 lg:grid lg:grid-cols-3 lg:overflow-visible lg:mx-0 lg:pl-5 lg:pr-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {specials.map((item, i) => (
            <div
              key={i}
              className="group snap-start flex-shrink-0 basis-[calc(100%-56px)] md:basis-[calc((100%-80px)/2)] lg:basis-auto bg-[#E1F7F6] flex flex-col gap-6 items-center sm:py-[24px] py-[16px]"
            >
              <div className="w-full max-w-[308px] sm:px-[38px] px-[20px] overflow-hidden relative flex-shrink-0">
                <img
                  src={item.img}
                  alt={`${item.name} at Taipo Arlington`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-all duration-[800ms] ease-in-out group-hover:rotate-[15deg]"
                />
              </div>

              <div className="flex h-full flex-col items-center gap-6 w-full px-4 justify-between">
                <div className="flex flex-col items-center gap-3 text-center">
                  <h3 className="text-32 text-[#09625D] font-medium">
                    {item.name}
                  </h3>
                  <p className="text-18 text-[#09625D]">{item.desc}</p>
                </div>
                <TaipoButtonSecondary
                  to="https://orders.taiporestaurants.com/locations/taipo-arlington"
                  className="self-center hover:bg-[var(--secondary)] hover:text-white z-10"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Order Now
                </TaipoButtonSecondary>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RestaurantSection() {
  return (
    <section className="bg-[#F8FFFF] sm:py-[124px] py-[64px]">
      <div className="max-w-[1240px] mx-auto px-5">
        <div className="flex flex-col lg:flex-row items-center gap-12 md:gap-16">
          <div className="flex-shrink-0 w-full md:w-auto">
            <img
              src={taipoRestaurant}
              alt="Taipo Nepali restaurant interior in Arlington, TX"
              loading="lazy"
              decoding="async"
              className="w-full lg:w-[512px] h-auto object-cover"
            />
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-72 uppercase">taipo- Behind the door</h2>
            <TaipoButtonSecondary
              to="/about-us"
              className="hover:bg-[var(--secondary)] hover:text-[var(--white)]"
            >
              Explore
            </TaipoButtonSecondary>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div>
      <Seo path="/" />
      <Navbar />
      <main>
        <HeroSection />
        <SpecialsSection />
        <MenuSection showOrderButton={true} />
        <RestaurantSection />
        <LocationSection />
        <InstagramSection />
      </main>
      <Footer />
    </div>
  );
}
