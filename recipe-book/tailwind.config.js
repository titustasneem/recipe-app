/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
      './pages/**/*.{js,jsx}',
      './components/**/*.{js,jsx}',
      './app/**/*.{js,jsx}',
      './src/**/*.{js,jsx}',
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
        colors: {
          border: "var(--color-border)", /* warm-gray-12 */
          input: "var(--color-input)", /* warm-neutral */
          ring: "var(--color-ring)", /* soft-rose */
          background: "var(--color-background)", /* off-white */
          foreground: "var(--color-foreground)", /* warm-dark-brown */
          primary: {
            DEFAULT: "var(--color-primary)", /* soft-rose */
            foreground: "var(--color-primary-foreground)", /* warm-dark-brown */
          },
          secondary: {
            DEFAULT: "var(--color-secondary)", /* sage-green */
            foreground: "var(--color-secondary-foreground)", /* warm-dark-brown */
          },
          destructive: {
            DEFAULT: "var(--color-destructive)", /* soft-coral */
            foreground: "var(--color-destructive-foreground)", /* off-white */
          },
          muted: {
            DEFAULT: "var(--color-muted)", /* warm-neutral */
            foreground: "var(--color-muted-foreground)", /* warm-gray */
          },
          accent: {
            DEFAULT: "var(--color-accent)", /* warm-cream */
            foreground: "var(--color-accent-foreground)", /* warm-dark-brown */
          },
          popover: {
            DEFAULT: "var(--color-popover)", /* off-white */
            foreground: "var(--color-popover-foreground)", /* warm-dark-brown */
          },
          card: {
            DEFAULT: "var(--color-card)", /* warm-neutral */
            foreground: "var(--color-card-foreground)", /* warm-dark-brown */
          },
          success: {
            DEFAULT: "var(--color-success)", /* muted-green */
            foreground: "var(--color-success-foreground)", /* off-white */
          },
          warning: {
            DEFAULT: "var(--color-warning)", /* warm-amber */
            foreground: "var(--color-warning-foreground)", /* warm-dark-brown */
          },
          error: {
            DEFAULT: "var(--color-error)", /* soft-coral */
            foreground: "var(--color-error-foreground)", /* off-white */
          },
        },
        borderRadius: {
          lg: "8px",
          md: "6px",
          sm: "4px",
        },
        fontFamily: {
          'heading': ['Lucida Handwriting', 'serif'],
          'body': ['Inter', 'sans-serif'],
          'caption': ['Source Sans Pro', 'sans-serif'],
          'mono': ['JetBrains Mono', 'monospace'],
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
          "fade-in": {
            from: { opacity: "0" },
            to: { opacity: "1" },
          },
          "slide-in-from-top": {
            from: { transform: "translateY(-100%)" },
            to: { transform: "translateY(0)" },
          },
          "slide-in-from-right": {
            from: { transform: "translateX(100%)" },
            to: { transform: "translateX(0)" },
          },
        },
        animation: {
          "accordion-down": "accordion-down 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "accordion-up": "accordion-up 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "fade-in": "fade-in 0.2s ease-out",
          "slide-in-from-top": "slide-in-from-top 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "slide-in-from-right": "slide-in-from-right 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        },
        transitionTimingFunction: {
          'gentle': 'cubic-bezier(0.4, 0, 0.2, 1)',
        },
        transitionDuration: {
          '200': '200ms',
          '300': '300ms',
        },
      },
    },
    plugins: [
      require("tailwindcss-animate"),
    ],
  }