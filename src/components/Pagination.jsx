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
      const maxVisiblePages = 5; // Set how many pages to show at once

      if (totalPages <= maxVisiblePages) {
        // If the total pages are less than or equal to max visible, show all
        for (let i = 1; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        // Show first page
        pageNumbers.push(1);

        // Show ellipses if the current page is far from the first few pages
        if (currentPage > 3) {
          pageNumbers.push("...");
        }

        // Show pages around the current page
        let start = Math.max(currentPage - 2, 2); // Start page
        let end = Math.min(currentPage + 2, totalPages - 1); // End page

        for (let i = start; i <= end; i++) {
          pageNumbers.push(i);
        }

        // Show ellipses if the current page is far from the last pages
        if (currentPage < totalPages - 2) {
          pageNumbers.push("...");
        }

        // Show last page
        pageNumbers.push(totalPages);
      }

      setPages(pageNumbers);
    };

    generatePages();
  }, [currentPage, totalPages]);

  // Changes current page
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="pagination flex text-xl">
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
        return page === "..." ? (
          <span key={index} className="px-2">...</span>
        ) : (
          <button
            key={index}
            onClick={() => handlePageChange(page)}
            className={`${
              currentPage === page ? "active bg-slate-300 dark:bg-orange-600" : ""
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
