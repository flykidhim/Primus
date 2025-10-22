import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          gold: "#F5C842",
          blue: "#1790FF",
          orange: "#FF6A00",
          red: "#E02020",
          ink: "#0B0F19",
        },
      },
      boxShadow: { glass: "0 8px 30px rgba(0,0,0,0.12)" },
      backgroundImage: {
        "hero-radial":
          "radial-gradient(1200px 600px at 10% -10%, rgba(23,144,255,.18), transparent 60%), radial-gradient(900px 500px at 90% 10%, rgba(245,200,66,.25), transparent 60%)",
      },
    },
  },
  plugins: [],
} satisfies Config;
