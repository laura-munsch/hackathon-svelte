<script>
  import { onMount } from "svelte";

  import { Activity } from "@/components";
  import { translatedMonths } from "@/constants";
  import { getActivities } from "@/services/api";

  let activities = [];
  let showPrivate = false;
  let page = 1;
  let loading = true;

  onMount(() => loadActivities());

  $: activitiesByMonth = () => {
    // groupe activities by month
    return Object.groupBy(activities, (activity) => {
      const date = new Date(activity.start_date);
      return `${translatedMonths[date.getMonth()]} ${date.getFullYear()}`;
    });
  };

  const loadActivities = async () => {
    const { data } = await getActivities(page);

    if (data) {
      // only display cycling activities
      let newActivities = data.filter((activity) => activity.type == "Ride");

      activities = [...activities, ...newActivities];
      loading = false;
    }
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

<label
  class="bg-purple-300 text-purple-900 p-2 pr-4 rounded-full fixed left-4 bottom-4 z-10 flex gap-4"
>
  <input bind:checked={showPrivate} type="checkbox" class="sr-only peer" />
  <div
    class="relative w-11 h-6 bg-white peer-focus:outline-none peer-focus:ring-0 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:bg-white peer-checked:bg-purple-800 after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-purple-800 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"
  ></div>

  <span>Afficher les activités privées ?</span>
</label>

<section class="flex flex-col items-center gap-4">
  {#each Object.keys(activitiesByMonth()) as activityKey}
    <h2 class="text-xl my-4 text-purple-500">
      {activityKey}
    </h2>

    {#each activitiesByMonth()[activityKey] as activity}
      <Activity {activity} {showPrivate} />
    {/each}
  {/each}
</section>

{#if loading}
  <p class="text-3xl text-purple-800 text-center">. . .</p>
{/if}
