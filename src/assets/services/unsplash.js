import axios from "axios";

const API_URL = "https://api.unsplash.com";

const unsplashClient = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Client-ID ${process.env.VUE_APP_UNSPLASH_ACCESS_KEY}`,
  },
});

export const fetchPhotos = (query = "africa", page = 1, perPage = 8) => {
  return unsplashClient.get(`/search/photos`, {
    params: { query, page, per_page: perPage },
  });
};
