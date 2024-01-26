<script lang="ts">
	import * as api from '../api';
  import CreateJob from './CreateJob.svelte';
  import JobDetails from './JobDetails.svelte';

	let isCreate = false;
	let activeJob: string | null = null;

	const balance = api.balance();
	const jobs = api.listJobs();
	const statusText = {
    1: { text: "Queued", color: "bg-gray-300" },
    2: { text: "Completed", color: "bg-green-300" },
    3: { text: "Failed", color: "bg-red-300" }
  };
</script>

{#if isCreate}
	<CreateJob close={() => isCreate = false} />
{/if}

{#if activeJob}
	<JobDetails id={activeJob} close={() => activeJob = null} />
{/if}


<div class="sticky top-0 bg-white p-4 flex justify-between items-center mb-4">
	<div>
		<h1 class="text-2xl font-bold mb-2">Balance: {#await balance then { balance }}{balance} coinz{/await}</h1>
	</div>
	<button
		class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
		on:click={() => isCreate = !isCreate}
	>
		{isCreate ? 'Close' : 'Create New Job'}
	</button>
</div>
<div class="p-8">

  <h2 class="text-2xl font-bold mb-2 text-white">List of ML Jobs</h2>
  {#await jobs then jobs}
    <div>
      {#each jobs as job}
        <a class="bg-gray-100 p-4 flex justify-between items-center mb-4 rounded-md" href="#" on:click={() => activeJob = job.id}>
          <p class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full {statusText[job.status].color}">{statusText[job.status].text}</p>
          <p>Job ID: {job.id}</p>
          <p>Started at: {new Date(job.created_at).toLocaleString()}</p>
          <p>Cost: {job.cost} coinz</p>
				</a>
      {/each}
    </div>
  {/await}
</div>
