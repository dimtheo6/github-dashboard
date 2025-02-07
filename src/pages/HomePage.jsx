import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCube } from "@fortawesome/free-solid-svg-icons/faCube";

export default function Homepage() {
  return (
    <section className="home_container flex flex-grow p-40 gap-x-16 max-xl:flex-col max-xl:items-center max-xl:gap-16 max-md:p-20 max-sm:p-10">

      <div className="flex flex-col space-y-10">
        <h1 className="font-bold text-5xl max-sm:text-4xl">
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
        src="/picture.webp"
        alt="Home Picture"
        className="w-1/2 h-full max-xl:w-full"
      />
      
    </section>
  );
}
