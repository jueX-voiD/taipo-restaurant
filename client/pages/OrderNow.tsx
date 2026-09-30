import { useState } from "react";
import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MenuSection from "@/components/MenuSection";
import LocationSection from "@/components/LocationSection";
import InstagramSection from "@/components/InstagramSection";
import orderbg from "@/assets/Are-you-hungry-bg.webp";
import aboutContainerbg from "@/assets/About-container-bg.webp";
import TaipoButton from "@/components/ui/TaipoButton";
import TaipoButtonSecondary from "@/components/ui/TaipoButtonSecondary";
import RestaurantAi from "@/assets/icons/restaurant_ai.png";
import uber from "@/assets/Uber-Delivery.webp";
import ubertop from "@/assets/Uber-delivery-top-bg.webp";
import uvberbottom from "@/assets/Uber-delivery-bottom-bg.webp";

function HeroSection() {
  return (
    <section className="bg-taipo relative overflow-hidden px-5">
      {/* Decorative top watermark */}

      {/* White card */}
      <div className="relative max-w-[1200px] mx-auto bg-white mt-8 mb-0 shadow-sm">
        <div className="flex flex-col items-center gap-1 pt-14 pb-8 px-5">
          <span className="text-40 text-taipo">Are you</span>
          <h1 className="text-72 font-carla font-normal uppercase text-center">
            Hungry?
          </h1>
        </div>

        <div className="px-5 max-w-[484px] flex flex-col gap-3 justify-center mx-auto">
          <div className="text-center text-32 text-taipo font-medium">
            Pre-order for in-store pick-up
          </div>
          <p className="w-full text-taipo-dark text-18 text-center !leading-[1.8]">
            Skip the queue and have your meal ready for when you arrive in
            store, by ordering directly from Taipo. Zero fees. Just goodness.
          </p>
          <TaipoButtonSecondary
            to="https://orders.taiporestaurants.com/locations/taipo-arlington"
            className="mt-4 self-center hover:bg-[var(--secondary)] hover:text-white z-10"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pre-order Now
          </TaipoButtonSecondary>
          <div className="self-center flex flex-row justify-center align-middle">
            <span className="font-SofiaPro font-normal text-[#232323] text-[12px] text-center self-center">
              Powered by:
            </span>
            <a
              href="https://www.restronaut.ai/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={RestaurantAi}
                alt="Restronaut.AI"
                className="h-[30px]"
              />
            </a>
          </div>
        </div>

        {/* Bottom fade image */}
        <img
          src={orderbg}
          alt=""
          className="w-full h-[200px] object-cover pointer-events-none select-none -mt-20 z-0"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}

function SpecialsSection() {
  return (
    <section className="bg-taipo relative overflow-hidden px-5 mt-12">
      {/* Left: photo */}
      <div className="w-full max-w-[1200px] mx-auto flex md:flex-row flex-col">
        <div
          className="w-full min-h-[300px] sm:min-h-[400px] md:min-h-[532px] bg-cover bg-center relative"
          style={{
            backgroundImage: `url(${uber})`,
          }}
        ></div>

        {/* Right: content */}
        <div className="w-full bg-white relative flex items-center justify-center overflow-hidden min-h-[400px] md:min-h-[532px]">
          {/* Decorative top strip */}
          <img
            src={ubertop}
            alt=""
            aria-hidden="true"
            className="absolute top-0 left-0 w-full h-[123px] object-cover pointer-events-none"
          />
          {/* Decorative bottom strip */}
          <img
            src={uvberbottom}
            alt=""
            aria-hidden="true"
            className="absolute bottom-0 left-0 w-full h-[123px] object-cover pointer-events-none"
          />

          {/* Center content */}
          <div className="relative z-10 flex flex-col items-center gap-11 px-8 py-16 max-w-[419px] w-full">
            <div className="flex flex-col items-center gap-5">
              <div className="flex flex-col items-center gap-2">
                <h2 className="text-taipo text-32 text-center font-medium">
                  Have launch delivered
                </h2>
                <p className="text-18 text-center text-taipo-dark">
                  We have partnered with reliable delivery experts who will
                  handle your orders seamlessly. Simply visit your preferred
                  delivery partner via the links below.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function OrderNow() {
  return (
    <div className="bg-taipo">
      <Seo
        title="Order Nepali-Inspired Cuisine Online in Arlington - Taipo"
        description="Order authentic Nepali-inspired dishes from Taipo in Arlington, TX, for pickup or delivery. Enjoy bold flavors with the convenience of online ordering."
        path="/order-now/"
        image="https://www.taiporestaurants.com/wp-content/uploads/2024/01/Uber-Delivery.webp"
      />
      <Navbar />
      <main>
        <HeroSection />
        <SpecialsSection />
        <InstagramSection />
      </main>
      <Footer />
    </div>
  );
}
