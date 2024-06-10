import axios from "axios";

import { apiKeyStore } from "@/stores";

// TODO: move baseUrl in .env
axios.defaults.baseURL = "https://www.strava.com/api/v3/";

apiKeyStore.subscribe((value) => {
  axios.defaults.headers["Authorization"] = `Bearer ${value}`;
});

const getAccount = async () => {
  return axios.get("/athlete");
};

const getActivities = async () => {
  return axios.get(`/athlete/activities`);
};

export { getAccount, getActivities };
