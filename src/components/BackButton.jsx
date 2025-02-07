import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function BackButton({ username }) {
  return (
    <>
    <Link to={`/${username}`}>
      <button className="flex gap-2 items-center font-bold text-lg">
        <FontAwesomeIcon icon={faArrowLeft} />
        <p>Profile</p>
      </button>
    </Link>
    </>
  );
}
