/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		container: {
			padding: {
				DEFAULT: "1rem",
				sm: "2rem",
				lg: "4rem",
				xl: "5rem",
				"2xl": "6rem",
			},
			screens: {
				sm: "100%",
				md: "750px",
				lg: "960px",
				xl: "1150px",
				"2xl": "1400px",
			},
			center: true,
		},
		extend: {},
	},
	plugins: [],
};
