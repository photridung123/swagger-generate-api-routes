import { API, createFetchApi } from "@pkg/libs";
import { PetRoutes } from "@pkg/types";
import { BASE_URL } from "./constant";

const petApiClient = new API(`${BASE_URL}/pet`, {
  headers: {
    "Content-Type": "application/json",
  },
});

export const petApi = createFetchApi<PetRoutes>(petApiClient);
