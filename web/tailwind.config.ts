import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        "modal-pop": {
          "0%": { opacity: "0", transform: "translateY(16px) scale(0.96)" },
          "60%": { opacity: "1", transform: "translateY(0) scale(1.02)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "modal-fade": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "modal-pop": "modal-pop 220ms ease-out",
        "modal-fade": "modal-fade 180ms ease-out",
      },
    },
  },
  plugins: [],
}

export default config
