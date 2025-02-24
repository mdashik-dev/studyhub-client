import React, { useContext } from "react";
import { api, AuthContext } from "../contexts/AuthProvider";
import { useQuery } from "@tanstack/react-query";

function LoginHistory() {
  const { user } = useContext(AuthContext);

  const { data, isLoading, refetch, isError, error } = useQuery({
    queryKey: ["loginHistory"],
    queryFn: async () => {
      const response = await api.get(`/api/auth/login-history/${user?.id}`);
      return response.data.histories;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError)
    return <div>{error?.message || "Failed to load login history"}</div>;

  const handleLogout = async (id) => {
    const response = await api.delete(`/api/auth/login-history/${id}`);
    if (response) {
      refetch();
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Login History</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Date</th>
              <th className="border border-gray-300 px-4 py-2">OS</th>
              <th className="border border-gray-300 px-4 py-2">Device</th>
              <th className="border border-gray-300 px-4 py-2">Browser</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((entry, index) => (
              <tr key={index} className="text-center">
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(entry.timestamp).toLocaleString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {entry.os || "N/A"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {entry.device || "N/A"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {entry.browser || "N/A"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="btn btn-ghost bg-primary text-white btn-sm"
                    onClick={() => handleLogout(entry._id)}
                  >
                    Logout
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LoginHistory;
