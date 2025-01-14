import { petApi } from "@/apis";

export const petService = () => {
  return {
    getPet(petId: number) {
      return petApi
        .get("/{petId}", {
          petId,
        })
        .then((r) => r.data);
    },
  };
};
