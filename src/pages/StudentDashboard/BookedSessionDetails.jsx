import React, { useEffect, useState } from "react";
import moment from "moment";
import Swal from "sweetalert2";
import { api } from "../../contexts/AuthProvider";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const BookedSessionDetails = () => {
  const { id } = useParams();
  const [reviewInput, setReviewInput] = useState("");
  const [rating, setRating] = useState(0);

  // Fetch booking details
  const fetchBookingDetails = async (sessionId) => {
    const response = await api.get(`/api/get-bookeds`, {
      params: { sessionId },
    });
    if (!response || response.status !== 200) {
      throw new Error("Failed to fetch booking details.");
    }

    return response?.data?.data[0];
  };

  const {
    data: booking,
    isLoading: isBookingLoading,
    isError: isBookingError,
    refetch: refetchBooking,
  } = useQuery({
    queryKey: ["book"],
    queryFn: () => fetchBookingDetails(id),
    retry: 2,
    enabled: !!id,
  });

  // Fetch reviews
  const fetchReviews = async (sessionId) => {
    const response = await api.get(`/api/get-reviews`, {
      params: { sessionId },
    });
    if (!response || response.status !== 200) {
      throw new Error("Failed to fetch reviews.");
    }
    return response.data;
  };

  const {
    data: reviews,
    isLoading: isReviewsLoading,
    isError: isReviewsError,
    refetch: refetchReviews,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: () => fetchReviews(id),
    retry: 2,
    enabled: !!id,
  });

  const handleReviewSubmit = async () => {
    if (!reviewInput || rating === 0) {
      Swal.fire({
        title: "Incomplete Review",
        text: "Please provide both a review and a rating.",
        icon: "warning",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    const newReview = {
      sessionId: booking?.sessionId,
      userId: booking?.userId,
      userName: booking?.userName,
      reviewText: reviewInput,
      rating,
      date: new Date().toISOString(),
    };

    try {
      const response = await api.post("/api/add-review", newReview);
      if (response && response.status === 201) {
        Swal.fire({
          title: "Review Submitted",
          text: "Your review has been successfully added.",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        });
        setReviewInput("");
        setRating(0);
        refetchReviews();
      }
    } catch (error) {
      Swal.fire({
        title: "Submission Failed",
        text: "Failed to submit the review. Please try again later.",
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  useEffect(() => {
    if (id) {
      refetchBooking();
      refetchReviews();
    }
  }, [id]);

  if (isBookingError || isReviewsError) {
    Swal.fire({
      title: "Error",
      text: "An error occurred while fetching data.",
      icon: "error",
      showConfirmButton: false,
      timer: 2000,
    });
    return null;
  }

  if (isBookingLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <h2 className="text-2xl font-semibold text-gray-600">
          Loading Booking details...
        </h2>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 bg-white shadow-lg rounded-lg">
        {/* Header Section */}
        <div className="py-8 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-800">
            {booking?.sessionTitle}
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Booking ID:{" "}
            <span className="font-medium">{booking?.bookingId}</span>
          </p>
        </div>

        {/* Session Details */}
        <div className="py-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">
              Session Details
            </h3>
            <ul className="mt-4 space-y-2 text-gray-600">
              <li>
                <span className="font-medium">Tutor Name:</span>{" "}
                {booking?.tutorName}
              </li>
              <li>
                <span className="font-medium">Registration Dates:</span>{" "}
                {moment(booking.registrationStartDate).format("LL")} to{" "}
                {moment(booking.registrationEndDate).format("LL")}
              </li>
              <li>
                <span className="font-medium">Class Timing:</span>{" "}
                {moment(booking?.classStartDate).format("LL")} from{" "}
                {booking?.classStart} to {booking?.classEnd}
              </li>
            </ul>
          </div>
        </div>

        {/* Review Section */}
        <div className="py-8 border-t border-gray-200">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Reviews and Ratings
          </h3>
          <div className="mb-6">
            <textarea
              className="w-full p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write your review here..."
              value={reviewInput}
              onChange={(e) => setReviewInput(e.target.value)}
            ></textarea>
            <div className="mt-4">
              <label className="text-gray-600 font-medium">Your Rating:</label>
              <div className="flex items-center mt-2 space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    className={`text-2xl ${
                      rating >= star ? "text-yellow-400" : "text-gray-300"
                    }`}
                    onClick={() => setRating(star)}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
            <button
              className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none"
              onClick={handleReviewSubmit}
            >
              Submit Review
            </button>
          </div>
          {reviews?.length > 0 ? (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div
                  key={review._id}
                  className="p-4 border rounded-md bg-gray-50 shadow-sm"
                >
                  <p className="text-gray-800 font-medium">
                    {review.userName} -{" "}
                    <span className="text-yellow-500">
                      {"★".repeat(review.rating)}
                    </span>
                  </p>
                  <p className="text-gray-600">{review.reviewText}</p>
                  <p className="text-gray-400 text-sm">
                    {moment(review.createdAt).fromNow()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No reviews yet. Be the first!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookedSessionDetails;
