import { api } from "../../contexts/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { Link } from "react-router-dom";

function StudySession() {
  const {
    data: sessions,
    isError,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["approvedSessions"],
    queryFn: async () => {
      const response = await api.get("/api/tutor/get-approved-sessions");

      if (response.status === 200) {
        return response.data.sessions;
      } else {
        throw new Error("Failed to fetch sessions");
      }
    },
    retry: 2,
  });

  if (isError) return <p>Error: {error.message}</p>;

  return (
    <section className="py-16 bg-gray-50">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-800">Study Sessions</h2>
        <p className="text-lg text-gray-600 mt-4">
          Join our interactive study sessions designed to help you understand
          difficult concepts and excel in your studies.
        </p>
      </div>
      <div className="w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mt-8">
        {isLoading ? (
          // Skeleton Loader
          Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="card bg-gray-200 animate-pulse rounded-lg overflow-hidden shadow-xl"
            >
              <div className="w-full h-48 bg-gray-300"></div>
              <div className="p-6">
                <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
                <div className="btn w-full bg-gray-300 h-10 rounded"></div>
              </div>
            </div>
          ))
        ) : sessions?.length ? (
          sessions.map((session) => (
            <div
              key={session._id}
              className="card bg-white shadow-xl rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="relative">
                <img
                  src={session.image || "https://via.placeholder.com/400x200"}
                  alt={session.title}
                  className="w-full h-48 object-cover"
                />
                <span
                  className={`absolute top-4 right-4 px-3 py-1 text-sm font-semibold rounded-full ${
                    moment().isSameOrBefore(moment(session.registrationEnd))
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {moment().isSameOrBefore(moment(session.registrationEnd))
                    ? "Ongoing"
                    : "Closed"}
                </span>
              </div>
              <div className="p-6">
                <h2 className="card-title text-2xl font-bold text-gray-800">
                  {session.title}
                </h2>

                <p className="text-sm text-gray-500 mt-2">
                  Tutor:{" "}
                  <span className="font-medium">{session.tutorName}</span>
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Fee:{" "}
                  <span className="font-medium">
                    {session.fee === 0 ? "Free" : `$${session.fee}`}
                  </span>
                </p>

                <div className="mt-4 text-sm text-gray-600 space-y-1">
                  <p>
                    <span className="font-medium">End Date:</span>{" "}
                    {moment(session.registrationEnd).format("LL")}
                  </p>
                </div>

                <Link
                  to={`/session-details/${session._id}`}
                  className={`btn w-full mt-4 ${
                    moment().isSameOrBefore(moment(session.registrationEnd))
                      ? "btn-primary"
                      : "btn-disabled"
                  }`}
                  disabled={
                    !moment().isSameOrBefore(moment(session.registrationEnd))
                  }
                >
                  {moment().isSameOrBefore(moment(session.registrationEnd))
                    ? "Read More"
                    : "Registration Closed"}
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>No approved sessions available</p>
        )}
      </div>
    </section>
  );
}

export default StudySession;
