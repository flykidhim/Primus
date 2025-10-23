"use client";

import { useState } from "react";

export default function WhatsAppContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    subject: "General Inquiry",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const phoneNumber =
      process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "233XXXXXXXXX";
    const text = `Hello Primus FC!%0A%0AName: ${formData.name}%0AEmail: ${formData.email}%0ASubject: ${formData.subject}%0A%0AMessage:%0A${formData.message}`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${text}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-white mb-2"
          >
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold/30 transition-all"
            placeholder="Your full name"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-white mb-2"
          >
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold/30 transition-all"
            placeholder="your.email@example.com"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="subject"
          className="block text-sm font-semibold text-white mb-2"
        >
          Subject *
        </label>
        <select
          id="subject"
          name="subject"
          required
          value={formData.subject}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold/30 transition-all"
        >
          <option value="General Inquiry">General Inquiry</option>
          <option value="Partnership">Partnership Opportunity</option>
          <option value="Player Tryout">Player Tryout</option>
          <option value="Media Request">Media Request</option>
          <option value="Sponsorship">Sponsorship</option>
          <option value="Community Program">Community Program</option>
          <option value="Technical Question">Technical Question</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-semibold text-white mb-2"
        >
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold/30 transition-all resize-none"
          placeholder="Tell us about your inquiry, partnership idea, or how you'd like to get involved..."
        />
      </div>

      <button
        type="submit"
        className="w-full py-4 px-6 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-green-600/30 flex items-center justify-center gap-3"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893-.001-3.189-1.262-6.209-3.55-8.485" />
        </svg>
        Send via WhatsApp
      </button>

      <div className="text-center">
        <p className="text-white/60 text-sm">
          We typically respond within 2 hours during business hours
        </p>
      </div>
    </form>
  );
}
