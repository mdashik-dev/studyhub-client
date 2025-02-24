import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useUser from "../../hooks/useUser";
import useMaterials from "../../hooks/useMaterials";
import { api } from "../../contexts/AuthProvider";

const AllMaterialsPage = () => {
  const { user } = useUser();

  const {
    data: materials,
    isLoading,
    isError,
    error,
    refetch,
  } = useMaterials(user?.email);

  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (selectedMaterial) {
      reset({
        title: selectedMaterial.title,
        link: selectedMaterial.link,
      });
    }
  }, [selectedMaterial, reset]);

  const onUpdate = async (data) => {
    setLoading(true);
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("link", data.link);

    if (data.image?.[0]) {
      formData.append("image", data.image[0]);
    }

    try {
      const response = await api.patch(
        `/api/materials/update-material/${selectedMaterial._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        Swal.fire("Success", "Material updated successfully!", "success");
        setSelectedMaterial(null);
        refetch();
        reset();
      } else {
        throw new Error("Failed to update material");
      }
    } catch (error) {
      console.error("Error updating material:", error);
      Swal.fire("Error", "Could not update the material. Try again!", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await api.delete(
            `/api/materials/delete-material/${id}`
          );
          if (response.status === 200) {
            Swal.fire("Deleted!", "The material has been deleted.", "success");
            refetch();
          } else {
            throw new Error("Failed to delete material");
          }
        } catch (error) {
          console.error("Error deleting material:", error);
          Swal.fire(
            "Error",
            "Could not delete the material. Try again!",
            "error"
          );
        }
      }
    });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        All Materials
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading &&
          Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="border rounded-lg bg-gray-100 p-4 animate-pulse"
            >
              <div className="h-32 bg-gray-300 rounded-md mb-4"></div>
              <div className="h-6 bg-gray-300 rounded mb-2 w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded mb-2 w-1/2"></div>
              <div className="h-4 bg-gray-300 rounded mb-4 w-full"></div>
              <div className="h-10 bg-gray-300 rounded w-1/2 mx-auto"></div>
            </div>
          ))}

        {!isLoading && materials?.length === 0 && (
          <p className="bg-red-700 text-white w-full text-center py-2 col-span-3">
            No data available
          </p>
        )}

        {!isLoading &&
          materials?.map((material) => (
            <div key={material._id} className="border rounded-lg bg-white p-4">
              <img
                src={material.image}
                alt={material.title}
                className="h-32 w-full object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold">{material.title}</h3>
              <p className="text-gray-600">Session ID: {material.sessionId}</p>
              <p className="text-gray-600">
                Tutor Email: {material.tutorEmail}
              </p>
              <a
                href={material.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline block mt-2"
              >
                View Material
              </a>
              <div className="flex justify-between mt-4">
                <button
                  className="btn btn-primary"
                  onClick={() => setSelectedMaterial(material)}
                >
                  Update
                </button>
                <button
                  className="btn btn-error"
                  onClick={() => handleDelete(material._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>

      {selectedMaterial && (
        <div className="modal modal-open">
          <div className="modal-box w-full max-w-3xl">
            <h3 className="text-xl font-semibold mb-4">Update Material</h3>
            <form
              onSubmit={handleSubmit(onUpdate)}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <div className="form-control">
                <label className="label font-medium">Title</label>
                <input
                  type="text"
                  className="input input-bordered"
                  {...register("title", { required: "Title is required" })}
                />
                {errors.title && (
                  <span className="text-red-500 text-sm">
                    {errors.title.message}
                  </span>
                )}
              </div>

              <div className="form-control">
                <label className="label font-medium">Session ID</label>
                <input
                  type="text"
                  className="input input-bordered bg-gray-200 cursor-not-allowed"
                  value={selectedMaterial.sessionId}
                  readOnly
                />
              </div>

              <div className="form-control">
                <label className="label font-medium">Tutor Email</label>
                <input
                  type="text"
                  className="input input-bordered bg-gray-200 cursor-not-allowed"
                  value={selectedMaterial.tutorEmail}
                  readOnly
                />
              </div>

              <div className="form-control">
                <label className="label font-medium">Image Upload</label>
                <input
                  type="file"
                  className="file-input file-input-bordered"
                  {...register("image")}
                />
              </div>

              <div className="form-control md:col-span-2">
                <label className="label font-medium">Material Link</label>
                <input
                  type="url"
                  className="input input-bordered"
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
                    loading ? "btn-disabled" : ""
                  }`}
                  disabled={loading}
                >
                  {loading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    "Update Material"
                  )}
                </button>
              </div>
            </form>

            <div className="modal-action">
              <button
                className="btn btn-secondary"
                onClick={() => setSelectedMaterial(null)}
                disabled={loading}
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

export default AllMaterialsPage;
