import { NavLink } from "react-router-dom";
import backgroundImage from "../assets/2024-global-election-modi-putin-maduro-sunak-bukele-hasina-ramaphosa-2.webp";
import IndiaImg from "../assets/IndiaImg.png";
import ElectionSchedule from "./Dashboard/ElectionSchedule";

const Home = () => {
  const myStyle = {
    backgroundImage: `url(${backgroundImage})`,
    minHeight: "100vh",  // Use minHeight instead of height
    width: "100%",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  return (
    <>
      {/* Hero Content */}
      <section className="flex flex-wrap justify-center items-center min-h-[100vh] text-center">
        <div className="bg-cover bg-center w-full" style={myStyle}></div>
      </section>

      {/* Election Schedule Section */}
      <section className="border-b-2">
        <ElectionSchedule />
      </section>

      {/* Main Section */}
      <section className="w-full flex flex-wrap justify-center items-center min-h-[100vh] mb-10">
        <div className="text-center items-center">
          {/* Image */}
          <div className="flex justify-center items-center flex-wrap">
            <div>
              <img
                src={IndiaImg}
                alt="India"
                className="object-cover h-[290px]"
              />
            </div>
          </div>
          <h1 className="text-6xl font-bold mb-4 max-sm:text-lg">
            Make Your Vote Count Today!
          </h1>
          <p className="text-center translate-y-4">
            Your vote is your power. Join millions of others in making your
            voice heard. It’s fast, easy, and secure.
          </p>
          <NavLink to="/voting">
            <button className="translate-y-10 bg-white text-blue-600 py-3 px-8 rounded-lg font-semibold shadow-lg hover:bg-orange-600 hover:text-white transition duration-300 sm:px-4 sm:py-2">
              Start Voting
            </button>
          </NavLink>

          <div className="mt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
            <div>
              <h2 className="text-4xl font-bold">10M+</h2>
              <p className="text-lg">Registered Voters</p>
            </div>
            <div>
              <h2 className="text-4xl font-bold">95%</h2>
              <p className="text-lg">Satisfied Voters</p>
            </div>
            <div>
              <h2 className="text-4xl font-bold">50+</h2>
              <p className="text-lg">Countries Supported</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
