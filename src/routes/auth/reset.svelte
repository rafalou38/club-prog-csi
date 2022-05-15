<script lang="ts">
	import { goto } from "$app/navigation";
	import Modal from "$lib/components/Modal.svelte";

	import { logOut, resetPassword, updateUser } from "$lib/supabase/auth";

	let email = "";
	let success = false;

	let error = "";

	let loading = false;

	async function submit() {
		if (!email) {
			error = "Veuillez remplir tous les champs";
			return;
		}

		loading = true;

		const result = await resetPassword(email);
		if (result.error) {
			error = result.error.message;
		} else {
			success = true;
		}
		loading = false;
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
			Réinitialiser le mot de passe
		</h1>
		{#if success}
			<p>Tu vas bientôt recevoir un email avec un lien pour réinitialiser ton mot de passe.</p>
		{:else}
			<form action="" class="flex flex-col gap-2" on:submit|preventDefault={submit}>
				<div>
					<label for="email" class="block text-sm font-medium text-gray-700">Adresse email</label>
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
				<div class="mt-16 flex justify-center lg:flex-shrink-0">
					<div class="inline-flex rounded-md shadow">
						<button
							type="submit"
							disabled={loading}
							class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-semibold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 {loading
								? 'opacity-50 cursor-not-allowed'
								: ''}"
						>
							Réinitialiser
						</button>
					</div>
				</div>
			</form>
		{/if}
	</div>
</div>
