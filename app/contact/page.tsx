export const metadata = { title: "Contact — Primus FC" };
import WhatsAppContactForm from "@/components/contact/WhatsAppContactForm";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-800">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-brand-gold/20 border border-brand-gold/30 mb-6">
              <span className="text-brand-gold text-sm font-semibold uppercase tracking-wider">
                Get In Touch
              </span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-black text-white mb-6">
              Contact{" "}
              <span className="bg-gradient-to-r from-brand-gold to-yellow-400 bg-clip-text text-transparent">
                Primus FC
              </span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
              Ready to join our movement? Whether you're a potential partner,
              aspiring player, or passionate supporter, we'd love to hear from
              you.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="p-6 lg:p-8 rounded-3xl bg-gradient-to-br from-slate-800 to-purple-900/30 border border-white/10">
                <div className="mb-8">
                  <h2 className="text-2xl lg:text-3xl font-black text-white mb-4">
                    Send Us a Message
                  </h2>
                  <p className="text-white/70">
                    Connect with us directly via WhatsApp for the fastest
                    response. We're here to answer your questions about
                    partnerships, tryouts, and more.
                  </p>
                </div>
                <WhatsAppContactForm />
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <div className="p-6 lg:p-8 rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10">
                <h3 className="text-xl font-black text-white mb-6">
                  Contact Information
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-brand-gold/20 flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-brand-gold"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Email</h4>
                      <p className="text-white/70">hello@primusfc.com</p>
                      <p className="text-white/70">partnerships@primusfc.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-brand-gold/20 flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-brand-gold"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">
                        Phone & WhatsApp
                      </h4>
                      <p className="text-white/70">+233 XX XXX XXXX</p>
                      <p className="text-sm text-brand-gold">
                        Available 24/7 for urgent matters
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-brand-gold/20 flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-brand-gold"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">
                        Headquarters
                      </h4>
                      <p className="text-white/70">Primus FC Complex</p>
                      <p className="text-white/70">Accra, Ghana</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <h4 className="font-semibold text-white mb-4">
                    Office Hours
                  </h4>
                  <div className="space-y-2 text-sm text-white/70">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span>8:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span>9:00 AM - 2:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span>Closed</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                <h4 className="font-semibold text-white mb-4">Quick Links</h4>
                <div className="space-y-3">
                  <a
                    href="/partnerships"
                    className="flex items-center justify-between p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-all group"
                  >
                    <span className="text-white/90">
                      Partnership Opportunities
                    </span>
                    <svg
                      className="w-4 h-4 text-white/40 group-hover:text-brand-gold transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </a>
                  <a
                    href="/tryouts"
                    className="flex items-center justify-between p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-all group"
                  >
                    <span className="text-white/90">Player Tryouts</span>
                    <svg
                      className="w-4 h-4 text-white/40 group-hover:text-brand-gold transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </a>
                  <a
                    href="/support"
                    className="flex items-center justify-between p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-all group"
                  >
                    <span className="text-white/90">Support Our Mission</span>
                    <svg
                      className="w-4 h-4 text-white/40 group-hover:text-brand-gold transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-5xl font-black text-white mb-6">
              Ready to Make{" "}
              <span className="bg-gradient-to-r from-brand-gold to-yellow-400 bg-clip-text text-transparent">
                An Impact?
              </span>
            </h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join us in transforming lives through football. Your partnership
              can help us reach more communities and create lasting change.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/partnerships"
                className="inline-flex items-center px-8 py-4 rounded-full bg-brand-gold text-black font-bold text-lg hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-brand-gold/30"
              >
                Explore Partnerships
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>
              <a
                href="/about"
                className="inline-flex items-center px-8 py-4 rounded-full border-2 border-white/30 text-white font-bold text-lg hover:bg-white hover:text-black transition-all duration-300"
              >
                Learn About Our Mission
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
