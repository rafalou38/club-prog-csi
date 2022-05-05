<script lang="ts">
	import ListItem from "$lib/components/sessions/ListItem.svelte";
	import Icon from "@iconify/svelte";

	export let title = "";
	export let date = "";
	export let tags = [];
	export let description = "";
	export let image_url = "";
</script>

<svelte:head>
	<link rel="stylesheet" href="/themes/md/github-markdown.css" />
	<!-- <link rel="stylesheet" href="/themes/code/prism-ghcolors.css" /> -->
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/prism-one-light.css"
	/>
</svelte:head>

<div
	class="main flex flex-col mx-auto max-w-5xl bg-white border border-gray-200 border-t-0 border-b-0"
>
	<div class="border-b border-b-gray-200">
		<ListItem {title} date={new Date(date)} {tags} {description} {image_url} embeded={true} />
	</div>
	<div class="markdown-body py-6 px-8">
		<slot />
	</div>
	<div class="grow" />
	<a href="/sessions" class="mx-auto my-4 w-max flex items-center gap-2 uppercase font-semibold">
		<Icon icon="heroicons-solid:arrow-narrow-left" />
		retour
	</a>
</div>

<style global>
	/* Disable tailwind's css reset */
	.markdown-body * {
		all: revert;
	}
	.main {
		min-height: calc(100vh - 64px);
	}
</style>
