import type { SvelteComponent } from "svelte";

export interface IPost {
	title: string;
	date: Date;
	tags: string[];
	description: string;
	image_url: string;
	slug: string;
}

export interface IPostFull extends IPost {
	renderer: any;
}
