<script lang="ts">
	import { goto } from "$app/navigation";
	import Modal from "$lib/components/Modal.svelte";

	import { register } from "$lib/supabase/characters";

	import Icon from "@iconify/svelte";

	let last_name = "";
	let first_name = "";
	let class_name = "2de1";

	let error = "";

	async function submit() {
		if (!last_name || !first_name || !class_name) {
			error = "Veuillez remplir tous les champs";
			return;
		}
		const result = await register(first_name, last_name, class_name);

		if (!result.error) goto("/");
		else error = result.error.message;
	}
</script>

{#if error}
	<Modal
		title="Erreur"
		description="{error}<br/> vous pouvez me contacter via rafael.martinezcalvo@orange.fr"
		on:close={() => (error = "")}
	/>
{/if}

<div class="bg-gray-50 h-full">
	<a href="/" class="block pl-4 pt-2 flex items-center gap-2 uppercase font-semibold">
		<Icon icon="mdi:keyboard-backspace" />
		retour
	</a>
	<div class="max-w-2xl mx-auto py-6 px-4 sm:px-6 lg:py-6 lg:px-8">
		<h1 class="text-2xl text-center font-extrabold tracking-tight text-gray-900 sm:text-3xl mb-8">
			Inscription
		</h1>

		<form action="" class="flex flex-col gap-2" on:submit|preventDefault={submit}>
			<div>
				<label for="class" class="block text-sm font-medium text-gray-700">Classe</label>
				<div class="mt-1 relative rounded-md shadow-sm">
					<select
						id="class"
						bind:value={class_name}
						name="classe"
						class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-2 pr-12 sm:text-sm border-gray-300 rounded-md"
					>
						<option>2de1</option>
						<option>2de2</option>
						<option>2de3</option>
						<option>2de4</option>
						<option>2de5</option>
						<option>1ère1</option>
						<option>1ère2</option>
						<option>1ère3</option>
						<option>1ère4</option>
						<option>1ère5</option>
					</select>
				</div>
			</div>
			<div>
				<label for="name" class="block text-sm font-medium text-gray-700">Nom</label>
				<div class="mt-1 relative rounded-md shadow-sm">
					<input
						type="text"
						id="name"
						name="nom"
						bind:value={last_name}
						class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-2 pr-12 sm:text-sm border-gray-300 rounded-md"
					/>
				</div>
			</div>
			<div>
				<label for="surname" class="block text-sm font-medium text-gray-700">Prénom</label>
				<div class="mt-1 relative rounded-md shadow-sm">
					<input
						type="text"
						id="surname"
						name="prénom"
						bind:value={first_name}
						class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-2 pr-12 sm:text-sm border-gray-300 rounded-md"
					/>
				</div>
			</div>
			<p class="my-4 text-gray-700">
				Inscription sans engagement, jeudi nous accepterons en priorité les dix premiers membres
				inscrits mais laisserons en entrer d'autres en cas de désistement.
			</p>
			<div class=" flex justify-center lg:flex-shrink-0">
				<div class="inline-flex rounded-md shadow">
					<button
						type="submit"
						class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-semibold rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
					>
						S'inscrire
					</button>
				</div>
			</div>
		</form>
	</div>
</div>
