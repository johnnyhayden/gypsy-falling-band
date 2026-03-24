"use client";

import { useState } from "react";
import { eventTypes } from "@/lib/data";

export default function BookingForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    venue: "",
    eventType: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Booking inquiry:", formData);
    setSubmitted(true);
  };

  const inputClasses =
    "w-full bg-noir-800 border border-noir-700 text-cream placeholder:text-noir-200 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 focus:outline-none rounded px-4 py-3 font-body text-base transition-colors duration-300";

  return (
    <section id="booking" className="bg-noir-950 py-24 md:py-32 relative">
      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 divider-gold" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          {/* Left column — info */}
          <div>
            <p className="text-gold-400 text-sm tracking-[0.3em] uppercase font-body font-medium mb-4">
              Get in Touch
            </p>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-cream mb-8">
              Book the <span className="text-gold-400">Band</span>
            </h2>

            <p className="font-body text-lg text-cream/70 leading-relaxed mb-6">
              Whether it&apos;s a festival stage, a wedding reception, a
              corporate gala, or a Saturday night at your favorite venue — Gypsy
              Falling Band brings the full arena-rock experience to any event.
            </p>

            <p className="font-body text-base text-cream/50 leading-relaxed mb-10">
              Fill out the form and we&apos;ll get back to you within 48 hours.
              For immediate inquiries, email us directly at{" "}
              <a
                href="mailto:johnnyhayden+pettynicks@gmail.com"
                className="text-gold-400 hover:text-gold-300 transition-colors underline underline-offset-4"
              >
                johnnyhayden+pettynicks@gmail.com
              </a>
            </p>

            {/* EPK Download */}
            <div className="p-6 bg-noir-800/50 border border-noir-700 rounded-lg">
              <p className="font-heading text-lg text-cream mb-2">
                Electronic Press Kit
              </p>
              <p className="font-body text-sm text-cream/50 mb-4">
                For festival bookers and corporate talent buyers — everything
                you need in one page.
              </p>
              <a
                href="/gypsy-falling-epk.pdf"
                download="Gypsy-Falling-Band-EPK.pdf"
                className="inline-flex items-center gap-2 border border-gold-500/60 text-gold-400 hover:bg-gold-500/10 hover:border-gold-500 px-6 py-3 rounded font-body font-medium text-sm tracking-wide transition-all duration-300"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Download EPK (PDF)
              </a>
            </div>
          </div>

          {/* Right column — form */}
          <div>
            {submitted ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gold-500/20 border-2 border-gold-400 flex items-center justify-center mx-auto mb-6">
                    <svg
                      className="w-8 h-8 text-gold-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="font-heading text-3xl text-cream mb-4">
                    Thank You!
                  </h3>
                  <p className="font-body text-cream/60 max-w-sm">
                    We&apos;ve received your inquiry and will be in touch within
                    48 hours. Rock and roll!
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        date: "",
                        venue: "",
                        eventType: "",
                        message: "",
                      });
                    }}
                    className="mt-6 text-gold-400 hover:text-gold-300 font-body text-sm underline underline-offset-4 transition-colors"
                  >
                    Submit another inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-body text-sm text-cream/60 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Full name"
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label className="block font-body text-sm text-cream/60 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className={inputClasses}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-body text-sm text-cream/60 mb-2">
                      Event Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label className="block font-body text-sm text-cream/60 mb-2">
                      Venue / Location
                    </label>
                    <input
                      type="text"
                      name="venue"
                      value={formData.venue}
                      onChange={handleChange}
                      placeholder="Venue name or city"
                      className={inputClasses}
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-body text-sm text-cream/60 mb-2">
                    Event Type
                  </label>
                  <select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    className={`${inputClasses} appearance-none`}
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%23d4a017' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 16px center",
                    }}
                  >
                    <option value="" className="bg-noir-800">
                      Select event type
                    </option>
                    {eventTypes.map((type) => (
                      <option key={type} value={type} className="bg-noir-800">
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-body text-sm text-cream/60 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your event..."
                    className={`${inputClasses} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gold-500 text-noir-950 font-body font-bold text-base tracking-wide px-10 py-4 rounded transition-all duration-300 hover:bg-gold-400 hover:shadow-[0_0_30px_rgba(184,134,11,0.3)] mt-2"
                >
                  Send Inquiry
                </button>

                <p className="font-body text-xs text-cream/30 text-center">
                  We typically respond within 48 hours.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
