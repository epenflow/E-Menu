import PrivateContainer from "~/layouts/private/private-container";
import { useAuth } from "~/lib/services/auth";

const Dashboard = () => {
  const { user } = useAuth();
  return (
    <PrivateContainer>
      <div className="h-private-container">
        <p>{user?.name}</p>
      </div>
      <div className="h-private-container">
        <p>{user?.name}</p>
      </div>
      <div className="h-private-container">
        <p>{user?.name}</p>
      </div>
    </PrivateContainer>
  );
};
export default Dashboard;
