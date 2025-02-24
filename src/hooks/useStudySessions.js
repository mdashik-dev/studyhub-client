import { useQuery } from "@tanstack/react-query";
import { api } from "../contexts/AuthProvider";

const fetchStudySessions = async (searchText) => {
  const response = await api.get("/api/tutor/get-sessions", {
    params: { searchText },
  });
  if (response.status === 200) {
    return response.data.sessions;
  } else {
    throw new Error("Failed to fetch sessions");
  }
};

const useStudySessions = (searchText) => {
  return useQuery({
    queryKey: ["studySessions", searchText],
    queryFn: () => fetchStudySessions(searchText),
    retry: 2,
  });
};

export default useStudySessions;
