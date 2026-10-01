import logo from "@/assets/hero-section-logo.svg";

/** Full-screen teal loader shown while a lazy page chunk downloads. */
export default function PageLoader() {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#00c1b8]"
    >
      <img
        src={logo}
        alt=""
        className="w-[clamp(12rem,30vw,20rem)] h-auto animate-[logo-fade_1.8s_ease-in-out_infinite] motion-reduce:animate-none"
      />
    </div>
  );
}
