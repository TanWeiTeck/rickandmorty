/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                culpa: ['"Mea Culpa"', 'cursive'],
                comfortaa: ['Comfortaa', 'sans-serif'],
            },
        },
    },
    plugins: [],
    prefix: 'tw-',
};
