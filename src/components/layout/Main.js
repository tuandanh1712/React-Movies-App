import React, { Fragment } from "react";
import Hearder from "./Hearder";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <Fragment>
      <Hearder></Hearder>
      <Outlet></Outlet>
    </Fragment>
  );
};

export default Main;
