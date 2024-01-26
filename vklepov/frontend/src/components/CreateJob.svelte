<script lang="ts">
	import * as api from '../api';

	export let close: () => void;

	let selectedModelId = '';
	const models = api.models();
	async function submit(e: SubmitEvent) {
		const fileData = new FormData(e.currentTarget as HTMLFormElement);
		await api.startJob(selectedModelId, fileData);
		location.assign('/');
	}
</script>

<div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
	<div class="bg-white shadow-2xl p-8 rounded-lg">
		<form on:submit|preventDefault={submit} class="flex items-start flex-col text-black">
			{#await models then models}
				<select required bind:value={selectedModelId} class="my-4">
					<option value="">Select model</option>
					{#each models as model}
						<option value={model.id}>{model.name} ({model.cost} coinz)</option>
					{/each}
				</select>
			{/await}
			<label for="file-input" class="relative my-4">
				Upload file
				<input id="file-input" type="file" name="file" class="inset-0 w-full h-full cursor-pointer" />
			</label>

			<button class="bg-red-500 hover:bg-red-700 text-whitemt-4 font-bold py-2 px-4 rounded" on:click={close}>
				Close
			</button>
			<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
				Find malware
			</button>
		</form>
	</div>
</div>
