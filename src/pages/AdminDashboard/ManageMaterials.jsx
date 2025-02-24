import React, { useState, useEffect } from "react";
import { FaTrashAlt, FaSearch } from "react-icons/fa";
import Swal from "sweetalert2";
import { api } from "../../contexts/AuthProvider";

const ManageMaterials = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [materialsPerPage] = useState(6);
  const [searchTerm, setSearchTerm] = useState("");
  const [materials, setMaterials] = useState([]);
  const [totalMaterials, setTotalMaterials] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchMaterials = async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const response = await api.get("/api/materials/get-all-materials", {
        params: {
          query: searchTerm,
          page: currentPage,
          limit: materialsPerPage,
        },
      });
      setMaterials(response.data.materials);
      setTotalMaterials(response.data.totalMaterials);
    } catch (error) {
      console.error("Error fetching materials:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, [currentPage, searchTerm]);

  const handleDeleteMaterial = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await api.delete(`/api/materials/delete-material/${id}`);
        Swal.fire("Deleted!", "The material has been deleted.", "success");
        fetchMaterials();
      }
    } catch (error) {
      console.error("Error deleting material:", error);
      Swal.fire("Error", "Failed to delete material", "error");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchMaterials();
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const SkeletonCard = () => (
    <div className="animate-pulse card bg-gray-100 shadow-md rounded-lg p-4">
      <div className="w-full h-40 bg-gray-300 rounded-lg"></div>
      <div className="mt-4 h-5 bg-gray-300 rounded w-3/4"></div>
      <div className="mt-2 h-4 bg-gray-300 rounded w-1/2"></div>
      <div className="mt-2 h-4 bg-gray-300 rounded w-1/3"></div>
      <div className="mt-4 flex gap-2">
        <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-6">Manage Materials</h2>

      <div className="badge badge-primary mb-4">
        Total Materials: {totalMaterials || 0}
      </div>

      <form className="flex mb-4" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search by title, tutor, or session ID"
          className="input input-bordered w-full max-w-xs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="btn btn-primary ml-2">
          <FaSearch />
        </button>
      </form>

      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: materialsPerPage }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      )}

      {isError && <p>Error loading materials. Please try again.</p>}

      {!isLoading && !isError && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {materials.map((material) => (
            <div
              key={material._id}
              className="card bg-white shadow-md rounded-lg p-4"
            >
              <div className="flex flex-col gap-4">
                <img
                  src={material.image}
                  alt={material.title}
                  className="w-full h-40 object-cover rounded-lg"
                />
                <h3 className="font-semibold text-lg">{material.title}</h3>
                <p className="text-sm text-gray-600">
                  Uploaded by: {material.tutorName}
                </p>
                <p className="text-sm text-gray-600">
                  Session ID: {material.sessionId}
                </p>
                <div className="flex gap-2">
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleDeleteMaterial(material._id)}
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-center mt-4">
        <div className="btn-group">
          {[...Array(Math.ceil(totalMaterials / materialsPerPage))].map(
            (_, index) => (
              <button
                key={index + 1}
                className={`btn ${
                  currentPage === index + 1 ? "btn-active" : "btn-outline"
                }`}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageMaterials;
