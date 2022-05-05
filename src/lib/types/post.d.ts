import type { SvelteComponent } from "svelte";

export interface IPost {
	title: string;
	date: string;
	tags: string[];
	description: string;
	image_url: string;
	slug: string;
}

export interface IPostFull extends IPost {
	renderer: any;
}
