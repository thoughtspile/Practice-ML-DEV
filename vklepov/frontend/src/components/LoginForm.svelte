<script lang="ts">
	import * as api from '../api';

	let data = { username: '', password: '' };
	async function login(e: SubmitEvent) {
		await api.login(new FormData(e.currentTarget as HTMLFormElement));
		location.assign('/');
	}
	async function register() {
		await api.register({ email: data.username, password: data.password });
		location.assign('/');
	}
</script>
<div class="flex h-screen items-center justify-center bg-gradient-to-br from-purple-400 to-pink-500">
  <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" on:submit|preventDefault={login}>
		<h2 class="mb-4">Malware hunter</h2>
    <div class="mb-4">
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required name="username" bind:value={data.username} placeholder="Email" />
    </div>
    <div class="mb-6">
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" required name="password" bind:value={data.password} type="password" placeholder="Password" />
    </div>
    <div class="flex items-center justify-between">
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
        Log in
      </button>
      <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" on:click={register}>
        Register
      </button>
    </div>
  </form>
</div>
