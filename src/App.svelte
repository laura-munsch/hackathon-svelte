<script>
  import { Activities, Login } from "@/components";
  import { authStore } from "@/stores";

  let firstname;
  let picture;

  authStore.subscribe((user) => {
    firstname = user.firstname;
    picture = user.picture;
  });
</script>

<main class="w-full h-full">
  {#if firstname}
    <div
      class="flex justify-between items-center bg-purple-100 text-purple-800 rounded-full pl-8 mb-8"
    >
      <h1 class="text-2xl">Bienvenue {firstname}</h1>
      {#if picture}
        <img
          src={picture}
          alt="Portrait de {firstname}"
          class="rounded-full w-24 h-24 animate-spin profile-picture"
        />
      {/if}
    </div>

    <Activities />
  {:else}
    <Login />
  {/if}
</main>

<style lang="scss">
  .profile-picture {
    animation-duration: 10s;
  }
</style>
