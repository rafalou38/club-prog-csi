<script>
	import Icon from "@iconify/svelte";
</script>

<div class="flex items-center p-3 bg-indigo-600">
	<a href="/">
		<Icon
			icon="heroicons-solid:home"
			class="text-2xl text-white p-2 box-content rounded hover:bg-indigo-500"
		/>
	</a>
	<div class="grow" />
	<a
		href="/register"
		class="flex items-center text-white gap-2 py-2 px-4  rounded hover:bg-indigo-500"
	>
		S'inscrire
		<Icon icon="heroicons-solid:user-circle" class="text-2xl text-whitebox-content" />
	</a>
</div>
