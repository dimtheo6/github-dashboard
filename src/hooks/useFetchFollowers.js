import { useQuery } from "@tanstack/react-query";

const fetchFollowers = async ({ queryKey }) => {
  const [, username, batch] = queryKey; // Destructure queryKey
  const perPage = 40; // Batch size: 40 followers per fetch
  const response = await fetch(
    `https://api.github.com/users/${username}/followers?per_page=${perPage}&page=${batch}`
  );

  if (!response.ok) {
    if (response.status === 403) {
      throw new Error("Rate limit exceeded. Try again later.");
    }
    throw new Error("Could not fetch followers.");
  }

  return response.json();
};

export const useFetchFollowers = (username, page, followersPerPage, totalFollowers) => {
  // Determine the batch to fetch based on the current page (5 pages per batch)
  const batch = Math.ceil(page / 5);

  const {
    data: fetchedFollowers = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["followers", username, batch],
    queryFn: fetchFollowers,
    enabled: Boolean(username),
    staleTime: 1000 * 60 * 5, // Data is considered fresh for 5 minutes
    cacheTime: 1000 * 60 * 10, // Cache data remains for 10 minutes
    retry: 1, // Retry once on failure
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 3000), // Exponential backoff: 1s, 2s, up to 3s
  });

  // Calculate total pages using the totalFollowers count
  const totalPages = totalFollowers ? Math.ceil(totalFollowers / followersPerPage) : 1;

  const batchPageOffset = (page - 1) % 5;
  const startIndex = batchPageOffset * followersPerPage;
  const endIndex = startIndex + followersPerPage;
  const followers = fetchedFollowers.slice(startIndex, endIndex);

  return { followers, totalPages, isLoading, error };
};
