import Page from "components/common/Page";
import UnderConstruction from "components/common/UnderConstruction";
import ProtectedLayout from "layouts/ProtectedLayout";

const Dashboard = () => {
  return (
    <Page>
      <UnderConstruction />
    </Page>
  );
};

Dashboard.getLayout = ProtectedLayout;

export default Dashboard;
