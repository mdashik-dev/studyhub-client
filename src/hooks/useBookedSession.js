import { useQuery } from "@tanstack/react-query";
import { api } from "../contexts/AuthProvider";

const fetchBookeds = async (sessionId) => {
  const response = await api.get(`/api/isbooked`, {
    params: { sessionId },
  });

  if (!response || response.status !== 200) {
    throw new Error("Failed to fetch materials");
  }
  return response.data;
};

const useBookedSession = (sessionId) => {
  return useQuery({
    queryKey: ["bookeds"],
    queryFn: () => fetchBookeds(sessionId),
    retry: 2,
    enabled: !!sessionId,
  });
};

export default useBookedSession;
