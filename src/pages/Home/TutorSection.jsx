import React from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../contexts/AuthProvider";

function TutorSection() {
  const {
    data: tutors = [],
    isError,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["tutors"],
    queryFn: async () => {
      const response = await api.get("/api/tutor/get-tutors");
      return response.data;
    },
    retry: 2,
  });

  if (isError)
    return (
      <p className="text-center text-red-500 text-lg">Error: {error.message}</p>
    );

  return (
    <section className="py-16 bg-blue-100">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-800">Meet Our Tutors</h2>
        <p className="text-lg text-gray-600 mt-4">
          Our experienced tutors are here to guide you every step of the way.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 px-8">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="card bg-white shadow-xl rounded-lg p-6 animate-pulse"
              >
                <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto"></div>
                <div className="mt-6">
                  <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
                </div>
              </div>
            ))
          : tutors.map((tutor) => (
              <div
                key={tutor._id}
                className="card bg-white shadow-xl rounded-lg"
              >
                <figure>
                  <img
                    src={tutor.photoURL}
                    alt={tutor.name}
                    className="rounded-full w-32 h-32 mx-auto mt-4 object-cover"
                  />
                </figure>
                <div className="card-body text-center">
                  <h3 className="text-xl font-semibold">{tutor.name}</h3>
                </div>
              </div>
            ))}
      </div>
    </section>
  );
}

export default TutorSection;
