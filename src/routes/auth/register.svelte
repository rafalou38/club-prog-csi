<script lang="ts">
	import { goto } from "$app/navigation";
	import Modal from "$lib/components/Modal.svelte";

	import Icon from "@iconify/svelte";
	import { signInWithEmail } from "$lib/supabase/auth";

	let last_name = "";
	let first_name = "";
	let class_name = "2de1";
	let email = "";
	let password = "";

	let error = "";

	let loading = false;

	async function submit() {
		if (!last_name || !first_name || !class_name || !email || !password) {
			error = "Veuillez remplir tous les champs";
			return;
		}

		loading = true;

		const result = await signInWithEmail(first_name, last_name, class_name, email, password);

		if (!result.error) return goto("/");

		loading = false;
		error = result.error.message;
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
			<div class="flex flex-wrap gap-2">
				<div class="grow">
					<label for="last_name" class="block text-sm font-medium text-gray-700">Nom</label>
					<div class="mt-1 relative rounded-md shadow-sm">
						<input
							type="text"
							id="last_name"
							name="nom"
							bind:value={last_name}
							class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-2 pr-12 sm:text-sm border-gray-300 rounded-md"
						/>
					</div>
				</div>
				<div class="grow">
					<label for="first_name" class="block text-sm font-medium text-gray-700">Prénom</label>
					<div class="mt-1 relative rounded-md shadow-sm">
						<input
							type="text"
							id="first_name"
							name="prénom"
							bind:value={first_name}
							class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-2 pr-12 sm:text-sm border-gray-300 rounded-md"
						/>
					</div>
				</div>
			</div>
			<div class="flex flex-wrap gap-2">
				<div class="grow">
					<label for="email" class="block text-sm font-medium text-gray-700">Email</label>
					<div class="mt-1 relative rounded-md shadow-sm">
						<input
							type="email"
							id="email"
							name="email"
							bind:value={email}
							class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-2 pr-12 sm:text-sm border-gray-300 rounded-md"
						/>
					</div>
				</div>
				<div class="grow">
					<label for="password" class="block text-sm font-medium text-gray-700">Mot de passe</label>
					<div class="mt-1 relative rounded-md shadow-sm">
						<input
							type="password"
							id="password"
							name="password"
							bind:value={password}
							class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-2 pr-12 sm:text-sm border-gray-300 rounded-md"
						/>
					</div>
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
						disabled={loading}
						class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-semibold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 {loading
							? 'opacity-50 cursor-not-allowed'
							: ''}"
					>
						S'inscrire
					</button>
				</div>
			</div>
			<a href="/auth/login" class="text-indigo-600 text-center">j'ai deja un compte</a>
		</form>
	</div>
</div>
