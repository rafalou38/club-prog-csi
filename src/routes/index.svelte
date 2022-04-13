<script lang="ts">
	import { browser } from "$app/env";
	import { getMembers, type IMember } from "$lib/supabase/characters";
	import Icon from "@iconify/svelte";

	let membersPromise = Promise.resolve([] as IMember[]);
	let error = "";

	if (browser) {
		membersPromise = getMembers();
	}
</script>

<div class="bg-gray-50 h-full">
	<div
		class="flex flex-col relative min-h-full max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:pt-16 lg:px-8"
	>
		<div class="mb-8 lg:flex lg:items-center lg:justify-between">
			<h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
				<span class="block">Club programmation CSI</span>
				<span class="block text-indigo-600">Seulement 10 places disponibles</span>
			</h2>
			<div class="mt-8 flex lg:mt-0 lg:flex-shrink-0">
				<div class="inline-flex rounded-md shadow">
					<a
						href="/register"
						class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-semibold rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
					>
						S'inscrire
					</a>
				</div>
				<div class="ml-3 inline-flex rounded-md shadow">
					<a
						href="/sessions"
						class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
					>
						Sessions
					</a>
				</div>
			</div>
		</div>
		<p>
			Vous pouvez vous inscrire meme si la liste est pleine, quelqu'un pourrait se désister, et ça
			nous sert pour savoir si il y a besoin d'étendre la capacité du club.
		</p>

		<h2 class="text-2xl font-semibold mt-4">Inscrits</h2>
		<p>Voila la liste des personnes déjà inscrites.</p>
		{#await membersPromise}
			<p>Chargement...</p>
		{:then members}
			<div class="py-6 sm:px-4">
				<table
					class="w-full shadow overflow-hidden border border-gray-300 border-separate rounded-lg"
					style="border-spacing: 0;"
				>
					<tr class="text-left bg-gray-100">
						<th class="header font-semibold px-5 w-14 sm:w-32">{members.length}/10</th>
						<th class="header font-semibold">Nom</th>
						<th class="header font-semibold">Prénom</th>
						<th class="header font-semibold">Classe</th>
					</tr>
					{#each members as member, i}
						<tr class="border border-gray-300 transition-colors bg-white/70 hover:bg-gray-50">
							<td class="cell px-5">{i + 1}</td>
							<td class="cell">{member.first_name}</td>
							<td class="cell">{member.last_name}</td>
							<td class="cell">{member.class}</td>
						</tr>
					{/each}
				</table>
			</div>
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
		<div class="grow h-16" />
		<p class="text-center w-ful">
			Pour vous désinscrire ou poser des questions: <a
				href="mailto:rafael.martinezcalvo@orange.fr"
				class="text-indigo-600 font-semibold"
			>
				rafael.martinezcalvo@orange.fr</a
			>
			<br />
			Ce site à été entièrement réalisé par moi en
			<a href="https://svelte.dev/" class="text-orange-600 font-semibold">svelte</a> et avec
			<a href="https://supabase.com/" class="text-blue-600 font-semibold">supabase</a>, pour
			l'occasion.
			<a href="https://github.com/rafalou38/club-prog-csi" class="text-indigo-600 font-semibold"
				>code</a
			>
		</p>
	</div>
</div>

<style lang="postcss">
	.header {
		@apply py-3;
	}
	.cell {
		@apply py-3 border-t border-gray-300;
	}
</style>
