import { useState, useEffect } from "react";

export const useFetchUser = (query) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cache, setCache] = useState(() => {
    // Initialize cache from localStorage
    const cachedData = localStorage.getItem("userCache");
    return cachedData ? JSON.parse(cachedData) : {};
  });

  useEffect(() => {
    if (!query) return;

    const fetchUser = async () => {
      setLoading(true);
      setError(null);

      // Check if the data is already in the cache
      if (cache[query]) {
        setUserData(cache[query]);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`https://api.github.com/users/${query}`);

        if (!response.ok) {
          if (response.status === 403) {
            throw new Error("Rate limit exceeded. Please try again later.");
          } else if (response.status === 404) {
            throw new Error(
              "Username not found. Please check the username and try again."
            );
          } else {
            throw new Error("Could not fetch repositories. Please try again.");
          }
        }

        const data = await response.json();
        setUserData(data);

        // Add user to Cache
        const newCache = { ...cache, [query]: data };
        setCache(newCache);
        localStorage.setItem("userCache", JSON.stringify(newCache));
      } catch (error) {
        setError(error.message);
        setUserData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [query, cache]);

  return { userData, loading, error };
};
