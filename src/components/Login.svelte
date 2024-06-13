<script>
  import { onMount } from "svelte";

  import { authStore } from "@/stores";
  import { authorizationUrl, getAuthToken } from "@/services/api";

  onMount(() => getCodeFromUrl());

  const getCodeFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    const code = params?.get("code");

    if (code) {
      authenticateUser(code);
    }
  };

  const authenticateUser = async (code) => {
    const { data } = await getAuthToken(code);

    if (data) {
      authStore.set({
        accessToken: data.access_token,
        firstname: data.athlete.firstname,
        picture: data.athlete.profile,
      });
    }
  };
</script>

<div class="text-center">
  <a
    href={authorizationUrl}
    class="bg-purple-800 text-white px-6 py-4 rounded-full hover:bg-purple-700"
  >
    Autoriser la connexion avec Strava 🪩
  </a>
</div>
