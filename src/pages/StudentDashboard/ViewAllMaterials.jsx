import { useQuery } from "@tanstack/react-query";
import React from "react";
import useUser from "../../hooks/useUser";
import { api } from "../../contexts/AuthProvider";

const ViewAllMaterials = () => {
  const { user } = useUser();

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["currentUser", user?.id],
    queryFn: async () => {
      const response = await api.get(
        `/api/materials/get-bookedsession-materials?userId=${user?._id}`
      );

      if (!response || response.status !== 200) {
        throw new Error("Failed to fetch materials");
      }
      return response.data;
    },
    enabled: !!user?._id,
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-semibold text-center text-blue-600 mb-8">
        All Study Materials
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="card w-full bg-gray-100 shadow-xl border rounded-lg animate-pulse"
              >
                <div className="card-body p-6 space-y-4">
                  <div className="h-32 bg-gray-300 rounded-md w-full"></div>
                  <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                  <div className="h-10 bg-gray-300 rounded w-full mt-4"></div>
                </div>
              </div>
            ))
          : data?.materials?.map((material) => (
              <div
                key={material._id}
                className="card w-full bg-white shadow-xl border rounded-lg"
              >
                <div className="card-body">
                  <figure>
                    <img
                      src={material.image}
                      alt=""
                      className="max-h-32 object-cover"
                    />
                  </figure>
                  <h3 className="card-title text-xl font-semibold text-blue-600">
                    {material.title}
                  </h3>
                  <p>TutorName: {material.tutorName}</p>
                  <a
                    href={material.link}
                    target="_blank"
                    className="text-2xl font-bold underline"
                  >
                    Material Link
                  </a>
                  <p className="text-gray-700 mb-4">{material.description}</p>
                  <a
                    target="_blank"
                    href={material.image}
                    className="btn btn-primary w-full text-center"
                  >
                    Download Image
                  </a>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default ViewAllMaterials;
