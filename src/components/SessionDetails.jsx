import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { api } from "../contexts/AuthProvider";
import useUser from "../hooks/useUser";
import useReviews from "../hooks/useFetchReviews";
import useBookedSession from "../hooks/useBookedSession";

const SessionDetails = () => {
  const { id } = useParams();
  const { user } = useUser();
  const navigate = useNavigate();

  const { data, error } = useBookedSession(id);

  const { data: session } = useQuery({
    queryKey: ["sessionDetails"],
    queryFn: async () => {
      const response = await api.get(`/api/tutor/get-session/${id}`);
      return response.data;
    },
    retry: 2,
  });

  const isRegistrationClosed = moment().isAfter(
    moment(session?.registrationEndDate)
  );
  const { data: reviews } = useReviews(id);
  const handleBookNow = async () => {
    if (isRegistrationClosed) {
      Swal.fire({
        title: "Registration Closed",
        text: "The registration period for this session has passed.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } else {
      if (Number(session?.fee) !== 0) {
        navigate(`/payment/${session?._id}`);
      } else {
        try {
          const response = await api.post("/api/booksession", {
            sessionId: session?._id,
            userId: user?._id,
            paymentDetails: {},
          });
          if (response.status === 201) {
            Swal.fire({
              title: "Booking Successful",
              text: "You have successfully booked this session!",
              icon: "success",
            });
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Booking Failed",
            text: error?.response?.data?.error || "Failed to book",
          });
        }
      }
    }
  };

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative mb-8">
          <img
            src={session?.image}
            alt={session?.title}
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50"></div>
        </div>

        <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
          {session?.title}
        </h2>
        <p className="text-xl text-center text-gray-600 mb-8">
          {session?.description}
        </p>

        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-gray-800">
            Tutor: {session?.tutorName}
          </h3>
          <div className="flex items-center mt-2">
            <span className="text-lg font-semibold">Average Rating:</span>
            <span className="ml-2 text-xl">{session?.averageRating} / 5</span>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-800">
              Session Details
            </h3>
            <div className="flex justify-between">
              <span className="text-gray-600">Registration Start Date:</span>
              <span>
                {moment(session?.registrationStart).format("MMMM Do YYYY")}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Registration End Date:</span>
              <span>
                {moment(session?.registrationEnd).format("MMMM Do YYYY")}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Class Start Time:</span>
              <span>{session?.classStartTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Class End Time:</span>
              <span>{session?.classEndTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Session Duration:</span>
              <span>{session?.duration} hours</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Registration Fee:</span>
              <span>${session?.fee}</span>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-gray-800">Reviews</h3>
          <div className="space-y-4 mt-4">
            {reviews?.length > 0 ? (
              reviews.map((review, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg shadow-sm bg-white"
                >
                  <div className="flex flex-col justify-center">
                    <span className="font-semibold">{review.userName}</span>
                    <div className=" text-yellow-500">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={`text-lg ${
                            review.rating >= star
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <i className="mt-2">{review.reviewText}</i>
                </div>
              ))
            ) : (
              <p>No reviews yet. Be the first to leave a review!</p>
            )}
          </div>
        </div>

        <div className="mt-8 text-center">
          {isRegistrationClosed ? (
            <button
              disabled
              className="px-6 py-3 text-white bg-gray-500 rounded-md cursor-not-allowed"
            >
              Registration Closed
            </button>
          ) : (
            <>
              {data?.isBooked == true ? (
                <button
                  disabled
                  className="px-6 py-3 text-white bg-blue-200 rounded-md"
                >
                  Already Booked
                </button>
              ) : (
                <button
                  onClick={handleBookNow}
                  className="px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none"
                >
                  Book Now
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SessionDetails;
