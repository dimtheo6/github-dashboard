import { useOutletContext } from "react-router-dom";
import { useFetchFollowers } from "../hooks/useFetchFollowers";
import { useState } from "react";
import { Pagination } from "../components/Pagination";
import BackButton from "../components/BackButton";

export default function FollowersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const followersPerPage = 8; // Change as needed

  const { userData } = useOutletContext(); // get user data
  const username = userData?.login;
  const totalFollowers = userData?.followers;

  const { followers, isLoading, error } = useFetchFollowers(username, currentPage, followersPerPage, totalFollowers);

  return (
    <section className="follower_container flex flex-col items-center gap-2 max-sm:px-7">
      {error && (
        <p className=" text-2xl font-bold text-center mt-96">Error: {error}</p>
      )}
      {isLoading && (
        <p className="text-2xl font-bold text-center mt-96">Loading...</p>
      )}

      <div className="buttons flex justify-evenly w-full mb-5">
        <BackButton username={username} />
        <h1 className="font-bold text-lg">Followers: {userData?.followers}</h1>
      </div>

      {/* Follower List */}
      {followers.length > 0 ? (
        followers.map((follower) => (
          <div
            key={follower.id}
            className="flex bg-gray-100 rounded-lg shadow-md  items-center  justify-between p-5  w-1/3 hover:scale-105 transition-transform duration-300  dark:bg-card-background max-2xl:w-2/4 max-lg:w-2/3 max-sm:w-full "
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
        ))
      ) : (
        <p className="flex justify-center items-center font-bold text-2xl">
          No followers
        </p>
      )}

      {/* Pages */}
      {totalFollowers && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalData={totalFollowers}
          dataPerPage={followersPerPage}
        />
      )}
    </section>
  );
}
