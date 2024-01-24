import React from "react";
import { Outlet, Routes, Route, Link } from "react-router-dom";
import App from "./App";

export function Root(): React.ReactElement {
  return (
    <>
      <header className="page-header">
        <Link to="/">
          <h1>Nora Casey</h1>
        </Link>
      </header>
      <main className="page-body">
        <Routes>
          <Route path="/" element={<App />} />
        </Routes>
        <Outlet />
      </main>
      <footer className="page-footer">
        <div className="copyright">
          Copyright &copy; {new Date().getFullYear()} Nora Casey. All rights
          reserved.
        </div>
      </footer>
    </>
  );
}
