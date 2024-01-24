import React from "react";
import { Outlet, Routes, Route } from "react-router-dom";
import { GlobalHeader } from "./components/GlobalHeader";
import App from "./App";

export function Root(): React.ReactElement {
  return (
    <div className="App">
      <section className="page">
        <GlobalHeader />
        <Routes>
          <Route path="/" element={<App />} />
        </Routes>
        <Outlet />
      </section>
    </div>
  );
}
