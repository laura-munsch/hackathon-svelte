<script>
  import { Activities, Header, Login } from "@/components";
  import { authStore } from "@/stores";

  let firstname;
  let picture;

  authStore.subscribe((user) => {
    firstname = user.firstname;
    picture = user.picture;
  });
</script>

<main class="w-full h-full pt-32">
  {#if firstname}
    <Header {firstname} {picture} />
    <Activities />
  {:else}
    <Login />
  {/if}
</main>
