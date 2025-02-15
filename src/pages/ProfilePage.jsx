import { useOutletContext, Link } from "react-router-dom";

export default function ProfilePage() {
  const { userData, error, loading } = useOutletContext();

  return (
    <section className="profile_container">
      {error && (
        <p className=" text-2xl font-bold text-center mt-96">Error: {error}</p>
      )}
      {loading && (
        <p className="text-2xl font-bold text-center mt-96">Loading...</p>
      )}

      {/* Profile Data */}
      {userData && (
        <div className="flex justify-center gap-5 p-20 max-lg:flex-col max-lg:items-center max-lg:gap-20 max-lg:p-28 max-sm:p-10">
          {/* Avatar */}
          <div className="flex flex-col bg-gray-100 dark:bg-card-background justify-between items-center  rounded-lg shadow-md px-20 py-8 min-w-1/4 max-lg:gap-36 max-lg:px-28 max-md:w-full max-sm:gap-20">
            <div className="flex flex-col gap-5 items-center">
              <img
                src={userData.avatar_url}
                alt="Avatar Image"
                className="rounded-full h-20 w-20"
              />
              <h1 className="text-2xl font-bold text-center ">
                {userData.name}
              </h1>
            </div>

            {/* Repositories and Follower Links */}
            <div className="buttons flex gap-5">

              <Link to={`/${userData.login}/repositories`}>
                <button className="bg-blue-500 text-white text-lg p-2 rounded-lg font-bold hover:bg-blue-700 transition-all duration-300">
                  Repositories
                </button>
              </Link>

              <Link to={`/${userData.login}/followers`}>
                <button className="bg-blue-500 text-white text-lg p-2 rounded-lg font-bold hover:bg-blue-700 transition-all duration-300">
                  Followers
                </button>
              </Link>
            </div>
            
          </div>

          {/* Details */}
          <div className="flex flex-col bg-gray-100 dark:bg-card-background rounded-lg shadow-md mb-5 justify-center p-4  gap-4  [&>div]:flex  [&>div]:min-h-10 w-2/4 max-lg:w-full ">
            <div className="border-b-2 ">
              <h1 className="text-lg font-bold  w-1/3 max-lg:w-2/3">Full Name:</h1>
              <p className="text-base text-gray-600 dark:text-gray-200 w-2/3">
                {userData.name}
              </p>
            </div>
            <div className="border-b-2">
              <h1 className="text-lg font-bold w-1/3 max-lg:w-2/3">Username:</h1>
              <p className="text-base text-gray-600 dark:text-gray-200 w-2/3">
                {userData.login}
              </p>
            </div>
            <div className="border-b-2">
              <h1 className="text-lg font-bold  w-1/3 max-lg:w-2/3">Location: </h1>
              <p className="text-base text-gray-600 dark:text-gray-200 w-2/3">
                {userData.location}
              </p>
            </div>
            <div className="border-b-2">
              <h1 className="text-lg font-bold  w-1/3 max-lg:w-2/3">Bio: </h1>
              <p className="text-base text-gray-600 dark:text-gray-200 w-2/3">
                {userData.bio}
              </p>
            </div>
            <div className="border-b-2">
              <h1 className="text-lg font-bold  w-1/3 max-lg:w-2/3">Followers: </h1>
              <p className="text-base text-gray-600 dark:text-gray-200 w-2/3">
                {userData.followers}
              </p>
            </div>
            <div>
              <h1 className="text-lg font-bold  w-1/3 max-lg:w-2/3">
                Public Repositories:{" "}
              </h1>
              <p className="text-base text-gray-600 dark:text-gray-200 w-2/3">
                {userData.public_repos}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
