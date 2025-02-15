import { useQuery } from "@tanstack/react-query";

const fetchUser = async ({ queryKey }) => {
  const [, query] = queryKey;
  const response = await fetch(`https://api.github.com/users/${query}`);
  if (!response.ok) {
    if (response.status === 403) {
      throw new Error("Rate limit exceeded. Please try again later.");
    } else if (response.status === 404) {
      throw new Error("Username not found. Please check the username and try again.");
    } else {
      throw new Error("Could not fetch repositories. Please try again.");
    }
  }
  return response.json();
};

export const useFetchUser = (query) => {
  return useQuery({
    queryKey: ["user", query],
    queryFn: fetchUser,
    enabled: !!query,
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
    retry: 1, // Retry once on failure
  });
};