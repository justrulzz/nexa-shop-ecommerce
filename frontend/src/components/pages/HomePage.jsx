import React from "react";
import Sliders from "../Slider";
import Categories from "../Categories";
import Campaigns from "../Campaigns";
import Products from "../Products";
import Blogs from "../Blogs";
import Brands from "../Brands";
import CampaignSingle from "../CampaignSingle";

const HomePage = () => {
  return (
    <React.Fragment>
      <Sliders />
      <Categories />
      <Campaigns />
      <Products />
      <Blogs />
      <Brands />
      <CampaignSingle />
    </React.Fragment>
  );
};

export default HomePage;
