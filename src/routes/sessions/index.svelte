<script lang="ts">
	import ListItem from "$lib/components/sessions/ListItem.svelte";
	import Tag from "$lib/components/Tag.svelte";
	import { tags } from "$lib/components/tags";
	import { months } from "$lib/utils/months";
	import { getPosts } from "./posts";

	const posts_promise = getPosts();

	let lastMonth: number;

	function isFirstOfMonth(month: number) {
		if (month == lastMonth) return false;
		lastMonth = month;
		return true;
	}
</script>

<div class="flex flex-col relative min-h-full max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:pt-8 lg:px-8">
	<h1 class="text-3xl font-extrabold text-center mb-8">Sessions</h1>
	<div class="flex gap-2 mb-8">
		{#each Object.keys(tags) as name}
			<Tag {name} />
		{/each}
	</div>

	{#await posts_promise}
		<p>chargement</p>
	{:then posts}
		{#each posts as post}
			{#if isFirstOfMonth(parseInt(post.date.split("-")[1]))}
				<h2 class="text-2xl font-bold mb-8">{months[parseInt(post.date.split("-")[1]) - 1]}</h2>
			{/if}
			<a class="mb-4" href="/sessions/{post.slug}">
				<ListItem
					title={post.title}
					date={new Date(post.date)}
					tags={post.tags}
					description={post.description}
					image_url={post.image_url}
				/>
			</a>
		{/each}
	{/await}
</div>
