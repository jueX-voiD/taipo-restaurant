import Seo from "@/components/Seo";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import behindTheDoor from "@/assets/icons/behind-the-dor.svg";
import behindTheDoorVideo from "@/assets/verticle2.mp4";
import behindTheDoorVideoMobile from "@/assets/Hotizontal-bg-video.mp4";
import soundOff from "@/assets/icons/sound_off.png";
import soundWave from "@/assets/icons/sound-wave.gif";
import doorDefault from "@/assets/icons/Door-Button-4.svg";
import doorHover from "@/assets/icons/Door-Button3.svg";
import clock from "@/assets/icons/reservation-clock.svg";
import location from "@/assets/icons/reservation-location.svg";
import phone from "@/assets/icons/reservation-phone.svg";
import email from "@/assets/icons/reservation-email.svg";
import thankyouBg from "@/assets/—Pngtree—round golden luxury mandala border_5960476 1.png";
import arrowLeft from "@/assets/icons/Arrow-left.svg";

type Step = 1 | 2 | 3;

const PARTY_OPTIONS = Array.from({ length: 10 }, (_, i) => ({
  value: String(i + 1),
  label: `${i + 1} ${i + 1 === 1 ? "guest" : "guests"}`,
}));

// Format minutes-from-midnight (may exceed 1440 for after midnight) to "h:mm am/pm".
function formatTime(min: number) {
  const t = min % 1440;
  const h = Math.floor(t / 60);
  const m = t % 60;
  const ampm = h >= 12 ? "pm" : "am";
  let hr = h % 12;
  if (hr === 0) hr = 12;
  return `${hr}:${m.toString().padStart(2, "0")} ${ampm}`;
}

// Booking slots depend on the weekday of the chosen date:
//   Sun–Thu: 5:00 pm → 11:30 pm, Fri–Sat: 5:00 pm → 1:30 am.
//   No date chosen yet → default 5:00 pm → 11:30 pm.
function generateSlots(dateStr: string): string[] {
  let end = 23 * 60 + 30; // 11:30 pm (default)
  if (dateStr) {
    const day = new Date(`${dateStr}T00:00:00`).getDay(); // 0=Sun … 6=Sat
    end = day === 5 || day === 6 ? 25 * 60 + 30 : 23 * 60 + 30; // 1:30 am : 11:30 pm
  }
  const slots: string[] = [];
  for (let min = 17 * 60; min <= end; min += 30) slots.push(formatTime(min));
  return slots;
}

const ChevronIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M12.637 3.26321C12.4682 3.09467 12.2395 3 12.001 3C11.7625 3 11.5337 3.09467 11.365 3.26321L6.26497 8.36321C6.10599 8.53382 6.01944 8.75947 6.02356 8.99264C6.02767 9.2258 6.12212 9.44826 6.28702 9.61315C6.45191 9.77805 6.67438 9.87251 6.90754 9.87662C7.1407 9.88073 7.36636 9.79418 7.53697 9.63521L12.001 5.17121L16.465 9.63521C16.5474 9.72363 16.6467 9.79456 16.7571 9.84375C16.8675 9.89294 16.9867 9.91939 17.1075 9.92152C17.2284 9.92365 17.3484 9.90142 17.4605 9.85616C17.5725 9.81089 17.6743 9.74352 17.7598 9.65805C17.8453 9.57259 17.9126 9.47079 17.9579 9.35873C18.0032 9.24666 18.0254 9.12662 18.0233 9.00578C18.0211 8.88494 17.9947 8.76576 17.9455 8.65536C17.8963 8.54496 17.8254 8.4456 17.737 8.36321L12.637 3.26321ZM17.737 15.6352L12.637 20.7352C12.4682 20.9037 12.2395 20.9984 12.001 20.9984C11.7625 20.9984 11.5337 20.9037 11.365 20.7352L6.26497 15.6352C6.17654 15.5528 6.10562 15.4535 6.05643 15.3431C6.00724 15.2327 5.98079 15.1135 5.97866 14.9926C5.97652 14.8718 5.99875 14.7518 6.04402 14.6397C6.08928 14.5276 6.15666 14.4258 6.24212 14.3404C6.32758 14.2549 6.42938 14.1875 6.54145 14.1423C6.65351 14.097 6.77355 14.0748 6.89439 14.0769C7.01524 14.079 7.13441 14.1055 7.24481 14.1547C7.35521 14.2039 7.45457 14.2748 7.53697 14.3632L12.001 18.8272L16.465 14.3632C16.5474 14.2748 16.6467 14.2039 16.7571 14.1547C16.8675 14.1055 16.9867 14.079 17.1075 14.0769C17.2284 14.0748 17.3484 14.097 17.4605 14.1423C17.5725 14.1875 17.6743 14.2549 17.7598 14.3404C17.8453 14.4258 17.9126 14.5276 17.9579 14.6397C18.0032 14.7518 18.0254 14.8718 18.0233 14.9926C18.0211 15.1135 17.9947 15.2327 17.9455 15.3431C17.8963 15.4535 17.8254 15.5528 17.737 15.6352Z"
      fill="#f0f0f0"
    />
  </svg>
);

const ArrowLeftSmall = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M11.2542 21.3684L2.07 12.1842L11.2542 3L12.1326 3.8784L4.45145 11.5596L22 11.5596V12.8088L4.45145 12.8088L12.1326 20.49L11.2542 21.3684Z"
      fill="#A47C55"
    />
  </svg>
);

const ArrowRightSmall = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M12.7458 21.3684L21.93 12.1842L12.7458 3L11.8674 3.8784L19.5485 11.5596L2 11.5596L2 12.8088L19.5485 12.8088L11.8674 20.49L12.7458 21.3684Z"
      fill="#A47C55"
    />
  </svg>
);

const ContactInfo = () => (
  <div className="flex flex-col gap-5 md:mt-16">
    <div className="flex items-start gap-3">
      <div className="shrink-0">
        <img src={clock} />
      </div>
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="text-restaurant-text text-18">Opening times</span>
        <div className="text-18 text-white">
          Sunday - Thursday: <span className="text-gold">5 pm to 12 am</span>
          <br />
          Friday - Saturday: <span className="text-gold">5 pm to 2 am</span>
        </div>
      </div>
    </div>

    <div className="flex items-start gap-3">
      <div className="shrink-0">
        <img src={location} />
      </div>
      <span className="text-restaurant-text text-18">
        200 E Abram St Suite 140,
        <br />
        Arlington TX 76010
      </span>
    </div>

    <div className="flex items-start gap-3">
      <div className="shrink-0">
        <img src={phone} alt="Phone" />
      </div>
      <a
        href="tel:+14696028318"
        className="text-restaurant-text text-18 hover:text-taipo transition-colors"
      >
        +1 469 602 8318
      </a>
    </div>

    <div className="flex items-start gap-3">
      <div className="shrink-0">
        <img src={email} alt="Email" />
      </div>
      <span className="text-restaurant-text text-18 break-all">
        For private events, special occasions or large parties:
        <br />
        <a
          href="mailto:reservations@taiporestaurants.com"
          className="hover:text-taipo transition-colors"
        >
          reservations@taiporestaurants.com
        </a>
      </span>
    </div>
  </div>
);

interface FormInputProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  showChevron?: boolean;
  as?: "input" | "textarea" | "select";
  options?: { value: string; label: string }[];
  min?: string;
  max?: string;
  prefix?: string;
  readOnly?: boolean;
}

const FormInput = ({
  label,
  value,
  onChange,
  placeholder = "",
  type = "text",
  showChevron = false,
  as = "input",
  options = [],
  min,
  max,
  prefix,
  readOnly = false,
}: FormInputProps) => (
  <div className="flex flex-col gap-2 w-full min-w-0">
    <div className="px-1">
      <span className="text-gold text-18">{label}</span>
    </div>
    <div className="flex items-center gap-1 bg-restaurant-card px-5 py-3.5 min-w-0">
      {as === "textarea" ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          className="flex-1 bg-transparent placeholder-restaurant-placeholder text-18 outline-none resize-none"
          style={{ color: value ? "#DFE3E3" : undefined }}
        />
      ) : as === "select" ? (
        <>
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 min-w-0 bg-transparent text-18 outline-none appearance-none cursor-pointer"
            style={{ color: value ? "#DFE3E3" : "#565656" }}
          >
            <option value="" disabled className="bg-[#202020]">
              {placeholder}
            </option>
            {options.map((o) => (
              <option
                key={o.value}
                value={o.value}
                className="bg-[#202020] text-white"
              >
                {o.label}
              </option>
            ))}
          </select>
          <span className="shrink-0 pointer-events-none">
            <ChevronIcon />
          </span>
        </>
      ) : (
        <>
          {prefix && (
            <span className="shrink-0 text-18" style={{ color: "#DFE3E3" }}>
              {prefix}
            </span>
          )}
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            min={min}
            max={max}
            readOnly={readOnly}
            className="flex-1 min-w-0 bg-transparent text-18 outline-none"
            style={{
              color: value ? "#DFE3E3" : "#565656",
              colorScheme: "dark",
            }}
          />
          {showChevron && (
            <span className="shrink-0">
              <ChevronIcon />
            </span>
          )}
        </>
      )}
    </div>
  </div>
);

interface Step1Props {
  partySize: string;
  setPartySize: (v: string) => void;
  date: string;
  setDate: (v: string) => void;
  bookingTime: string;
  setBookingTime: (v: string) => void;
  slots: string[];
  today: string;
  onNext: () => void;
}

const Step1Form = ({
  partySize,
  setPartySize,
  date,
  setDate,
  bookingTime,
  setBookingTime,
  slots,
  today,
  onNext,
}: Step1Props) => {
  const isValid = partySize !== "" && date !== "" && bookingTime !== "";

  return (
    <div className="flex flex-col gap-7">
      <h2 className="text-white text-32 font-KarmeHandwritten text-center lg:text-left">
        Online Reservation
      </h2>

      <div className="flex flex-col gap-7">
        <div className="flex flex-row gap-3 sm:gap-5">
          <FormInput
            as="select"
            label="Party Size"
            value={partySize}
            onChange={setPartySize}
            placeholder="Select guests"
            options={PARTY_OPTIONS}
          />
          <FormInput
            type="date"
            label="Date of reservation"
            value={date}
            onChange={setDate}
            min={today}
            placeholder="Select date"
          />
        </div>

        <div className="flex flex-col gap-6">
          <FormInput
            label="Booking time"
            value={bookingTime}
            onChange={() => {}}
            readOnly
            placeholder="5:00 pm"
          />

          <div className="flex flex-wrap gap-2.5">
            {slots.map((t) => (
              <button
                key={t}
                onClick={() => setBookingTime(t)}
                className={cn(
                  "px-5 py-2.5 rounded-full text-[13px] font-SofiaPro leading-4 transition-all",
                  bookingTime === t
                    ? "bg-gold text-black cursor-pointer"
                    : "border border-gold-light text-gold-light cursor-pointer hover:bg-gold/10",
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 pt-2">
        <div className="h-px bg-restaurant-divider" />
        <div className="flex items-center justify-between">
          <button
            disabled
            className="flex items-center gap-3 px-8 py-3 rounded-full bg-restaurant-dark opacity-30 cursor-not-allowed"
          >
            <ArrowLeftSmall />
            <span className="text-white text-20 leading-6">Back</span>
          </button>
          <button
            onClick={onNext}
            disabled={!isValid}
            className={cn(
              "flex items-center gap-3 px-8 py-3 rounded-full bg-restaurant-dark transition-colors",
              isValid
                ? "hover:bg-[#2a2a2a] cursor-pointer"
                : "opacity-40 cursor-not-allowed",
            )}
          >
            <span className="text-gold text-20 ">Next</span>
            <ArrowRightSmall />
          </button>
        </div>
      </div>
    </div>
  );
};

interface Step2Props {
  name: string;
  setName: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  specialRequests: string;
  setSpecialRequests: (v: string) => void;
  onBack: () => void;
  onNext: () => void;
  submitting: boolean;
  error: string | null;
}

const Step2Form = ({
  name,
  setName,
  email,
  setEmail,
  phone,
  setPhone,
  specialRequests,
  setSpecialRequests,
  onBack,
  onNext,
  submitting,
  error,
}: Step2Props) => {
  const isValid = name.trim() !== "" && phone.replace(/\D/g, "").length === 10;

  return (
    <div className="flex flex-col gap-7">
      <h2 className="text-white text-18 pl-10 lg:pl-0">Your Details</h2>

      <div className="flex flex-col gap-5">
        <div className="flex flex-row gap-3 sm:gap-5">
          <FormInput
            label="Full Name"
            value={name}
            onChange={setName}
            placeholder="John Doe"
          />
          <FormInput
            label="Phone Number"
            value={phone}
            onChange={(v) => setPhone(v.replace(/\D/g, "").slice(0, 10))}
            placeholder="4696028318"
            type="tel"
            prefix="+1"
          />
        </div>
        <FormInput
          label="Email Address"
          value={email}
          onChange={setEmail}
          placeholder="john@example.com"
          type="email"
        />
        <FormInput
          label="Special Requests"
          value={specialRequests}
          onChange={setSpecialRequests}
          placeholder="Dietary requirements, celebrations, seating preferences..."
          as="textarea"
        />
      </div>

      <div className="flex flex-col gap-4 pt-2">
        {error && (
          <p className="text-[#E2786E] text-base" role="alert">
            {error}
          </p>
        )}
        <div className="h-px bg-restaurant-divider" />
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            disabled={submitting}
            className="flex items-center gap-3 px-8 py-3 rounded-full bg-restaurant-dark hover:bg-[#2a2a2a] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ArrowLeftSmall />
            <span className="text-white ">Back</span>
          </button>
          <button
            onClick={onNext}
            disabled={!isValid || submitting}
            className={cn(
              "flex items-center gap-3 px-8 py-3 rounded-full bg-gold transition-colors",
              isValid && !submitting
                ? "hover:bg-gold/90 cursor-pointer"
                : "opacity-40 cursor-not-allowed",
            )}
          >
            <span className="text-black text-18">
              {submitting ? "Sending..." : "Confirm"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

interface ThankYouProps {
  partySize: string;
  date: string;
  time: string;
  onClose: () => void;
}

const ThankYou = ({ partySize, date, time, onClose }: ThankYouProps) => {
  const formattedDate = (() => {
    if (!date) return "";
    const d = new Date(`${date}T00:00:00`);
    return isNaN(d.getTime())
      ? date
      : d.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
  })();

  const guests = partySize.replace(/[^0-9]/g, "") || "4";
  // thank you section
  return (
    <div className="flex flex-col items-center justify-center gap-5 py-8 h-full relative">
      <div
        className="absolute inset-0  pointer-events-none overflow-hidden"
        aria-hidden
      >
        <img
          src={thankyouBg}
          alt=""
          className="w-full h-full object-contain
           object-center opacity-90"
          style={{ mixBlendMode: "screen" }}
        />
      </div>

      <div className="relative flex flex-col items-center gap-2 text-center">
        <h2 className="text-gold text-32 font-KarmeHandwritten">Thank you</h2>
        <p className="text-[#D6D6D6] text-20">Your booking has confirmed</p>
      </div>

      <div className="relative text-gold text-18 text-center">
        <p>{guests}-Guests</p>
        <p>{formattedDate}</p>
        <p>{time}</p>
      </div>

      <button
        onClick={onClose}
        className="relative mt-4 px-8 py-3 rounded-full border border-gold text-gold hover:bg-gold hover:text-black transition-colors text-181"
      >
        Done
      </button>
    </div>
  );
};

function ReservationModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<Step>(1);
  const [partySize, setPartySize] = useState("");
  const [date, setDate] = useState("");
  const [bookingTime, setBookingTime] = useState("5:00 pm");
  const [slots, setSlots] = useState<string[]>(() => generateSlots(""));
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Local "today" (yyyy-mm-dd) so past dates can't be picked.
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

  // Regenerate slots whenever the date changes; reset to the default 5:00 pm.
  useEffect(() => {
    setSlots(generateSlots(date));
    setBookingTime("5:00 pm");
  }, [date]);

  // Submit the reservation to the backend, then advance to the thank-you step.
  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          partySize,
          date,
          bookingTime,
          name,
          phone,
          email,
          specialRequests,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Could not send your reservation.");
      }
      setStep(3);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }}
    >
      <div
        className="flex min-h-full items-center justify-center p-4 md:p-6"
        onClick={(e) => e.target === e.currentTarget && step !== 3 && onClose()}
      >
        <div
          className="relative w-full max-w-[1200px]"
          style={{ background: "#202020" }}
        >
          {/* Paper texture layer */}
          <div
            className="absolute inset-0 pointer-events-none overflow-hidden"
            aria-hidden
          >
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/9f1d693ca62bc4c0dd43731d039a03609d7310ee?width=4169"
              alt=""
              className="absolute w-full h-full object-cover opacity-20 -rotate-90"
              style={{ mixBlendMode: "plus-darker" }}
            />
            <div className="absolute inset-0 bg-[#121212]/70" />
          </div>

          <div className="relative flex flex-col-reverse lg:flex-row min-h-0 ">
            {/* Left panel */}
            <div className="w-full lg:w-[508px] lg:min-w-[370px] flex flex-col gap-8 p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-restaurant-divider/40 ">
              <button
                onClick={onClose}
                className="self-start flex items-center justify-center w-12 h-12 rounded-full absolute left-5 top-5 z-10"
                style={{ background: "#1C1C1C" }}
                title="Close"
              >
                <img src={arrowLeft} />
              </button>

              <ContactInfo />
            </div>

            {/* Right panel */}
            <div className="flex-1 flex flex-col p-8 md:p-12 relative">
              {step === 3 && (
                <div
                  className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden"
                  aria-hidden
                >
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/12219a1a5a4796cd5bb71f35e2720528e9209580?width=1722"
                    alt=""
                    className="w-full h-full object-contain object-center scale-110"
                    style={{ mixBlendMode: "screen" }}
                  />
                </div>
              )}

              {step === 1 && (
                <Step1Form
                  partySize={partySize}
                  setPartySize={setPartySize}
                  date={date}
                  setDate={setDate}
                  bookingTime={bookingTime}
                  setBookingTime={setBookingTime}
                  slots={slots}
                  today={today}
                  onNext={() => setStep(2)}
                />
              )}

              {step === 2 && (
                <Step2Form
                  name={name}
                  setName={setName}
                  email={email}
                  setEmail={setEmail}
                  phone={phone}
                  setPhone={setPhone}
                  specialRequests={specialRequests}
                  setSpecialRequests={setSpecialRequests}
                  onBack={() => setStep(1)}
                  onNext={handleSubmit}
                  submitting={submitting}
                  error={error}
                />
              )}

              {step === 3 && (
                <ThankYou
                  partySize={partySize}
                  date={date}
                  time={bookingTime}
                  onClose={onClose}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Reservation() {
  const [isMuted, setIsMuted] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Use the horizontal video on phones (below the `sm` breakpoint = 640px).
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Keep the muted state in sync (also re-apply when the source swaps).
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted, isMobile]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#131313]">
      <Seo
        title="Taipo - Behind the Door contact for reservation"
        description="Contact for taipo's behind the door fine dining experience."
        path="/reservations/"
        image="https://www.taiporestaurants.com/wp-content/uploads/2024/01/Taipo-Behind-the-Door.webp"
      />
      {/* Background video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        src={isMobile ? behindTheDoorVideoMobile : behindTheDoorVideo}
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, rgba(19,19,19,0) 0%, #000 100%)",
        }}
      />

      {/* Logo (top center) */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 z-10">
        <Link to="/" aria-label="Taipo Home">
          <img src={behindTheDoor} alt="Taipo" />
        </Link>
      </div>

      {/* Bottom center: tagline + reserve button */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-6 w-full max-w-lg px-5">
        <p className="text-center text-18 text-[#A47C55]">
          You can reserve a table for your gathering and events here by
          submitting some info about.....
        </p>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-5 px-8 py-2.5 rounded-full transition-all hover:opacity-90 active:scale-95"
          style={{ background: "#202020" }}
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M42 30C42 20.75 34.986 13.118 26 12.118V8H22V12.118C13.014 13.118 6 20.75 6 30V34H42V30ZM4 36H44V40H4V36Z"
              fill="#A47C55"
            />
          </svg>
          <span className="text-white font-18 font-KarmeHandwritten">
            Reserve A Table
          </span>
        </button>
      </div>

      {/* Sound on/off — fixed, 20px above the Taipo button */}
      <button
        onClick={() => setIsMuted((prev) => !prev)}
        className="fixed right-[5vw] bottom-[calc(10vh+80px)] z-10 w-16 h-16 rounded-full flex items-center justify-center transition-all hover:opacity-80 active:scale-95 cursor-pointer"
        style={{ background: "#202020" }}
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        <img
          src={isMuted ? soundOff : soundWave}
          alt={isMuted ? "Sound off" : "Sound on"}
          className="w-8 h-8 object-contain"
        />
      </button>

      {/* Taipo behind the door — fixed hover-expanding button */}
      <Link
        to="/"
        className="group fixed right-[5vw] bottom-[10vh] z-10 inline-block"
      >
        <div className="flex items-center h-[60px] w-[60px] md:group-hover:w-[130px] overflow-hidden bg-[#A47C55] rounded-[50px] shadow-[0px_10px_10px_rgba(0,0,0,0.1)] transition-all duration-500 ease-out md:group-hover:duration-300">
          {/* Spacer where the door icon sits */}
          <div className="w-[60px] shrink-0" />
          <span className="text-white font-KarmeHandwritten text-base leading-[60px] whitespace-nowrap">
            Taipo
          </span>
        </div>

        {/* Door icon — swaps on hover */}
        <img
          src={doorDefault}
          alt=""
          className="absolute top-[-8px] left-[6px] transition-opacity duration-300 md:group-hover:opacity-0"
        />
        <img
          src={doorHover}
          alt=""
          className="absolute top-[-8px] left-[6px] opacity-0 transition-opacity duration-300 md:group-hover:opacity-100"
        />
      </Link>

      {/* Reservation Modal */}
      {modalOpen && <ReservationModal onClose={() => setModalOpen(false)} />}
    </div>
  );
}
