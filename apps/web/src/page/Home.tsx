import { BASE_URL } from "@/apis";
import { petService, useService } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ReactJson from "react-json-view";

export const Home = () => {
  const petApi = useService(petService);
  const [petId, setPetId] = useState<number>(2);

  const { data, isLoading } = useQuery({
    queryKey: ["pet-detail", petId],
    queryFn: () => petApi.getPet(petId!),
    enabled: !!petId,
  });

  return (
    <div className="container mx-auto my-10">
      <p className="text-2xl py-4 font-extrabold">
        Demo Generate API types from Swagger.json{" "}
      </p>
      <div className="flex gap-x-2 py-2">
        <p className="font-bold text-lg">BASE URL:</p>
        <p className="text-lg">{BASE_URL}</p>
      </div>
      <div className="flex gap-x-2 py-2">
        <p className="font-bold text-lg">[GET]:</p>
        <p className="text-lg">{`/pet/`}</p>
        <input
          type="number"
          id="input"
          onChange={(e) => {
            const value = parseInt(e.target.value, 10);
            if (value < 0) return;
            setPetId(value);
          }}
          value={petId}
          className="focus:border-gray-300 rounded-md focus:outline-none focus:ring-2 w-8"
          placeholder="Type here..."
        />
      </div>

      {isLoading && <p>Loading</p>}
      {!!data && !isLoading ? <ReactJson src={data} /> : <p>Not Found</p>}
    </div>
  );
};
