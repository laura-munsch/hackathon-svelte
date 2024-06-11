<script>
  import { Activities, Login } from "@/components";
  import { authStore } from "@/stores";

  let firstname;

  authStore.subscribe((user) => (firstname = user.firstname));
</script>

<main>
  {#if firstname}
    <h1>Bienvenue {firstname}</h1>

    <Activities />
  {:else}
    <Login />
  {/if}
</main>
