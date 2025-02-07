import { useOutletContext } from "react-router-dom";
import { useFetchFollowers } from "../hooks/useFetchFollowers";
import { useState } from "react";
import { Pagination } from "../components/Pagination";

export default function FollowersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const followersPerPage = 8; // Change as needed

  const { userData } = useOutletContext();
  const username = userData?.login;
  const { followers, setFollowers, loading, error } =
    useFetchFollowers(username);

  // calculates followers per page
  const lastFollowersIndex = currentPage * followersPerPage;
  const firstFollowersIndex = lastFollowersIndex - followersPerPage;
  const currentFollowers = followers.slice(
    firstFollowersIndex,
    lastFollowersIndex
  );

  return (
    <div className="flex flex-col items-center gap-2 h-screen">
      {error && (
        <p className=" text-2xl font-bold text-center mt-96">Error: {error}</p>
      )}
      {loading && (
        <p className="text-2xl font-bold text-center mt-96">Loading...</p>
      )}

      {/* Follower List */}
      <h1>Number of Followers: {followers.length}</h1>

      {currentFollowers.map((follower) => (
        <div
          key={follower.id}
          className="flex bg-gray-100 rounded-lg shadow-md  items-center justify-between p-5  w-1/3 hover:scale-105 transition-transform duration-300  dark:bg-card-background"
        >
          <div className="flex items-center gap-14">
            <img
              src={follower.avatar_url}
              alt="Avatar Image"
              className="h-10"
            />
            <div className="text-lg font-bold text-gray-800 dark:text-white w-2/3">
              {follower.login}
            </div>
          </div>
          <div>{follower.name}</div>
          <a
            href={follower.html_url}
            className="font-bold text-purple-800 dark:text-purple-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button>Visit</button>
          </a>
        </div>
      ))}

      {/* Pages */}
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalData={followers.length}
        dataPerPage={followersPerPage}
      />
    </div>
  );
}
