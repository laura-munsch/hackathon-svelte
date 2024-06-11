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

<main>
  {#if firstname}
    <div class="p-4 flex justify-between items-center">
      <h1 class="text-2xl">Bienvenue {firstname}</h1>
      {#if picture}
        <img
          src={picture}
          alt="Portrait de {firstname}"
          class="rounded-full w-24 h-24"
        />
      {/if}
    </div>

    <Activities />
  {:else}
    <Login />
  {/if}
</main>
