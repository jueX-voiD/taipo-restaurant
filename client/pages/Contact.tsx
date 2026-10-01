import { useState } from "react";
import Seo from "@/components/Seo";
import LocationSection from "@/components/LocationSection";
import location from "@/assets/icons/location.svg";
import phone from "@/assets/icons/phone.svg";
import email from "@/assets/icons/email.svg";
import contact from "@/assets/contact.png";

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message ?? "Unknown error");
      }

      alert(data.message ?? "Your message has been sent!");
      // Reset the form after a successful submit
      setFormData({ fullName: "", email: "", phone: "", message: "" });
    } catch (err: any) {
      console.error(err);
      alert(
        err?.message ?? "Network or server error – please try again later.",
      );
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <Seo path="/contact-us/" />
      <section className="flex-1">
        {/* Contact Section */}
        <div className="bg-taipo-light py-14 md:py-20">
          <div className="max-w-[1200px] mx-auto px-5 flex flex-col lg:flex-row gap-12 justify-between">
            {/* Left Column: Info */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-row lg:flex-col gap-3 justify-between">
                <div>
                  <h1 className="text-72 uppercase">CONTACT US</h1>

                  <p className="text-taipo-dark text-18 max-w-[440px] mb-5">
                    Have a question or just want to share some feedback? The
                    Taipo team are here to help!
                  </p>

                  <div className="flex flex-col gap-5">
                    <div className="flex items-start gap-3">
                      <img src={location} alt="" />
                      <span className="text-taipo-dark text-18 ">
                        200 E Abram St Suite 140,
                        <br />
                        Arlington TX 76010
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <img src={phone} alt="" />
                      <a
                        href="tel:4696028318"
                        className="text-taipo-dark text-18 hover:text-taipo-teal transition-colors"
                      >
                        4696028318
                      </a>
                    </div>
                    <div className="flex items-start gap-3">
                      <img src={email} alt="" />
                      <a
                        href="mailto:reservation@taiporestaurant.com"
                        className="text-taipo-dark text-18 hover:text-taipo-teal transition-colors"
                      >
                        reservation@taiporestaurant.com
                      </a>
                    </div>
                  </div>
                </div>

                {/* Food Image */}
                <div className="mt-6 overflow-hidden rounded-full self-start hidden sm:block">
                  <img
                    src={contact}
                    alt="Taipo Nepali dish"
                    loading="lazy"
                    className="w-full h-full object-cover animate-[spin_30s_linear_infinite]"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="lg:w-[55%]">
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                {/* Full Name */}
                <div className="flex flex-col gap-2">
                  <label className="font-SofiaPro text-18 text-taipo-dark  font-medium ">
                    Full name
                  </label>
                  <input
                    type="text"
                    placeholder="Your Name Here"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className="w-full bg-taipo-bg-input px-5 py-[14px] font-SofiaPro text-18 text-taipo-dark placeholder:text-taipo-text-muted outline-none focus:ring-2 focus:ring-taipo-teal/40"
                  />
                </div>

                {/* Email + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className=" text-taipo-dark font-SofiaPro text-18 font-medium leading-[26px]">
                      Email ID
                    </label>
                    <input
                      type="email"
                      placeholder="yourname@email.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full bg-taipo-bg-input px-5 py-[14px] font-SofiaPro text-18 text-taipo-dark placeholder:text-taipo-text-muted outline-none focus:ring-2 focus:ring-taipo-teal/40"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className=" text-taipo-dark font-SofiaPro text-18 font-medium leading-[26px]">
                      Phone number
                    </label>
                    <input
                      type="tel"
                      placeholder="9800000000"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full bg-taipo-bg-input px-5 py-[14px] font-SofiaPro text-18 text-taipo-dark placeholder:text-taipo-text-muted outline-none focus:ring-2 focus:ring-taipo-teal/40"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label className="font-SofiaPro text-18 text-taipo-dark  font-medium">
                    Message
                  </label>
                  <textarea
                    placeholder="Write your message from here....."
                    maxLength={300}
                    rows={7}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full bg-taipo-bg-input px-5 py-[14px] font-SofiaPro text-18 text-taipo-dark placeholder:text-taipo-text-muted outline-none focus:ring-2 focus:ring-taipo-teal/40 resize-none"
                  />
                  <div className="text-right font-SofiaPro text-18 text-taipo-text-muted">
                    {formData.message.length} of 300 characters
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="bg-taipo-teal text-white font-SofiaPro text-[20px] font-medium py-[14px] px-8 w-full sm:w-[260px] hover:bg-taipo-teal-dark transition-colors"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* OUR LOCATION */}
      <section className="bg-taipo-light py-[80px] md:pt-[160px]">
        <div className="max-w-[1240px] mx-auto px-5">
          <h2 className="text-72 text-center uppercase text-[var(--primary)]">
            Our location
          </h2>

          <div className="flex flex-col gap-9 mt-[64px]">
            {/* Map */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7982.274578064961!2d-97.11149178813396!3d32.73565787790121!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864e7d70e8e8757f%3A0xbe17a14e5e18536a!2s200%20E%20Abram%20St%20%23140%2C%20Arlington%2C%20TX%2076010%2C%20USA!5e0!3m2!1sen!2snp!4v1704487153617!5m2!1sen!2snp"
              className="w-full h-[250px] md:h-[376px] border-0"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              title="Our Location"
            />

            {/* Info cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
              {/* Opening Hours Card */}
              <div className="relative border border-[#E8F6F5] p-3">
                <div className="relative  bg-[#E8F6F5] flex flex-col items-center justify-center py-12 px-6 text-center  h-full">
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
              <div className="relative border border-[#E8F6F5] p-3">
                <div className="relative  bg-[#E8F6F5] flex flex-col items-center justify-center py-12 px-6 text-center gap-3">
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
    </div>
  );
}
