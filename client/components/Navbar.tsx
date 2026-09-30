import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLenis } from "lenis/react";
import { cn } from "@/lib/utils";
import logo from "@/assets/icons/Header-logo.svg";
import headerBg from "@/assets/Header-bg.webp";

const navLinks = [
  { label: "Menu", to: "/menu" },
  { label: "About", to: "/about-us" },
  { label: "Order Online", to: "/order-now" },
  { label: "Contact", to: "/contact-us" },
  { label: "Taipo - Behind the Door", to: "/reservations" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const lenis = useLenis();

  // Lock page scroll while the full-screen menu is open.
  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
    return () => lenis?.start();
  }, [open, lenis]);

  return (
    <>
      <header className="w-full bg-taipo-teal sticky top-0 z-50">
        <div className="relative flex items-center justify-between h-20 max-w-[1200px] mx-auto px-5">
          {/* Left nav links */}
          <nav className=" items-center gap-8 sm:flex hidden">
            <Link
              to="/menu"
              className="text-18 text-white hover:opacity-80 transition-opacity"
            >
              Menu
            </Link>
            <Link
              to="/order-now"
              className="text-18 text-white hover:opacity-80 transition-opacity"
            >
              Order Now
            </Link>
          </nav>

          {/* Center logo */}
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
            <Link to="/" aria-label="Taipo Home" onClick={() => setOpen(false)}>
              <img src={logo} alt="Taipo" />
            </Link>
          </div>
        </div>
        {/* White divider */}
        <div className="w-full h-px bg-white opacity-60" />
      </header>

      {/* Burger / cross button — always above the overlay */}
      <div className="fixed top-0 left-0 w-full h-20 z-[120] pointer-events-none">
        <div className="max-w-[1240px] mx-auto px-5 h-full flex items-center justify-end">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="pointer-events-auto cursor-pointer hover:opacity-80 transition-opacity"
          >
            <span className="relative block h-5 w-[34px]">
              <span
                className="absolute left-0 top-0 block h-[2px] w-[28px] bg-white origin-center transition-all duration-200"
                style={{ opacity: open ? 0 : 1 }}
              />
              <span
                className="absolute left-0 top-0 block h-[2px] w-[28px] bg-white origin-center transition-all duration-300"
                style={{
                  transform: open
                    ? "translateY(6px) rotate(45deg)"
                    : "translateY(6px)",
                }}
              />
              <span
                className="absolute left-0 top-0 block h-[2px] w-[28px] bg-white origin-center transition-all duration-300"
                style={{
                  transform: open
                    ? "translateY(6px) rotate(-45deg)"
                    : "translateY(12px)",
                }}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Full-screen overlay menu */}
      <div
        className={cn(
          "fixed inset-0 z-[100] h-screen w-full bg-taipo-teal flex flex-col items-center justify-center gap-8 transition-all duration-500 ease-out",
          open
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none invisible",
        )}
      >
        <img
          src={headerBg}
          className="absolute object-cover w-full h-full z-20"
        />
        <Link
          to="/"
          aria-label="Taipo Home"
          onClick={() => setOpen(false)}
          className="mb-20"
        >
          <img src={logo} alt="Taipo" className="w-[191px]" />
        </Link>

        <nav className="flex flex-col items-center gap-11">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              onClick={() => setOpen(false)}
              className="text-32 font-carla uppercase pb-1 text-white border-b border-transparent hover:border-taipo-dark hover:text-taipo-dark transition-all duration-300 z-50 "
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
