import { useQuery, useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { FaEdit, FaTrashAlt, FaSearch } from "react-icons/fa";
import Swal from "sweetalert2";
import { api } from "../../contexts/AuthProvider";

const ManageUsers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [searchText, setSearchText] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, refetch, isLoading, isError, error } = useQuery({
    queryKey: ["users", currentPage, searchText],
    queryFn: async () => {
      const response = await api.get("/api/users", {
        params: {
          page: currentPage,
          limit: usersPerPage,
          searchText: searchText,
        },
      });
      return response.data;
    },
    keepPreviousData: true,
  });

  const { users, totalUsers, totalPages } = data || {};

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleRoleChange = () => {
    if (!newRole) {
      Swal.fire("Error", "Please select a role", "error");
      return;
    }

    api
      .patch(`/api/auth/changerole/${selectedUser._id}`, { role: newRole })
      .then(() => {
        refetch();
        Swal.fire("Success", `Role changed to ${newRole}`, "success");
        setIsModalOpen(false);
        setSelectedUser(null);
      })
      .catch((err) => {
        Swal.fire("Error", "Failed to update role", "error");
        console.error(err);
      });
  };

  const handleDeleteUser = (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This user will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        api
          .delete(`/api/auth/delete/${userId}`)
          .then(() => {
            Swal.fire("Deleted!", "User has been deleted.", "success");

            setCurrentPage(1);
          })
          .catch((err) => {
            Swal.fire("Error", "Failed to delete user", "error");
            console.error(err);
          });
      }
    });
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    setCurrentPage(1);
  };

  if (isError) return <div>{error.message}</div>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-6">Manage Users</h2>

      <div className="badge badge-primary mb-4">Total Users: {totalUsers}</div>

      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Search by name or email"
          className="input input-bordered w-full max-w-xs"
          value={searchText}
          onChange={handleSearchChange}
        />
        <button className="btn btn-primary ml-2">
          <FaSearch />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-auto w-full text-gray-700 shadow-md rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={4}>Loading...</td>
              </tr>
            )}
            {users?.map((user) => (
              <tr key={user.id} className="hover:bg-gray-100">
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">
                  <span
                    className={`badge badge-${
                      user.role === "admin"
                        ? "primary"
                        : user.role === "tutor"
                        ? "warning"
                        : "secondary"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="p-3">
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={() => {
                      setSelectedUser(user);
                      setNewRole(user.role);
                      setIsModalOpen(true);
                    }}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="btn btn-sm btn-error ml-2"
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-4">
        <div className="btn-group space-x-2">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              className={`btn btn-sm ${
                currentPage === index + 1 ? "btn-primary" : "btn-outline"
              }`}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {isModalOpen && selectedUser && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="text-xl font-semibold mb-4">
              Change Role for {selectedUser.name}
            </h3>
            <div className="mb-4">
              <select
                className="select select-bordered w-full"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
              >
                <option value="admin">Admin</option>
                <option value="student">Student</option>
                <option value="tutor">Tutor</option>
              </select>
            </div>
            <div className="modal-action">
              <button className="btn btn-primary" onClick={handleRoleChange}>
                Save Changes
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setIsModalOpen(false)}
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

export default ManageUsers;
