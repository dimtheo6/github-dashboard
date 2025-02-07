import { useState, useEffect } from "react";

export const useFetchFollowers = (username) => {
    const [followers, setFollowers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cache, setCache] = useState(() => {
        // Initialize cache from localStorage
        const cachedData = localStorage.getItem('followersCache');
        return cachedData ? JSON.parse(cachedData) : {};
    });

    useEffect(() => {
        if (!username) {
            setLoading(false);
            return;
        }

        const fetchAllFollowers = async () => {
            setLoading(true);
            setError(null);

            // Check if the data is already in the cache
            if (cache[username]) {
                setFollowers(cache[username]);
                setLoading(false);
                return;
            }

            try {
                let allFollowers = [];
                let page = 1;
                let perPage = 100; // GitHub allows up to 100 per request

                let hasMoreData = true; // Control flag to continue fetching

                while (hasMoreData) {
                    const response = await fetch(
                        `https://api.github.com/users/${username}/followers?per_page=${perPage}&page=${page}`
                    );

                    if (!response.ok) {
                        if (response.status === 403) {
                            throw new Error("Rate limit exceeded. Please try again later.");
                        } else {
                            throw new Error("Could not fetch followers. Please try again.");
                        }
                    }

                    const data = await response.json();
                    console.log("Followers are:", data);

                    // If the data length is less than perPage, it's the last page of results
                    if (data.length < perPage) {
                        hasMoreData = false; // Stop fetching after the last page
                    }

                    allFollowers = allFollowers.concat(data);
                    page++;
                }

                setFollowers(allFollowers);
                const newCache = { ...cache, [username]: allFollowers };
                setCache(newCache);
                localStorage.setItem('followersCache', JSON.stringify(newCache));
            } catch (error) {
                setError(error.message);
                setFollowers([]);
            } finally {
                setLoading(false);
            }
        };

        fetchAllFollowers();
    }, [username, cache]);

    return { followers, setFollowers, loading, error };
};