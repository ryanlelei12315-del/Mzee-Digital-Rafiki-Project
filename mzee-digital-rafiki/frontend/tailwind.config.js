/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                terracotta: {
                    DEFAULT: '#C0622F',
                    light: '#D4834F',
                    dark: '#8B4513'
                },
                forest: {
                    DEFAULT: '#1B4332',
                    light: '#2D5F4C',
                    dark: '#0F2419'
                },
                cream: {
                    DEFAULT: '#FDF6EC',
                    dark: '#F5E6D3'
                },
                gold: {
                    DEFAULT: '#D4A017',
                    light: '#E5B84F',
                    dark: '#B8860B'
                }
            },
            fontFamily: {
                display: ['"Playfair Display"', 'serif'],
                body: ['Nunito', 'sans-serif'],
            },
            fontSize: {
                'xs': '16px',
                'sm': '18px',
                'base': '20px',
                'lg': '22px',
                'xl': '24px',
                '2xl': '28px',
                '3xl': '32px',
                '4xl': '36px',
                '5xl': '48px',
            },
            minHeight: {
                'touch': '48px',
            },
            minWidth: {
                'touch': '48px',
            },
        },
    },
    plugins: [],
}
