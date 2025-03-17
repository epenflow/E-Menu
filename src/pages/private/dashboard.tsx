import PrivateContainer from "~/layouts/private/private-container";

const Dashboard = () => {
  return (
    <PrivateContainer>
      <div className="h-private-container">
        <p>test</p>
      </div>
    </PrivateContainer>
  );
};
export default Dashboard;
