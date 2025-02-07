import { useOutletContext, Link } from "react-router-dom";
import { useFetchRepositories } from "../hooks/useFetchRepositories";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort, faBook } from "@fortawesome/free-solid-svg-icons";
import { Pagination } from "../components/Pagination";
import BackButton from "../components/BackButton";

export default function RepositoriesPage() {
  const [sortOrder, setSortOrder] = useState("descending");
  const [currentPage, setCurrentPage] = useState(1);
  const reposPerPage = 6; // Change as needed

  const { userData } = useOutletContext();
  const username = userData?.login;

  const { repos, error, loading, setRepos } = useFetchRepositories(username); // fetch repositories

  // calculates repositories to show per page
  const lastReposIndex = currentPage * reposPerPage;
  const firstReposIndex = lastReposIndex - reposPerPage;
  const currentRepos = repos.slice(firstReposIndex, lastReposIndex);

  // sort function
  const handleSort = () => {
    const newSortOrder =
      sortOrder === "descending" ? "ascending" : "descending";
    setSortOrder(newSortOrder);

    const sortedRepos = [...repos].sort((a, b) =>
      sortOrder === "ascending"
        ? a.stargazers_count - b.stargazers_count
        : b.stargazers_count - a.stargazers_count
    );

    setRepos(sortedRepos);
  };

  return (
    <div>
      {error && (
        <p className=" text-2xl font-bold text-center mt-96">Error: {error}</p>
      )}
      {loading && (
        <p className="text-2xl font-bold text-center mt-96">Loading...</p>
      )}
      {!loading && !error && repos.length === 0 && (
        <p className="text-2xl font-bold">No repositories found.</p>
      )}
      {!loading && !error && repos.length > 0 && (
        <div className="flex flex-col justify-center items-center max-xl:px-5">

          <div className="buttons flex justify-around w-full mb-5">
            <BackButton username={username} />
            {/* Sort Button */}
            <button onClick={handleSort} className="font-bold text-lg">
              Sort List <FontAwesomeIcon icon={faSort} />
            </button>
          </div>

          {/* Repositories List */}
          {currentRepos.map((repo) => (
            <div
              key={repo.id}
              className="flex bg-gray-100 dark:bg-card-background rounded-lg shadow-md mb-5 justify-between items-center p-5  gap-4 w-1/2 hover:scale-105 transition-transform duration-300 max-xl:w-2/3 max-xl:py-7 max-sm:w-full "
            >
              <div className="left">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faBook} />
                  <div className="font-bold text-lg ">{repo.name}</div>
                </div>
                <div>{repo.description}</div>
              </div>
              <div className="right flex flex-col items-center justify-center min-w-14">
                <div>{repo.stargazers_count} ⭐</div>
                <Link to={repo.html_url}>
                  <button className="font-bold text-purple-800 dark:text-purple-500">
                    Visit
                  </button>
                </Link>
              </div>
            </div>
          ))}

          {/* Pages */}
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalData={repos.length}
            dataPerPage={reposPerPage}
          />
        </div>
      )}
    </div>
  );
}
