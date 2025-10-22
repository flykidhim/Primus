import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative">
      <Image
        src="/brand/hero.jpg" // put a nice wide image here
        alt="Primus Arena"
        width={1920}
        height={1080}
        className="w-full h-[48vh] sm:h-[56vh] md:h-[62vh] object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 flex items-center">
        <div className="container text-white">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3">
            Welcome to Primus FC
          </h1>
          <p className="max-w-xl text-base sm:text-lg opacity-90 mb-5">
            News, fixtures, tickets and shop — all in one place.
          </p>
          <div className="flex gap-3">
            <Link
              href="/fixtures"
              className="px-4 py-2 rounded-xl bg-gold text-black font-semibold text-sm sm:text-base"
            >
              Next Match
            </Link>
            <Link
              href="/shop"
              className="px-4 py-2 rounded-xl bg-white/10 border border-white/40 text-sm sm:text-base"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
