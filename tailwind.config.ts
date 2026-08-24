import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        // Menu page fonts
        carla: ["CarlaSans", "sans-serif"],
        SofiaPro: ["SofiaPro", "sans-serif"],
        KarmeHandwritten: ["KarmeHandwritten", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        taipo: {
          // Core brand
          DEFAULT: "#00C1B8",
          dark: "#09625D",
          muted: "#00B7AF",
          // Aliases used across pages
          teal: "#00C1B8",
          "teal-dark": "#00B7AF",
          "teal-alt": "#009E96",
          // Backgrounds
          light: "#ECFFFE",
          "light-2": "#E1F7F6",
          "light-3": "#E9FCFB",
          "light-4": "#F8FFFF",
          "bg-light": "#E4F4F4",
          "bg-lighter": "#E9FCFB",
          "bg-input": "#F1FBFA",
          // Text
          text: "#404040",
          "dark-text": "#2C3B3A",
          teal2: "#338A86",
          "text-dark": "#394E4D",
          "text-mid": "#09625D",
          "text-body": "#2C3B3A",
          "text-muted": "#338A86",
          // Accent
          coral: "#D75757",
          // Contact page specific
          primary: "#00C1B8",
          "green-dark": "#09625D",
          input: "#F1FBFA",
          placeholder: "#338A86",
          email: "#E9FCFB",
          link: "#338A86",
          lighter: "#E9FCFB",
          medium: "#338A86",
          body: "#2C3B3A",
        },
        // Reservation modal palette
        gold: {
          DEFAULT: "#A47C55",
          light: "#C9A77C",
        },
        restaurant: {
          text: "#DFE3E3",
          card: "#161616",
          placeholder: "#565656",
          booked: "#2A2A2A",
          "booked-text": "#6B6B6B",
          dark: "#202020",
          divider: "#3A3A3A",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
