import { useState } from "react";
import { Link } from "react-router-dom";
import TaipoButton from "@/components/ui/TaipoButton";
import TaipoButtonSecondary from "@/components/ui/TaipoButtonSecondary";
import Momo from "@/assets/menu/Momo.webp";
import Taipo from "@/assets/menu/Taipo.webp";
import TaipoMelts from "@/assets/menu/Taipo-Melts.webp";
import StickFood from "@/assets/menu/Stick-Food.webp";
import RiceAndNoodles from "@/assets/menu/Chefs-Special-1.webp";
import Sandwich from "@/assets/menu/Chefs-Special-3.webp";
import DrinkAndDessert from "@/assets/menu/Drinks-and-Dessert-1.webp";
import ColdFoamRefresher from "@/assets/menu/Drinks-and-Dessert-2.webp";
import ClassicRefresher from "@/assets/menu/Drinks-and-Dessert-3.webp";
import Sauce from "@/assets/menu/Sauce.webp";

const MENU_TABS = [
  "Momo",
  "Taipo",
  "Taipo Melts",
  "Stick Food",
  "Rice & Noodles",
  "Sandwich",
  "Drink & Dessert",
  "Cold Foam Refresher",
  "Classic Refresher",
  "Sauce",
];

const menuImages: Record<string, string> = {
  Momo,
  Taipo,
  "Taipo Melts": TaipoMelts,
  "Stick Food": StickFood,
  "Rice & Noodles": RiceAndNoodles,
  Sandwich,
  "Drink & Dessert": DrinkAndDessert,
  "Cold Foam Refresher": ColdFoamRefresher,
  "Classic Refresher": ClassicRefresher,
  Sauce,
};

interface MenuSectionProps {
  showOrderButton?: boolean;
  /** Heading level for the "menu" title (the Menu page makes it the h1). */
  headingAs?: "h1" | "h2";
}

export default function MenuSection({
  showOrderButton = true,
  headingAs: Heading = "h2",
}: MenuSectionProps) {
  const [activeTab, setActiveTab] = useState("Momo");

  return (
    <section className="w-full bg-taipo-bg-lighter relative overflow-hidden">
      {/* Background texture */}

      <div className="relative z-10 max-w-[821px] mx-auto px-5 py-16 lg:py-[72px]">
        {/* "MENU" heading */}
        <Heading className="text-72 text-taipo uppercase">menu</Heading>
        {/* Main content: two columns */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Right column: category tabs + menu image */}
          <div className="w-full flex flex-col md:flex-row gap-10 justify-center">
            {/* Category tabs */}
            <div className="border-t-2 border-taipo-teal md:py-3 border-b border-taipo-teal/30 min-w-[260px]">
              <div className="flex flex-row md:flex-col gap-x-0 gap-y-4 overflow-x-auto scrollbar-hide md:my-6">
                {MENU_TABS.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`text-18 text-left uppercase whitespace-nowrap p-5 md:py-2 transition-colors ${
                      activeTab === tab
                        ? "text-taipo-teal font-medium bg-[#e0f2f1] md:pl-2"
                        : "text-taipo-text-mid font-normal hover:text-taipo-teal"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-px bg-taipo-teal/30 mb-4 hidden md:block" />

            {/* Menu image */}
            <div className="flex-1 flex justify-center flex-col items-center gap-4 md:gap-0">
              <img
                src={menuImages[activeTab]}
                alt={`${activeTab} menu at Taipo Arlington`}
                loading="lazy"
                decoding="async"
                className="w-full md:h-[608px] object-contain object-top md:-mt-[120px]"
              />
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
        </div>
      </div>
    </section>
  );
}
