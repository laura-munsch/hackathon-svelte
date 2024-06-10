<script>
  import { Login } from "@/components";
  import { accountStore } from "@/stores";

  let firstname;

  accountStore.subscribe((value) => (firstname = value.firstname));
</script>

<main>
  {#if firstname}
    <p>Bienvenue {firstname}</p>
  {:else}
    <Login />
  {/if}
</main>
