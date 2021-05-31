import { Typography } from "@material-ui/core";
import React from "react";
import { FormattedMessage } from "react-intl";
import CategoriesList from "./components/CategoriesList";

const Categories: React.FC = () => {
  return (
    <div>
      <Typography variant="h4">
        <FormattedMessage id="categories.title" />
      </Typography>
      <CategoriesList />
    </div>
  );
};

export default Categories;
