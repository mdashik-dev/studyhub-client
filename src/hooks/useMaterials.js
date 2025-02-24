import { useQuery } from "@tanstack/react-query";
import { api } from "../contexts/AuthProvider";

const fetchMaterials = async (userEmail) => {
  const response = await api.get(`/api/materials/get-materials`, {
    params: { tutorEmail: userEmail },
  });

  if (!response || response.status !== 200) {
    throw new Error("Failed to fetch materials");
  }
  return response.data;
};

const useMaterials = (userEmail) => {
  return useQuery({
    queryKey: ["materials"],
    queryFn: () => fetchMaterials(userEmail),
    retry: 2,
  });
};

export default useMaterials;