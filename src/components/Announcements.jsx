import React, { useState, useEffect } from "react";
import moment from "moment";
import { api } from "../contexts/AuthProvider";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchAnnouncements();
  }, [currentPage]);

  const fetchAnnouncements = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`/api/announcements`, {
        params: { page: currentPage, limit: itemsPerPage },
      });
      setAnnouncements(response.data.announcements);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-center mb-6">Announcements</h2>

      {isLoading ? (
        <div>
          {Array.from({ length: itemsPerPage }).map((_, index) => (
            <div
              key={index}
              className="mb-4 p-4 border rounded-md shadow-sm animate-pulse"
            >
              <div className="h-6 bg-gray-300 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      ) : announcements?.length === 0 ? (
        <p className="text-center text-gray-500">No announcements available.</p>
      ) : (
        <ul>
          {announcements?.map((announcement) => (
            <li
              key={announcement._id}
              className="mb-4 p-4 border rounded-md shadow-sm"
            >
              <h3 className="text-lg font-semibold mb-2 text-blue-600">
                {announcement.title}
              </h3>
              <p className="text-gray-700 mb-2">{announcement.description}</p>
              <span className="text-sm text-gray-500">
                Posted on: {moment(announcement.createdAt).format("LL")}
              </span>
            </li>
          ))}
        </ul>
      )}

      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Previous
        </button>
        <div className="flex gap-2">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded-md ${
                  page === currentPage
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white"
                }`}
              >
                {page}
              </button>
            )
          )}
        </div>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Announcements;
