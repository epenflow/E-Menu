import { Link } from "@tanstack/react-router";

const Home = () => {
  return (
    <section>
      <p>Home</p>
      <Link to="/sign-in">sign in</Link>
      <Link to="/role">Role</Link>
      <Link to="/dashboard">Dashboard</Link>
    </section>
  );
};

export default Home;
