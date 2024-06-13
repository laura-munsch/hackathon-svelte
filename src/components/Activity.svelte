<script>
  export let activity;
  export let showPrivate;

  $: visibility = () => (activity.private && !showPrivate ? "hidden" : "");

  // @ts-ignore
  const { VITE_STRAVA_URL } = import.meta.env;

  const elevationGain = () =>
    Math.round((activity.total_elevation_gain / activity.distance) * 4000);

  const speed = () => Math.round(activity.average_speed * 25 - 90);

  const distance = () => Math.round(activity.distance / 500);

  const distanceInKm = () => Math.round(activity.distance / 1000);

  // average_speed is in m/s – we divide by 10 to round number with one decimal
  const speedInKmPerHour = () => Math.round(activity.average_speed * 36) / 10;

  const elevationGainInMeters = () => Math.round(activity.total_elevation_gain);

  const directUrl = () => `${VITE_STRAVA_URL}/activities/${activity.id}`;
</script>

<a
  class="relative rounded-full {visibility()}"
  href={directUrl()}
  target="_blank"
>
  <div
    class="activity"
    style="
      width: {distance()}px;
      height: {distance()}px;
      opacity: {speed()}%;"
  >
    <div
      class="activity__elevation-gain"
      style="height: {elevationGain()}%"
    ></div>
  </div>

  <div class="activity__infos absolute left-full top-1/2 w-56 ml-4">
    <h3>{activity.name}</h3>
    <p class="text-sm text-purple-400 mt-2">
      <strong>{distanceInKm()}</strong>km •
      <strong>{elevationGainInMeters()}</strong>m D+ •
      <strong>{speedInKmPerHour()}</strong>km/h
    </p>
  </div>
</a>

<style lang="scss">
  .activity {
    border-radius: 100%;
    border: 1px solid theme("colors.black");
    position: relative;
    overflow: hidden;
    transition: border 0.05s;

    &:hover {
      border: 4px solid theme("colors.purple.700");
    }

    &__elevation-gain {
      position: absolute;
      left: 0;
      bottom: 0;
      background-color: black;
      width: 100%;
      height: 100%;
    }

    &__infos {
      visibility: hidden;
      opacity: 0;
      transform: translateX(-0.5rem) translateY(-50%);
      transition:
        visibility 0s 0.3s,
        opacity 0.3s,
        transform 0.3s;

      strong {
        color: theme("colors.purple.900");
      }
    }

    &:hover ~ &__infos {
      visibility: visible;
      opacity: 1;
      transform: translateX(0) translateY(-50%);
      transition:
        visibility 0s,
        opacity 0.3s,
        transform 0.3s;
    }
  }
</style>
