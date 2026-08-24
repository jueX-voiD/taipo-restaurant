import { useState } from "react";
import { Link } from "react-router-dom";
import footerLogo from "../assets/icons/Footer-Logo.svg";
import instagramIcon from "../assets/icons/insta.svg";
import BehindTheDoorButton from "./BehindTheDoorButton";
import footerBg from "@/assets/Footer-bg.webp";

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="w-full bg-white relative overflow-hidden">
      <BehindTheDoorButton />

      {/* Background texture */}
      <img
        src={footerBg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-contain sm:object-cover pointer-events-none select-none"
      />

      <div className="relative z-10 flex flex-col items-center">
        {/* Logo + address */}
        <div className="flex flex-col items-center gap-5 pt-[92px] pb-12 px-5 text-center max-w-[500px] mx-auto">
          <Link to="/" aria-label="Taipo Home">
            <img src={footerLogo} alt="Taipo" />
          </Link>
          <div className="text-18">
            <p className="text-18">
              200 E Abram St Suite 140,
              <br />
              Arlington TX 76010
            </p>
            <p className="mt-2">
              <span className="text-18 font-semibold">Phone no: </span>
              <a
                href="tel:4696028318"
                className="text-18 font-semibold text-taipo-teal hover:opacity-80 transition-opacity"
              >
                4696028318
              </a>
            </p>
            <p>
              <span className="text-18 font-semibold">Email: </span>
              <a
                href="mailto:reservation@taiporestaurant.com"
                className="text-18 font-semibold text-taipo-teal hover:opacity-80 transition-opacity"
              >
                reservation@taiporestaurant.com
              </a>
            </p>
          </div>
          <a
            href="https://www.instagram.com/taipoarlington/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-70 transition-opacity"
          >
            <img src={instagramIcon} alt="Instagram" />
          </a>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col items-center gap-8 py-16 px-5 w-full">
          <h3 className="text-40 text-center text-taipo max-w-[250px]">
            Get the <br />
            delicious form us
          </h3>
          <div className="flex flex-col sm:flex-row items-stretch w-full max-w-[462px]">
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-taipo-bg-input text-taipo-text-muted text-18 px-4 py-3 outline-none focus:ring-1 focus:ring-taipo-teal"
            />
            <button className="bg-taipo-teal text-white text-18 text-lg px-6 py-3 hover:bg-taipo-teal-dark transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>

        {/* Legal links */}
        <div className="border-t border-gray-100 w-full py-3 px-5">
          <div className="flex flex-wrap justify-center gap-8 sm:gap-10">
            <span className="font-SofiaPro font-regular text-sm text-gray-500">
              ©All Right Reserved
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
