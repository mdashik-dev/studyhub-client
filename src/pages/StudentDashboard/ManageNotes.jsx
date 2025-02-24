import React, { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useNotes from "../../hooks/useNotes";
import useUser from "../../hooks/useUser";
import moment from "moment";
import { api } from "../../contexts/AuthProvider";

const ManageNotes = () => {
  const { user } = useUser();
  const userEmail = user?.email;
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError, refetch } = useNotes(
    userEmail,
    currentPage,
    itemsPerPage
  );

  const totalPages = data?.totalPages || 1;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEdit = (note) => {
    Swal.fire({
      title: `Edit ${note.title}`,
      html: `
        <input type="text" id="swal-input1" class="swal2-input" placeholder="Title" value="${note.title}">
        <textarea id="swal-input2" class="swal2-textarea" placeholder="Content">${note.content}</textarea>
      `,
      focusConfirm: false,
      preConfirm: async () => {
        const title = document.getElementById("swal-input1").value;
        const content = document.getElementById("swal-input2").value;

        if (!title || !content) {
          Swal.showValidationMessage("Please fill out both fields");
        } else {
          try {
            const response = await api.put(`/api/update-note/${note._id}`, {
              title,
              content,
            });

            if (response.data.success) {
              refetch();
              Swal.fire({
                icon: "success",
                title: "Updated!",
                text: "Your note has been updated successfully.",
              });
            }
          } catch (error) {
            Swal.fire({
              icon: "error",
              title: "Error!",
              text: "An error occurred while updating the note. Please try again.",
            });
          }
        }
      },
    });
  };

  const handleDelete = (noteId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this note!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await api.delete(`/api/delete-note/${noteId}`);

          if (response.data.success) {
            refetch();
            Swal.fire("Deleted!", "Your note has been deleted.", "success");
          }
        } catch (error) {
          console.error("Error deleting note:", error);
          Swal.fire(
            "Error!",
            "An error occurred while deleting the note.",
            "error"
          );
        }
      }
    });
  };

  if (isError) {
    return <div>Error fetching notes!</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Manage Personal Notes</h2>

      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Content</th>
              <th className="px-4 py-2 text-left">Created At</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={4} className="text-center py-4">Loading...</td>
              </tr>
            )}
            {data?.notes?.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-4 text-red-500">You have no notes!</td>
              </tr>
            )}
            {data?.notes?.length > 0 &&
              data.notes.map((note) => (
                <tr key={note._id}>
                  <td className="px-4 py-2 border">{note.title}</td>
                  <td className="px-4 py-2 border">{note.content}</td>
                  <td className="px-4 py-2 border">{moment(note.createdAt).format("LL")}</td>
                  <td className="px-4 py-2 border text-center">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => handleEdit(note)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="ml-4 text-red-600 hover:text-red-800"
                      onClick={() => handleDelete(note._id)}
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-6">
        <div>
          <button
            className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
            <button
              key={pageNumber}
              className={`px-4 py-2 rounded-md ${
                pageNumber === currentPage
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white"
              }`}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}
        </div>

        <div>
          <button
            className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            onClick={() => handlePageChange(currentPage < totalPages ? currentPage + 1 : totalPages)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageNotes;
