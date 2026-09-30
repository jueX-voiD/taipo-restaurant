import { cn } from "@/lib/utils";

export default function LocationSection({ className }: { className?: string }) {
  return (
    <section
      className={cn("bg-[var(--primary)] py-[80px] md:pt-[160px]", className)}
    >
      <div className="max-w-[1240px] mx-auto px-5">
        <h2 className="text-72 text-center uppercase text-[var(--white)]">
          Our location
        </h2>

        <div className="flex flex-col gap-9 mt-[64px]">
          {/* Map */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7982.274578064961!2d-97.11149178813396!3d32.73565787790121!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864e7d70e8e8757f%3A0xbe17a14e5e18536a!2s200%20E%20Abram%20St%20%23140%2C%20Arlington%2C%20TX%2076010%2C%20USA!5e0!3m2!1sen!2snp!4v1704487153617!5m2!1sen!2snp"
            className="w-full h-[250px] md:h-[376px] border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Our Location"
          />

          {/* Info cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {/* Opening Hours Card */}
            <div className="relative border border-white p-3">
              <div className="relative  bg-white flex flex-col items-center justify-center py-12 px-6 text-center  h-full">
                <h3 className="text-32 !font-carla uppercase text-taipo">
                  Opening Hours
                </h3>
                <p className="text-20 mt-3">
                  <span className="text-taipo">11am</span>
                  <span className="text-taipo-dark-text"> to </span>
                  <span className="text-taipo">12am</span>
                  <span className="text-taipo-dark-text"> Sun – Thu </span>
                </p>
                <p className="text-20">
                  <span className="text-taipo">11am</span>
                  <span className="text-taipo-dark-text"> to </span>
                  <span className="text-taipo">2am</span>
                  <span className="text-taipo-dark-text"> Fri – Sat </span>
                </p>
              </div>
            </div>

            {/* Location Card */}
            <div className="relative border border-white p-3">
              <div className="relative  bg-white flex flex-col items-center justify-center py-12 px-6 text-center gap-3">
                <h3 className="text-32 !font-carla uppercase text-taipo">
                  Location
                </h3>
                <p className="text-20 text-[#09625D]">
                  200 E Abram St Suite 140, <br />
                  Arlington TX 76010
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
