/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#F47B20", // Orange from logo
                secondary: "#2E3192", // Blue from logo
                bg: "#ffffff",
                "bg-200": "rgba(255, 255, 255, 0.25)",
                fg: "#333333",
                "fg-200": "#555555",
            },
            boxShadow: {
                custom: "0 4px 20px rgba(0, 0, 0, 0.08)",
            },
            borderRadius: {
                custom: "8px",
            },
            transitionProperty: {
                custom: "all 0.4s ease",
            },
        },
        fontFamily: {
            sans: ['"Helvetica Neue"', "Arial", "sans-serif"],
            messina: ['"Messina Sans"', "sans-serif"],
            "messina-mono": ['"Messina Sans Mono"', "monospace"],
        },
    },
    plugins: [],
};
