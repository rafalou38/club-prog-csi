<script lang="ts">
	import Tag from "../Tag.svelte";

	export let title: string;
	export let date: Date;
	export let tags: string[];
	export let description: string;
	export let image_url: string;

	export let embeded = false;
</script>

<div
	class="flex items-stretch {embeded
		? ''
		: 'shadow cursor-pointer hover:bg-gray-50'} rounded-md overflow-hidden bg-white  transition-colors"
>
	<div class="grow pt-4 pb-8 px-5">
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
		<div class="bg-gray-300 relative w-64 grid place-items-center">
			<img src={image_url} alt="" class="w-full object-cover" />
		</div>
	{:else}
		<div class="bg-gray-300 w-64" />
	{/if}
</div>
