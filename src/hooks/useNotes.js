import { useQuery } from "@tanstack/react-query";
import { api } from "../contexts/AuthProvider";

const fetchNotes = async (email, page, limit) => {
  const response = await api.get(`/api/get-notes`, {
    params: { email, page, limit },
  });

  if (!response || response.status !== 200) {
    throw new Error("Failed to fetch notes");
  }
  return response.data;
};

const useNotes = (email, page, limit) => {
  return useQuery({
    queryKey: ["notes", email, page],
    queryFn: () => fetchNotes(email, page, limit),
    retry: 2,
    enabled: !!email,
  });
};

export default useNotes;
