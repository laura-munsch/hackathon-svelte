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

<a href={authorizationUrl}> Autoriser la connexion avec Strava </a>
