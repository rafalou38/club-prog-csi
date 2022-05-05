import { defineMDSveXConfig as defineConfig } from "mdsvex";

const config = defineConfig({
	extensions: [".svelte.md", ".md", ".svx"],

	layout: {
		session: "./src/lib/layouts/session.svelte",
	},

	smartypants: {
		dashes: "oldschool",
	},

	remarkPlugins: [],
	rehypePlugins: [],
});

export default config;
