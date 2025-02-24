import { useQuery } from "@tanstack/react-query";
import { api } from "../contexts/AuthProvider";

const fetchReviews = async (sessionId) => {
  const response = await api.get(`/api/get-reviews`, {
    params: { sessionId },
  });

  if (!response || response.status !== 200) {
    throw new Error("Failed to fetch materials");
  }
  return response.data;
};

const useReviews = (sessionId) => {
  return useQuery({
    queryKey: ["reviews"],
    queryFn: () => fetchReviews(sessionId),
    retry: 2,
    enabled: !!sessionId,
  });
};

export default useReviews;
