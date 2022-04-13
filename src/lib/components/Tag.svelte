<script lang="ts">
	import { tags } from "./tags";

	export let name: string;
</script>

<span class="px-2 py-1 text-xs font-medium text-gray-700 bg-{tags[name] || 'gray'}-100 rounded">
	{name}
</span>
