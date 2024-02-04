import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        NMSNeo1: ["NMSNeo1"],
        NMSNeo2: ["NMSNeo2"],
        NMSNeo3: ["NMSNeo3"],
        NMSNeo4: ["NMSNeo4"],
        NMSNeo5: ["NMSNeo5"],
        NMSNeo6: ["NMSNeo6"],
      },
      colors: {
        bgColor: "#1E1E1E",
      },
    },
  },
  plugins: [],
};
export default config;
