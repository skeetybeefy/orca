import Page from "components/common/Page";
import UnderConstruction from "components/common/UnderConstruction";
import MainLayout from "layouts/MainLayout";
import React from "react";

const News = () => {
  return (
    <Page title="News">
      <UnderConstruction />
    </Page>
  );
};

News.getLayout = MainLayout;

export default News;
