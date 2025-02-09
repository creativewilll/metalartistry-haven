import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
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
        sans: ['Railway', 'sans-serif'],
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
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        // Moving shine animation that creates a sweeping highlight effect
        shine: {
          '0%': { 
            backgroundPosition: '200% center',
            opacity: '0'
          },
          '50%': {
            opacity: '0.8'
          },
          '100%': { 
            backgroundPosition: '-200% center',
            opacity: '0'
          },
        },
        // Pulsing ember effect that makes the text appear to glow like hot metal
        'ember-pulse': {
          '0%, 100%': { 
            textShadow: '0 0 30px rgba(251,191,36,0.8), 0 0 50px rgba(245,158,11,0.6), 0 0 70px rgba(245,158,11,0.4)',
            filter: 'brightness(1.2)'
          },
          '50%': { 
            textShadow: '0 0 20px rgba(251,191,36,0.6), 0 0 35px rgba(245,158,11,0.4), 0 0 50px rgba(245,158,11,0.2)',
            filter: 'brightness(1)'
          },
        },
        'pulse-subtle': {
          '0%, 100%': { 
            opacity: '1',
            boxShadow: '0 0 15px rgba(245,158,11,0.5)'
          },
          '50%': { 
            opacity: '0.95',
            boxShadow: '0 0 25px rgba(245,158,11,0.7)'
          },
        },
        nod: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(400%)' }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        fadeIn: "fadeIn 0.5s ease-in-out",
        shine: 'shine 4s ease-in-out infinite',
        'pulse-subtle': 'pulse-subtle 3s ease-in-out infinite',
        'ember-pulse': 'ember-pulse 2s ease-in-out infinite',
        nod: 'nod 2s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
      },
      colors: {
        // Primary Colors
        'charcoal': '#121212',
        'graphite': '#2E2E2E',
        'steel': {
          900: '#1a1a1a',
          800: '#2d2d2d',
          700: '#404040',
          600: '#525252',
          500: '#666666',
          400: '#808080'
        },
        
        // Accent Colors
        'red-hot': '#FF4500',
        'molten-silver': '#A8A9AD',
        
        // Secondary Colors
        'burnt-ember': '#8B0000',
        'ash-grey': '#696969',

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
      },
      backgroundImage: {
        // Metallic gradient that transitions smoothly through amber tones
        'metal-gradient': 'linear-gradient(135deg, transparent 0%, #f59e0b 35%, #fbbf24 50%, #f59e0b 65%, transparent 100%)',
        // Subtle shine effect that animates across the text
        'heading-shine': 'linear-gradient(90deg, transparent 0%, rgba(251,191,36,0.4) 50%, transparent 100%)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [
    animate
  ],
} satisfies Config;
