<script lang="ts">
	import Tag from "../Tag.svelte";

	export let title: string;
	export let date: Date;
	export let tags: string[];
	export let description: string;
	export let image_url: string;
</script>

<div
	class="flex items-stretch shadow rounded-md overflow-hidden bg-white hover:bg-gray-50 transition-colors cursor-pointer"
>
	<div class="grow  pt-4 pb-8 px-5">
		<div class="flex pb-1">
			<h2 class="grow text-xl font-semibold">{title}</h2>
			<span class="text-gray-500">{date.toLocaleString()}</span>
		</div>
		<div class="flex gap-2 pl-2 pt-1">
			{#each tags as tag_name}
				<Tag name={tag_name} />
			{/each}
		</div>
		<p class="pl-2">
			{description}
		</p>
	</div>
	{#if image_url}
		<div class="bg-gray-600 w-32" />
	{:else}
		<div class="bg-gray-600 w-32" />
	{/if}
</div>
