/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    100: "hsl(var(--primary) / 0.1)",
                    500: "hsl(var(--primary))",
                    600: "hsl(var(--primary))",
                    700: "hsl(var(--primary) / 0.7)",
                    900: "hsl(var(--primary) / 0.9)", // <-- Adicione esta linha
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    100: "hsl(var(--secondary) / 0.1)",
                    500: "hsl(var(--secondary))",
                    600: "hsl(var(--secondary))",
                    700: "hsl(var(--secondary) / 0.7)",
                    900: "hsl(var(--secondary) / 0.9)", // <-- Adicione esta linha se usar secondary-900
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                tertiary: {
                    400: "hsl(var(--tertiary) / 0.4)",
                    500: "hsl(var(--tertiary))",
                    DEFAULT: "hsl(var(--tertiary))",      // Nova cor
                },
                quaternary: {
                    100: "hsl(var(--quaternary) / 0.1)",
                    400: "hsl(var(--quaternary) / 0.4)",
                    500: "hsl(var(--quaternary))",
                    DEFAULT: "hsl(var(--quaternary))",  // Nova cor
                },
                accent: {
                    500: "hsl(var(--accent))",
                    600: "hsl(var(--accent))",
                    900: "hsl(var(--accent) / 0.9)", // <-- Adicione esta linha se usar accent-900
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
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
            borderRadius: {
                lg: "var(--radius)",
            },
        },
    },
    plugins: [
        require('@tailwindcss/aspect-ratio'),
    ],
}