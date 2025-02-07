import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

export const Pagination = ({
  currentPage,
  setCurrentPage,
  totalData,
  dataPerPage,
}) => {
  const [pages, setPages] = useState([]);
  const totalPages = Math.ceil(totalData / dataPerPage); // calculates total pages

  useEffect(() => {
    const generatePages = () => {
      const pageNumbers = [];

      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }

      setPages(pageNumbers);
    };

    generatePages();
  }, [totalPages]);

  // changes current page
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="pagination flex text-xl ">
      {/* Left Arrow */}
      <button
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
        className="px-1"
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>

      {/* Pages */}
      {pages.map((page, index) => {
        return (
          <button
            key={index}
            onClick={() => handlePageChange(page)}
            className={`${
              currentPage === page
                ? "active bg-slate-300 dark:bg-orange-600"
                : ""
            } px-2 hover:bg-gray-200 dark:hover:bg-orange-400 rounded-lg hover:shadow-md`}
          >
            {page}
          </button>
        );
      })}

      {/* Right Arrow */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
        className="px-1"
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </button>
    </div>
  );
};
