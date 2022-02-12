import Page from 'components/common/Page';
import UnderConstruction from 'components/common/UnderConstruction';
import MainLayout from 'layouts/MainLayout';

const Home = () => {
  return (
    <Page>
      <UnderConstruction />
    </Page>
  );
};

Home.getLayout = MainLayout;

export default Home;
