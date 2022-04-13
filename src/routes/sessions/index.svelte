<script lang="ts">
	import ListItem from "$lib/components/sessions/ListItem.svelte";
	import Tag from "$lib/components/Tag.svelte";
	import { tags } from "$lib/components/tags";
</script>

<div class="flex flex-col relative min-h-full max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:pt-16 lg:px-8">
	<h1 class="text-3xl font-extrabold text-center mb-8">Sessions</h1>
	<div class="flex gap-2 mb-8">
		{#each Object.keys(tags) as name}
			<Tag {name} />
		{/each}
	</div>

	<h2 class="text-2xl font-bold mb-8">Avril</h2>
	<a href="">
		<ListItem
			title="Introduction"
			date={new Date("2022-04-14T13:00:00")}
			tags={["processing", "python"]}
			description="Premiere session du club informatique, ouverture et présentation du club."
			image_url=""
		/>
	</a>
</div>
