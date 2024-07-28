import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import { routeNames } from "./modules/constants";
import Create from "./modules/create";
import Mount from "./modules/mount";
import Settings from "./modules/settings";
import Header from "./modules/header";

function App() {
  return (
    <Router>
      <nav>
        <Header />
      </nav>
      <Routes>
        {/* The default route is the create route */}
        <Route path="/" element={<Navigate to={routeNames.Create} />} />
        <Route path={routeNames.Create} element={<Create />} />
        <Route path={routeNames.Mount} element={<Mount />} />
        <Route path={routeNames.Settings} element={<Settings />} />
        {/* No match route is handled with a redirect to the create route */}
        <Route path="*" element={<Navigate to={routeNames.Create} />} />
      </Routes>
    </Router>
  );
}

export default App;
