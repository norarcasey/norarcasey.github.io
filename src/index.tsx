import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./Root";
import reportWebVitals from "./reportWebVitals";
import {
  ContactMePage,
  ErrorPage,
  MineSweeperPage,
  ResumePage,
  DuckArmageddonPage,
} from "./pages";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "contact-me",
        element: <ContactMePage />,
      },
      { path: "resume", element: <ResumePage /> },
      {
        path: "mine-sweeper",
        element: <MineSweeperPage />,
      },
      {
        path: "duck-armageddon",
        element: <DuckArmageddonPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
