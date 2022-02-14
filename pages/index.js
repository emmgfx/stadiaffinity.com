import GamesGrid from "../components/GamesGrid";
import Layout from "../components/Layout";

const Home = () => {
  return (
    <Layout>
      <h1 className="text-6xl font-medium text-center max-w-2xl mx-auto my-24">
        Your{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#FF4C10] to-[#B903E7]">
          ideal game
        </span>{" "}
        just a step away from you
      </h1>
      <GamesGrid games={[1, 2, 3, 4, 5]} />
    </Layout>
  );
};

export default Home;
