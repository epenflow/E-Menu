import { Link } from "@tanstack/react-router";

const Home = () => {
  return (
    <div className="inline-flex gap-2">
      <p>Home</p>
      <Link to="/test">Test</Link>
    </div>
  );
};
export default Home;
