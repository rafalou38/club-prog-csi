import type { IPost, IPostFull } from "$lib/types/post";
import { slugFromPath } from "$lib/utils";

export async function getPosts(): Promise<IPost[]> {
	const modules = import.meta.glob("./*.{md,svx,svelte.md}");

	const posts: IPost[] = [];

	for (const [path, resolver] of Object.entries(modules)) {
		const slug = slugFromPath(path);
		const result = await resolver();

		posts.push({
			slug,
			...result.metadata,
		});
	}

	posts.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));

	return posts;
}

export async function getPost(slug: string): Promise<IPostFull | null> {
	const modules = import.meta.glob("./*.{md,svx,svelte.md}");

	let post: IPostFull | null = null;

	for (const [path, resolver] of Object.entries(modules)) {
		const foundSlug = slugFromPath(path);
		if (foundSlug == slug) {
			const result = await resolver();
			const renderer = await result.default;

			post = {
				slug,
				renderer,
				...result.metadata,
			};
		}
	}

	return post;
}
