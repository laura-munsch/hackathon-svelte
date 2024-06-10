<script>
  import { accountStore, apiKeyStore } from "@/stores";
  import { getAccount } from "@/services/api";

  let value = "";

  const handleSubmit = async () => {
    apiKeyStore.update(() => value);
    const { data } = await getAccount();
    updateAccountStore(data);
  };

  const updateAccountStore = (data) => {
    accountStore.update(() => ({
      firstname: data.firstname,
      picture: data.profile,
    }));
  };
</script>

<form on:submit|preventDefault={handleSubmit}>
  <label>
    Clé API Strava
    <input bind:value type="text" />
  </label>

  <button type="submit">Ok</button>
</form>
