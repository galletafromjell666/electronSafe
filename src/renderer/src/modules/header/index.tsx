import React from "react";
import { Link } from "react-router-dom";
import { routeNames } from "../constants";

function Header() {
  return (
    <>
      <Link to={routeNames.Create} style={{ padding: 5 }}>
        Create
      </Link>
      <Link to={routeNames.Mount} style={{ padding: 5 }}>
        Mount
      </Link>
      <Link to={routeNames.Settings} style={{ padding: 5 }}>
        Settings
      </Link>
    </>
  );
}

export default Header;
