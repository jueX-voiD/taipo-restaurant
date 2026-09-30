import { Link } from "react-router-dom";
import doorClosed from "@/assets/icons/Door-Button1.svg";
import doorOpen from "@/assets/icons/Door-btn-open-flatside.svg";

export default function BehindTheDoorButton() {
  return (
    <Link
      to="/reservations"
      aria-label="Taipo Behind The Door"
      className="group fixed right-[5vw] bottom-[10vh] z-40 inline-block"
    >
      <div className="flex items-center h-[60px] w-[60px] md:group-hover:w-[250px] overflow-hidden bg-[#ACF6F3] rounded-[50px] shadow-[0px_10px_10px_rgba(0,0,0,0.1)] transition-all duration-500 ease-out md:group-hover:duration-300">
        {/* Spacer where the door icon sits */}
        <div className="w-[60px] shrink-0" />
        <span className="text-black font-KarmeHandwritten text-base leading-[60px] whitespace-nowrap">
          Taipo Behind The Door
        </span>
      </div>

      {/* Door icon — swaps on hover (with the ~220ms delay from the original) */}
      <img
        src={doorClosed}
        alt=""
        className="absolute top-[-7px] left-[5px] transition-opacity duration-300 delay-200 md:group-hover:opacity-0"
      />
      <img
        src={doorOpen}
        alt=""
        className="absolute top-[-7px] left-[5px] opacity-0 transition-opacity duration-300 delay-200 md:group-hover:opacity-100"
      />
    </Link>
  );
}
