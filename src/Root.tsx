import React from "react";
import { Outlet, Routes, Route, Link } from "react-router-dom";
import { GlobalHeader } from "./components/GlobalHeader";
import App from "./App";

export function Root(): React.ReactElement {
  return (
    <div className="App">
      <Link to="/">
        <GlobalHeader />
      </Link>
      <section className="page">
        <Routes>
          <Route path="/" element={<App />} />
        </Routes>
        <Outlet />
      </section>
    </div>
  );
}
