export const metadata = { title: "Contact — Primus FC" };
export default function ContactPage() {
  return (
    <div className="prose max-w-none">
      <h1>Contact Us</h1>
      <p>Ticket Office: +233 (0)30 123 4567 — hello@primusfc.com</p>
      <p>Stadium Address: Primus Arena, Accra, Ghana</p>
      <h2>Write to Us</h2>
      <form
        action="/api/contact"
        method="post"
        className="not-prose grid gap-3 max-w-xl"
      >
        <input
          required
          name="name"
          placeholder="Your name"
          className="border rounded-xl px-3 py-2"
        />
        <input
          required
          name="email"
          type="email"
          placeholder="Email"
          className="border rounded-xl px-3 py-2"
        />
        <textarea
          required
          name="message"
          placeholder="Message"
          className="border rounded-xl px-3 py-2 min-h-32"
        />
        <button className="px-4 py-2 rounded-xl bg-primary text-white w-fit">
          Send
        </button>
      </form>
    </div>
  );
}
