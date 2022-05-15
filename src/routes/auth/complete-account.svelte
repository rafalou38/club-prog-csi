<script lang="ts">
	import { goto } from "$app/navigation";
	import Modal from "$lib/components/Modal.svelte";

	import Icon from "@iconify/svelte";
	import { completeAccount, signInWithEmail } from "$lib/supabase/auth";
	import { getIncompleteMembers } from "$lib/supabase/members";

	let id = NaN;
	let email = "";
	let password = "";

	let error = "";

	let loading = false;

	const pendingAccounts = getIncompleteMembers();

	async function submit() {
		if (!email || !password || isNaN(id)) {
			error = "Veuillez remplir tous les champs";
			return;
		}
		console.log(id);

		loading = true;

		const result = await completeAccount(id, email, password);

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
			Complétez votre compte
		</h1>

		{#await pendingAccounts}
			<p>chargement</p>
		{:then accounts}
			<form action="" class="flex flex-col gap-2" on:submit|preventDefault={submit}>
				<div>
					<label for="user" class="block text-sm font-medium text-gray-700">Nom</label>
					<div class="mt-1 relative rounded-md shadow-sm">
						<select
							id="user"
							bind:value={id}
							name="user"
							class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-2 pr-12 sm:text-sm border-gray-300 rounded-md"
						>
							{#each accounts as account}
								<option value={account.id}>{account.first_name} {account.last_name}</option>
							{/each}
						</select>
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
						<label for="password" class="block text-sm font-medium text-gray-700"
							>Mot de passe</label
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
				</div>
				<div class=" flex justify-center lg:flex-shrink-0">
					<div class="inline-flex rounded-md shadow">
						<button
							type="submit"
							disabled={loading}
							class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-semibold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 {loading
								? 'opacity-50 cursor-not-allowed'
								: ''}"
						>
							Compléter
						</button>
					</div>
				</div>
			</form>
		{:catch error}
			<div class="bg-red-500  rounded-md overflow-hidden">
				<div class="max-w-7xl mx-auto py-3 px-3">
					<div class="flex items-center justify-between flex-wrap">
						<div class="w-0 flex-1 flex items-center">
							<span class="flex p-2 rounded-lg bg-red-400">
								<Icon icon="mdi:bug" class="h-6 w-6 text-white" />
							</span>
							<p class="ml-3 font-medium text-white truncate">Erreur: {error.message}</p>
						</div>
						<div class="order-2 flex-shrink-0 mr-3 sm:order-3 sm:ml-3">
							<button
								type="button"
								class="-mr-1 flex p-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
							>
								<span class="sr-only">réessayer</span>
								<Icon icon="mdi:refresh" class="h-6 w-6 text-white" />
							</button>
						</div>
					</div>
				</div>
			</div>
		{/await}
	</div>
</div>
