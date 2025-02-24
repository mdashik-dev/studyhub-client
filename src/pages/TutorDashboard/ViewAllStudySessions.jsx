import React, { useState } from "react";
import useStudySessions from "../../hooks/useStudySessions";
import useUser from "../../hooks/useUser";
import moment from "moment";
import Swal from "sweetalert2";
import { api } from "../../contexts/AuthProvider";

const ViewAllStudySessions = () => {
  const { user } = useUser();
  const [viewRejection, setviewRejection] = useState(false);
  const {
    data: sessions,
    isLoading,
    isError,
    error,
    refetch,
  } = useStudySessions(user?.email);

  const handleRequest = async (sessionId) => {
    try {
      const res = await api.post(`/api/update-study-seesion/${sessionId}`, {
        status: "requested",
      });

      if (res.status === 200) {
        refetch();
        Swal.fire("Success", `Session status updated to requested`, "success");
      }
    } catch (error) {
      Swal.fire("Error!", "Something went wrong. Please try again.", "error");
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
        View All Study Sessions
      </h2>
      {sessions?.length === 0 && (
        <p className="w-full py-2 bg-red-700 text-white text-center">
          No data available!
        </p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading &&
          // Skeleton Loader
          Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="bg-gray-100 shadow-lg rounded-lg overflow-hidden border border-gray-200 animate-pulse"
            >
              <div className="w-full h-40 bg-gray-300"></div>
              <div className="p-6 space-y-4">
                <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                <div className="h-10 bg-gray-300 rounded w-full mt-4"></div>
              </div>
            </div>
          ))}
        {!isLoading &&
          sessions?.map((session) => {
            return (
              <div
                key={session._id}
                className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200"
              >
                <img
                  src={session.image}
                  alt={session.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {session?.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {session.description.slice(0, 100)}...
                  </p>
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    <span className="font-bold">Tutor:</span>{" "}
                    {session.tutorName}
                  </p>
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    <span className="font-bold">Class Time:</span>{" "}
                    {session.classStartTime}
                    {" - "}
                    {session.classEndTime}
                  </p>
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    <span className="font-bold">Registration:</span>{" "}
                    {moment(session.registrationStart).format("LL")} -{" "}
                    {moment(session.registrationEnd).format("LL")}
                  </p>
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    <span className="font-bold">Fee:</span> ${session.fee}
                  </p>
                  <p className="text-sm font-medium text-gray-700 mb-4">
                    <span className="font-bold">Max Participants:</span>{" "}
                    {session.maxParticipants}
                  </p>

                  {session.status === "pending" && (
                    <p className="px-4 py-1 rounded-lg uppercase text-center bg-orange-600/60">
                      Pending..
                    </p>
                  )}
                  {session.status === "accepted" && (
                    <p className="px-4 py-1 rounded-lg uppercase text-center bg-green-600/60">
                      Approved
                    </p>
                  )}
                  {session.status === "requested" && (
                    <p className="px-4 py-1 rounded-lg uppercase text-center bg-blue-600/60">
                      Requested
                    </p>
                  )}
                  {session.status === "rejected" && (
                    <>
                      <div role="alert" className="alert alert-error">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 shrink-0 stroke-current"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>Admin Rejected you session.</span>

                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => handleRequest(session._id)}
                        >
                          Request
                        </button>
                      </div>
                      <p
                        onClick={() => setviewRejection(!viewRejection)}
                        className="underline text-red-700 cursor-pointer mt-2 pl-3"
                      >
                        View Rejection
                      </p>
                      {viewRejection && (
                        <div>
                          {session?.rejectionReason && (
                            <p>Reason: {session?.rejectionReason}</p>
                          )}
                          {session?.feedback && (
                            <p>Feedback: {session?.feedback}</p>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ViewAllStudySessions;
