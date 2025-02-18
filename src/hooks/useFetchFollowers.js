import { useQuery } from "@tanstack/react-query";

/* Fetches followers */
const fetchFollowers = async ({ queryKey }) => {
  const [, username, batch, batchSize] = queryKey;
  const response = await fetch(
    `https://api.github.com/users/${username}/followers?per_page=${batchSize}&page=${batch}`
  );

  if (!response.ok) {
    if (response.status === 403) {
      throw new Error("Rate limit exceeded. Try again later.");
    }
    throw new Error("Could not fetch followers.");
  }

  return response.json();
};

/* useFetchFollowers hook */
export const useFetchFollowers = (
  username,
  page,
  followersPerPage,
  pagesPerBatch = 5 // fetches every 5 pages, Change as needed.
) => {
  // Calculate the batch number based on the current page and pages per batch.
  const batch = Math.ceil(page / pagesPerBatch);

  // Calculate the total number of followers to fetch in one batch.
  const batchSize = pagesPerBatch * followersPerPage;

  const {
    data: fetchedFollowers = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["followers", username, batch, batchSize],
    queryFn: fetchFollowers,
    enabled: Boolean(username),
    staleTime: 1000 * 60 * 5, // Data is considered fresh for 5 minutes.
    cacheTime: 1000 * 60 * 10, // Cache remains for 10 minutes.
    retry: 1,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 3000),
  });


  // Determine which slice of the fetched batch corresponds to the current page.
  const batchPageOffset = (page - 1) % pagesPerBatch;
  const startIndex = batchPageOffset * followersPerPage;
  const endIndex = startIndex + followersPerPage;
  const followers = fetchedFollowers.slice(startIndex, endIndex);

  return { followers, isLoading, error };
};
