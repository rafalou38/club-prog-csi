<script lang="ts">
	import { goto } from "$app/navigation";
	import Modal from "$lib/components/Modal.svelte";

	import { logOut, updateUser } from "$lib/supabase/auth";

	let password = "";
	let passwordVerification = "";

	let error = "";

	let loading = false;

	async function submit() {
		if (!password || !passwordVerification) {
			error = "Veuillez remplir tous les champs";
			return;
		}
		if (password !== passwordVerification) {
			error = "Les mots de passe ne sont pas identiques";
			return;
		}

		loading = true;

		const result = await updateUser(null, password);

		if (!result.error) {
			await logOut();
			return goto("/auth/login");
		}

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
	<div class="max-w-2xl mx-auto py-6 px-4 sm:px-6 lg:py-6 lg:px-8">
		<h1 class="text-2xl text-center font-extrabold tracking-tight text-gray-900 sm:text-3xl mb-8">
			Mot de passe oublié
		</h1>

		<form action="" class="flex flex-col gap-2" on:submit|preventDefault={submit}>
			<div>
				<label for="password" class="block text-sm font-medium text-gray-700"
					>Nouveau mot de passe</label
				>
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
			<div>
				<label for="password-verification" class="block text-sm font-medium text-gray-700"
					>Encore une fois</label
				>
				<div class="mt-1 relative rounded-md shadow-sm">
					<input
						type="password"
						id="password-verification"
						name="password-verification"
						bind:value={passwordVerification}
						class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-2 pr-12 sm:text-sm border-gray-300 rounded-md"
					/>
				</div>
			</div>
			<div class="mt-16 flex justify-center lg:flex-shrink-0">
				<div class="inline-flex rounded-md shadow">
					<button
						type="submit"
						disabled={loading}
						class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-semibold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 {loading
							? 'opacity-50 cursor-not-allowed'
							: ''}"
					>
						Changer le mot de passe
					</button>
				</div>
			</div>
		</form>
	</div>
</div>
