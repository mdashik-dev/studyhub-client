import { useQuery } from "@tanstack/react-query";
import { api, AuthContext } from "../contexts/AuthProvider";
import { useContext } from "react";

const useUser = () => {
  const { user } = useContext(AuthContext);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["currentUser", user?.id],
    queryFn: async () => {
      if (!user?.id) {
        throw new Error("User Id is required");
      }
      const response = await api.get(`/api/auth/users/${user.id}`);
      return response.data.user;
    },
    enabled: !!user?.id,
  });

  return {
    user: data,
    isLoading,
    isError,
    error,
    refetch,
  };
};

export default useUser;
