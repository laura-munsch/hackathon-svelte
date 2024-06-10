<script>
  import { getActivities } from "@/services/api";
  import { onMount } from "svelte";

  let activities;

  const loadActivities = async () => {
    const { data } = await getActivities();
    if (data) activities = data;
  };

  onMount(() => loadActivities());
</script>

{#if activities}
  <ul>
    {#each activities as activity}
      <li>{activity.name}</li>
    {/each}
  </ul>
{/if}
