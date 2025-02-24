import React, { useEffect } from "react";
import { FaCalendarAlt, FaChalkboardTeacher, FaClock } from "react-icons/fa";
import useBooked from "../../hooks/useFetchBookeds";
import useUser from "../../hooks/useUser";
import moment from "moment";
import { Link } from "react-router-dom";

const ViewBookedSession = () => {
  const { user } = useUser();
  const { data: bookedSessions, refetch, isLoading } = useBooked(user?.email);

  useEffect(() => {
    refetch();
  }, [user]);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
        View Your Booked Sessions
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="card w-full bg-gray-100 shadow rounded-lg overflow-hidden animate-pulse"
            >
              <div className="card-body p-6 space-y-4">
                <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                <div className="h-10 bg-gray-300 rounded w-full mt-4"></div>
              </div>
            </div>
          ))
        ) : bookedSessions?.length > 0 ? (
          bookedSessions.map((session) => (
            <div
              key={session.sessionId}
              className="card w-full bg-white shadow-xl border border-gray-200 rounded-lg overflow-hidden hover:shadow-2xl transition duration-300"
            >
              <div className="card-body p-6">
                <h3 className="text-xl font-semibold text-blue-700">
                  {session.sessionTitle}
                </h3>
                <p className="text-md text-gray-600 mt-2 flex items-center gap-2">
                  <FaCalendarAlt />
                  {moment(session.classStartDate).format("LL")}
                </p>
                <p className="text-md text-gray-600 mt-2 flex items-center gap-2">
                  <FaClock />
                  {session.classStart}
                </p>
                <p className="text-md text-gray-600 mt-2 flex items-center gap-2">
                  <FaChalkboardTeacher />
                  {session.tutorName}
                </p>
                <div className="mt-4">
                  <Link
                    to={`/view-booked-session/${session.sessionId}`}
                    className="btn btn-primary w-full"
                  >
                    View Session
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No booked sessions available.
          </p>
        )}
      </div>
    </div>
  );
};

export default ViewBookedSession;
