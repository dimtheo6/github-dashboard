import { useParams, useLocation, useOutletContext } from "react-router-dom";
import { useFetchRepositories } from "../hooks/useFetchRepositories";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort, faBook } from "@fortawesome/free-solid-svg-icons";
import { Pagination } from "../components/Pagination";

export default function RepositoriesPage() {
  const [sortOrder, setSortOrder] = useState("descending");
  const [currentPage, setCurrentPage] = useState(1);
  const reposPerPage = 6; // Change as needed

  const { userData } = useOutletContext();
  const username = userData?.login;
  const location = useLocation();

  console.log("Location changed:", location);
  console.log("Fetching params for username:", username);

  const { repos, error, loading, setRepos } = useFetchRepositories(username);

  const lastReposIndex = currentPage * reposPerPage;
  const firstReposIndex = lastReposIndex - reposPerPage;
  const currentRepos = repos.slice(firstReposIndex, lastReposIndex);

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
        <div className="flex flex-col justify-center items-center">
          {/* Sort Button */}
          <button onClick={handleSort} className="mb-3">
            Sort by star <FontAwesomeIcon icon={faSort} />
          </button>

          {/* Repositories List */}
          {currentRepos.map((repo) => (
            <div
              key={repo.id}
              className="flex bg-gray-100 dark:bg-card-background rounded-lg shadow-md mb-5 justify-between items-center p-5  gap-4 w-1/2 hover:scale-105 transition-transform duration-300"
            >
              <div className="left">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faBook} />
                  <div className="font-bold text-lg ">{repo.name}</div>
                </div>
                <div>{repo.description}</div>
              </div>
              <div className="right">
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
