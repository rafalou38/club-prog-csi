const forms = require("@tailwindcss/forms");

const config = {
	content: ["./src/**/*.{html,js,svelte,ts}"],

	theme: {
		extend: {},
	},

	plugins: [forms],

	purge: {
		options: {
			safelist: [
				{
					pattern: /bg-\w+-[1-5]00/,
				},
			],
		},
	},
};

module.exports = config;
