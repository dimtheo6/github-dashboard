import { useState, useEffect } from "react";

export const useFetchRepositories = (username) => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cache, setCache] = useState(() => {
    // Initialize cache from localStorage
    const cachedData = localStorage.getItem("reposCache");
    return cachedData ? JSON.parse(cachedData) : {};
  });

  useEffect(() => {
    if (!username) {
      setLoading(false);
      return;
    }

    const fetchAllRepos = async () => {
      setLoading(true);
      setError(null);

      // Check if the data is already in the cache
      if (cache[username]) {
        setRepos(cache[username]);
        setLoading(false);
        return;
      }

      try {
        let allRepos = [];
        let page = 1;
        let perPage = 100; // GitHub allows up to 100 per request

        let hasMoreData = true; // Control flag to continue fetching

        while (hasMoreData) {
          const response = await fetch(
            `https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${page}`
          );

          if (!response.ok) {
            if (response.status === 403) {
              throw new Error("Rate limit exceeded. Please try again later.");
            } else {
              throw new Error(
                "Could not fetch repositories. Please try again."
              );
            }
          }

          const data = await response.json();
          allRepos = [...allRepos, ...data];

          if (data.length < perPage) {
            hasMoreData = false;
          } else {
            page++;
          }
        }

        setRepos(allRepos);

        // add repos to cache
        const newCache = { ...cache, [username]: allRepos };
        setCache(newCache);
        localStorage.setItem("reposCache", JSON.stringify(newCache));
      } catch (error) {
        setError(error.message);
        setRepos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllRepos();
  }, [username, cache]);

  return { repos, loading, error, setRepos };
};
