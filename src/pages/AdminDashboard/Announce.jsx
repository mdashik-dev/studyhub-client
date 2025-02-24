import React, { useState } from "react";
import Swal from "sweetalert2";
import { api } from "../../contexts/AuthProvider";

const Announce = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Both title and description are required.",
      });
      return;
    }

    try {
      const response = await api.post("/api/announcements", {
        title,
        description,
      });

      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Announcement Created!",
          text: "Your announcement has been successfully created.",
        });

        setTitle("");
        setDescription("");
      } else {
        throw new Error("Failed to create announcement.");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong while creating the announcement.",
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-6">
      <h2 className="text-2xl font-bold text-center mb-6">
        Create Announcement
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 font-medium mb-2"
          >
            Announcement Title
          </label>
          <input
            type="text"
            id="title"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter the announcement title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-medium mb-2"
          >
            Announcement Description
          </label>
          <textarea
            id="description"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter the announcement details"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="text-right">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Create Announcement
          </button>
        </div>
      </form>
    </div>
  );
};

export default Announce;
