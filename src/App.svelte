<script>
  import { Activities, Login } from "@/components";
  import { accountStore } from "@/stores";

  let firstname;

  accountStore.subscribe((value) => (firstname = value.firstname));
</script>

<main>
  {#if firstname}
    <h1>Bienvenue {firstname}</h1>

    <Activities />
  {:else}
    <Login />
  {/if}
</main>
