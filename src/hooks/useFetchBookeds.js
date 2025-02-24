import { useQuery } from "@tanstack/react-query";
import { api } from "../contexts/AuthProvider";

const fetchBookeds = async (userEmail) => {
  const response = await api.get(`/api/get-bookeds`, {
    params: { userEmail },
  });

  if (!response || response.status !== 200) {
    throw new Error("Failed to fetch materials");
  }
  return response.data.data;
};

const useBooked = (userEmail) => {
  return useQuery({
    queryKey: ["bookeds"],
    queryFn: () => fetchBookeds(userEmail),
    retry: 2,
  });
};

export default useBooked;
