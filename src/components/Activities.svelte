<script>
  import { getActivities } from "@/services/api";
  import { onMount } from "svelte";

  let activities;

  onMount(() => loadActivities());

  const loadActivities = async () => {
    const { data } = await getActivities();
    if (data) {
      activities = data.filter((activity) => activity.type == "Ride");
    }
    console.log(activities);
  };

  const elevationGain = (activity) => {
    return Math.floor(
      (activity.total_elevation_gain / activity.distance) * 4000
    );
  };

  const speed = (activity) => {
    return Math.floor(activity.average_speed * 25 - 90);
  };

  const distance = (activity) => {
    return Math.floor(activity.distance / 500);
  };
</script>

{#if activities}
  <section class="flex flex-col items-center gap-4">
    {#each activities as activity}
      <div class="relative">
        <div
          class="activity"
          style="width: {distance(activity)}px; height: {distance(
            activity
          )}px; opacity: {speed(activity)}%;
            10}% 0% 0%);"
        >
          <div
            class="activity__elevation-gain"
            style="height: {elevationGain(activity)}%"
          ></div>
        </div>
        <span
          class="absolute bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-52 text-center hidden"
          >{activity.name}</span
        >
      </div>
    {/each}
  </section>
{/if}

<style lang="scss">
  .activity {
    border-radius: 100%;
    border: 1px solid theme("colors.black");
    position: relative;
    overflow: hidden;

    &__elevation-gain {
      position: absolute;
      left: 0;
      bottom: 0;
      background-color: black;
      width: 100%;
      height: 100%;
    }
  }
</style>
