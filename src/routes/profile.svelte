<script lang="ts">
	import { goto } from "$app/navigation";
	import Modal from "$lib/components/Modal.svelte";

	import Icon from "@iconify/svelte";
	import { logOut } from "$lib/supabase/auth";
</script>

<div class="bg-gray-50 h-full">
	<div class="max-w-2xl mx-auto py-6 px-4 sm:px-6 lg:py-6 lg:px-8">
		<h1 class="text-2xl text-center font-extrabold tracking-tight text-gray-900 sm:text-3xl mb-8">
			Compte
		</h1>

		<div class=" flex justify-center lg:flex-shrink-0">
			<div class="inline-flex rounded-md shadow">
				<button
					type="submit"
					on:click={() => logOut().then(() => goto("/"))}
					class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-semibold rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
				>
					Se déconnecter
					<Icon icon="heroicons-solid:logout" class="ml-2 text-2xl" />
				</button>
			</div>
		</div>
	</div>
</div>
