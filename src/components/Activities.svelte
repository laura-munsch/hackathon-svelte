<script>
  import { getActivities } from "@/services/api";
  import { onMount } from "svelte";

  let activities = [];
  let showPrivate = true;
  let page = 1;
  let loading = true;

  onMount(() => loadActivities());

  const loadActivities = async () => {
    console.log("load activities");
    const { data } = await getActivities(page);
    if (data) {
      activities = [
        ...activities,
        ...data.filter((activity) => activity.type == "Ride"),
      ];
      loading = false;
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

  const handleScroll = (e) => {
    const documentHeight = document.body.scrollHeight - window.innerHeight;

    if (window.scrollY >= documentHeight - 200 && !loading) {
      loading = true;
      page++;
      loadActivities();
    }
  };
</script>

<svelte:window on:scroll={handleScroll} />

{#if activities.length > 1}
  <label
    class="bg-purple-300 text-purple-900 px-4 py-2 rounded-full fixed left-4 bottom-4"
  >
    <input type="checkbox" bind:checked={showPrivate} />
    Afficher les activités privées ?
  </label>

  <section class="flex flex-col items-center gap-4">
    {#each activities as activity}
      <div class="relative {activity.private && !showPrivate ? 'hidden' : ''}">
        <div
          class="activity"
          style="
            width: {distance(activity)}px;
            height: {distance(activity)}px;
            opacity: {speed(activity)}%;"
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
