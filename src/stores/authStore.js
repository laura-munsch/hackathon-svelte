import { writable } from "svelte/store";

const apiKeyStore = writable("");
const accountStore = writable({});

export { apiKeyStore, accountStore };
