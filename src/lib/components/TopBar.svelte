<script>
	import { user } from "$lib/supabase/auth";

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

	{#if $user}
		<a href="/profile" class="flex items-center text-white gap-2 p-2  rounded hover:bg-indigo-500">
			<Icon icon="heroicons-solid:user" class="text-2xl text-whitebox-content" />
		</a>
	{:else}
		<a
			href="/auth/register"
			class="flex items-center text-white gap-2 py-2 px-4  rounded hover:bg-indigo-500"
		>
			S'inscrire
			<Icon icon="heroicons-solid:user-circle" class="text-2xl text-whitebox-content" />
		</a>
	{/if}
</div>
