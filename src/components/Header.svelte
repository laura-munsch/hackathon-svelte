<script>
  export let firstname;
  export let picture;
</script>

<div
  class="header flex justify-between items-center bg-purple-100 text-purple-800 rounded-full pl-8 mb-8 fixed top-4 left-4 z-10"
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

<style lang="scss">
  .header {
    width: calc(100% - 2rem);
  }

  .profile-picture {
    animation-duration: 10s;
  }
</style>
