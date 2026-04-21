import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function LocationMap() {
  return (
    <section style={{ backgroundColor: "oklch(0.18 0.05 160)" }}>
      <div className="container py-16">
        {/* Section header */}
        <div className="text-center mb-10 reveal">
          <div className="section-divider justify-center mb-4">
            <span
              className="section-divider-label"
              style={{ color: "oklch(0.80 0.10 65)" }}
            >
              Find Us
            </span>
          </div>
          <h2
            className="text-3xl md:text-4xl font-bold text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Serving Clark County, WA
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch reveal">
          {/* Map embed */}
          <div className="rounded-2xl overflow-hidden" style={{ minHeight: "360px" }}>
            <iframe
              title="Handy Pioneers Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2793.4!2d-122.5!3d45.59!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5495a5e0e7a0b0b1%3A0x0!2s808+SE+Chkalov+Dr+%233-433%2C+Vancouver%2C+WA+98683!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus&q=808+SE+Chkalov+Dr+%233-433,+Vancouver,+WA+98683"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "360px", display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Address & info card */}
          <div
            className="rounded-2xl p-8 flex flex-col justify-between"
            style={{ backgroundColor: "oklch(0.22 0.07 160)" }}
          >
            <div>
              <h3
                className="text-xl font-bold text-white mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Handy Pioneers
              </h3>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-none mt-0.5"
                    style={{ backgroundColor: "oklch(0.32 0.07 160)" }}
                  >
                    <MapPin size={16} style={{ color: "oklch(0.65 0.14 65)" }} />
                  </div>
                  <div>
                    <p
                      className="text-sm font-semibold text-white mb-0.5"
                      style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                    >
                      Mailing Address
                    </p>
                    <a
                      href="https://maps.google.com/?q=808+SE+Chkalov+Dr+%233-433,+Vancouver,+WA+98683"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm hover:opacity-80 transition-opacity"
                      style={{ color: "rgba(255,255,255,0.70)", fontFamily: "'Source Sans 3', sans-serif" }}
                    >
                      808 SE Chkalov Dr #3-433<br />
                      Vancouver, WA 98683
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-none"
                    style={{ backgroundColor: "oklch(0.32 0.07 160)" }}
                  >
                    <Phone size={16} style={{ color: "oklch(0.65 0.14 65)" }} />
                  </div>
                  <div>
                    <p
                      className="text-sm font-semibold text-white mb-0.5"
                      style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                    >
                      Phone
                    </p>
                    <a
                      href="tel:+13605449858"
                      className="text-sm hover:opacity-80 transition-opacity"
                      style={{ color: "rgba(255,255,255,0.70)", fontFamily: "'Source Sans 3', sans-serif" }}
                    >
                      (360) 544-9858
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-none"
                    style={{ backgroundColor: "oklch(0.32 0.07 160)" }}
                  >
                    <Mail size={16} style={{ color: "oklch(0.65 0.14 65)" }} />
                  </div>
                  <div>
                    <p
                      className="text-sm font-semibold text-white mb-0.5"
                      style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                    >
                      Email
                    </p>
                    <a
                      href="mailto:help@handypioneers.com"
                      className="text-sm hover:opacity-80 transition-opacity"
                      style={{ color: "rgba(255,255,255,0.70)", fontFamily: "'Source Sans 3', sans-serif" }}
                    >
                      help@handypioneers.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-none"
                    style={{ backgroundColor: "oklch(0.32 0.07 160)" }}
                  >
                    <Clock size={16} style={{ color: "oklch(0.65 0.14 65)" }} />
                  </div>
                  <div>
                    <p
                      className="text-sm font-semibold text-white mb-0.5"
                      style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                    >
                      Hours
                    </p>
                    <p
                      className="text-sm"
                      style={{ color: "rgba(255,255,255,0.70)", fontFamily: "'Source Sans 3', sans-serif" }}
                    >
                      Mon – Fri: 8:00 AM – 6:00 PM<br />
                      Sat: By appointment
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button
              className="hcp-button w-full mt-8"
              onClick={() => (window as any).HCPWidget?.openModal()}
            >
              Request Complimentary Estimate
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
