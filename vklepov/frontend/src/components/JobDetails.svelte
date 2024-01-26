<script lang="ts">
	import * as api from '../api';

	export let id: string;
	export let close: () => void;

	const statusText = {
    1: { text: "Queued", color: "bg-gray-300" },
    2: { text: "Completed", color: "bg-green-300" },
    3: { text: "Failed", color: "bg-red-300" }
  };
	const getMalwareSamples = (res: number[]) => res.map((e, i) => [e, i]).filter(v => !!v[0]).map(v => v[1]).join(' ');
</script>


{#await api.getJob(id) then job}
	<div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
		<div class="bg-white shadow-2xl p-8 rounded-lg w-96">
			<dl class="mb-4">
				<div>
					<dt class="font-bold">Status:</dt>
					<dd class="{statusText[job.status].color}">{statusText[job.status].text}</dd>
				</div>
				<div>
					<dt class="font-bold">Job ID:</dt>
					<dd>{job.id}</dd>
				</div>
				<div>
					<dt class="font-bold">Start Time:</dt>
					<dd>{new Date(job.created_at).toLocaleString()}</dd>
				</div>
				<div>
					<dt class="font-bold">Cost:</dt>
					<dd>{job.cost} coinz</dd>
				</div>
			</dl>
			<div>
				<h2 class="text-lg text-red-500 font-bold mb-2">Malware detected in:</h2>
				<ul class="h-96 overflow-auto">
					{getMalwareSamples(job.result)}
				</ul>
			</div>
			<button class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" on:click={close}>
				Close
			</button>
		</div>
	</div>
{/await}
