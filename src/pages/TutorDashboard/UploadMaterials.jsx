import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useStudySessions from "../../hooks/useStudySessions";
import useUser from "../../hooks/useUser";
import { api } from "../../contexts/AuthProvider";

const UploadMaterials = () => {
  const [selectedSession, setSelectedSession] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { user } = useUser();

  const {
    data: sessions,
    isLoading,
    isError,
    error,
    refetch,
  } = useStudySessions(user?.email);

  const onSubmit = async (data) => {
    setIsUploading(true);

    const inputData = {
      ...data,
      sessionId: selectedSession._id,
      tutorName: user?.name,
      tutorEmail: user?.email,
    };

    const formData = new FormData();

    formData.append("title", inputData.title);
    formData.append("sessionId", inputData.sessionId);
    formData.append("tutorName", inputData.tutorName);
    formData.append("tutorEmail", inputData.tutorEmail);

    if (data.image[0]) {
      formData.append("image", data.image[0]);
    }

    formData.append("link", inputData.link);

    try {
      const response = await api.post("/api/materials/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        Swal.fire("Success", "Material uploaded successfully!", "success");

        reset();
        setSelectedSession(null);
      }
    } catch (error) {
      Swal.fire(
        "Error",
        "Failed to upload material. Please try again.",
        "error"
      );
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Upload Materials
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {sessions?.filter((item) => item.status === "accepted")?.length ===
          0 && (
          <p className="bg-red-700 text-white w-full text-center py-2 col-span-3">
            No data available
          </p>
        )}
        {sessions
          ?.filter((item) => item.status === "accepted")
          ?.map((session) => (
            <div
              key={session.id}
              className="border rounded-lg bg-white p-4 flex flex-col justify-between"
            >
              <img
                src={session.image}
                alt={session.title}
                className="h-32 w-full object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold">{session.title}</h3>
              <p className="text-gray-600">Session ID: {session._id}</p>
              <p className="text-gray-600">Tutor Email: {session.tutorEmail}</p>
              <button
                className="btn btn-primary mt-4"
                onClick={() => setSelectedSession(session)}
              >
                Upload Material
              </button>
            </div>
          ))}
      </div>

      {selectedSession && (
        <div className="modal modal-open">
          <div className="modal-box w-full max-w-3xl">
            <h3 className="text-xl font-semibold mb-4">
              Upload Materials for "{selectedSession.title}"
            </h3>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <div className="form-control">
                <label className="label font-medium">Title</label>
                <input
                  type="text"
                  className="input input-bordered"
                  placeholder="Enter material title"
                  {...register("title", { required: "Title is required" })}
                />
                {errors.title && (
                  <span className="text-red-500 text-sm">
                    {errors.title.message}
                  </span>
                )}
              </div>

              <div className="form-control">
                <label className="label font-medium">Study Session ID</label>
                <input
                  type="text"
                  className="input input-bordered bg-gray-200 cursor-not-allowed"
                  value={selectedSession._id}
                  readOnly
                  {...register("sessionId")}
                />
              </div>

              <div className="form-control">
                <label className="label font-medium">Tutor Email</label>
                <input
                  type="text"
                  className="input input-bordered bg-gray-200 cursor-not-allowed"
                  value={selectedSession.tutorEmail}
                  readOnly
                  {...register("tutorEmail")}
                />
              </div>

              <div className="form-control">
                <label className="label font-medium">Image Upload</label>
                <input
                  type="file"
                  id="test"
                  className="file-input file-input-bordered"
                  {...register("image", { required: "Image is required" })}
                />
                {errors.image && (
                  <span className="text-red-500 text-sm">
                    {errors.image.message}
                  </span>
                )}
              </div>

              <div className="form-control md:col-span-2">
                <label className="label font-medium">Material Link</label>
                <input
                  type="url"
                  className="input input-bordered"
                  placeholder="Enter Google Drive link"
                  {...register("link", {
                    required: "Link is required",
                    pattern: {
                      value: /https?:\/\/drive\.google\.com\/.+/,
                      message: "Enter a valid Google Drive link",
                    },
                  })}
                />
                {errors.link && (
                  <span className="text-red-500 text-sm">
                    {errors.link.message}
                  </span>
                )}
              </div>

              <div className="form-control md:col-span-3">
                <button
                  type="submit"
                  className={`btn btn-primary w-full ${
                    isUploading ? "btn-disabled" : ""
                  }`}
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <span className="flex items-center justify-center">
                      <span className="loading loading-spinner mr-2"></span>
                      Uploading...
                    </span>
                  ) : (
                    "Upload Material"
                  )}
                </button>
              </div>
            </form>

            <div className="modal-action">
              <button
                className="btn btn-secondary"
                onClick={() => setSelectedSession(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadMaterials;
