import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCube } from "@fortawesome/free-solid-svg-icons/faCube";
export default function Homepage() {
  return (
    <div className="flex flex-grow p-40 gap-x-16">

      <div className="flex flex-col w-1/2 space-y-10">
        <h1 className="font-bold text-5xl">
          Explore Your GitHub Profile with Dynamic, Real-Time Insights
        </h1>
        <p className="text-xl">
          Our dashboard fetches and displays all essential user details in one
          place. Get insights into your GitHub activity, including repositories
          and followers, effortlessly.
        </p>
        <ul className="space-y-5 [&>li]:flex [&>li]:items-center [&>li]:gap-5 [&>li]:text-lg ">
          <li className="" >
            <FontAwesomeIcon icon={faCube} /> View your name and username
            instantly.
          </li>
          <li>
            <FontAwesomeIcon icon={faCube} /> Showcase your avatar and location
            easily.
          </li>
          <li>
            <FontAwesomeIcon icon={faCube} /> Track your bio, repositories, and
            followers.
          </li>
        </ul>
      </div>
      <img
        src="/public/picture.webp"
        alt="Home Picture"
        className="w-1/2 h-full"
      />
      
    </div>
  );
}
