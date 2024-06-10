<script>
  import { accountStore, apiKeyStore } from "@/stores";
  import { getAccount } from "@/services/api";

  let value = "";

  const handleSubmit = () => {
    apiKeyStore.set(value);
    loadAccount();
  };

  const loadAccount = async () => {
    const { data } = await getAccount();
    if (data) {
      accountStore.set({
        firstname: data.firstname,
        picture: data.profile,
      });
    }
  };
</script>

<form on:submit|preventDefault={handleSubmit}>
  <label>
    Clé API Strava
    <input bind:value type="text" />
  </label>

  <button type="submit">Ok</button>
</form>
