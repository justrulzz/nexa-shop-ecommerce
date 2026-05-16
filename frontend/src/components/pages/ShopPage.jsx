import React from "react";
import Categories from "../Categories";
import Products from "../Products";
import CampaignSingle from "../CampaignSingle";

const ShopPage = () => {
  return (
    <React.Fragment>
      <Categories />
      <Products />
      <CampaignSingle />
      <Products />
    </React.Fragment>
  );
};

export default ShopPage;
