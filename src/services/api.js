import axios from "axios";

import { authStore } from "@/stores";

const {
  VITE_STRAVA_URL,
  VITE_STRAVA_CLIENT_ID,
  VITE_APP_BASE_URL,
  VITE_STRAVA_API_VERSION,
  // @ts-ignore
} = import.meta.env;

axios.defaults.baseURL = `${VITE_STRAVA_URL}/api/v${VITE_STRAVA_API_VERSION}/`;

authStore.subscribe((user) => {
  if (user?.accessToken) {
    axios.defaults.headers["Authorization"] = `Bearer ${user.accessToken}`;
  }
});

const authorizationUrl = `${VITE_STRAVA_URL}/oauth/authorize?client_id=${VITE_STRAVA_CLIENT_ID}&response_type=code&redirect_uri=${VITE_APP_BASE_URL}&approval_prompt=force&scope=activity:read_all`;

const getAuthToken = async (code) => {
  return axios.post(`${VITE_STRAVA_URL}/oauth/token`, {
    client_id: 128298,
    client_secret: "7a5c5252a675d1a725c5ca3cce03d34dfe2e6855",
    grant_type: "authorization_code",
    code,
  });
};

const getActivities = async (page) => {
  return axios.get(`/athlete/activities`, {
    params: {
      page,
      per_page: 50,
    },
  });
};

export { authorizationUrl, getAuthToken, getActivities };
