import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./Root";
import {
  ContactMePage,
  ErrorPage,
  MineSweeperPage,
  ResumePage,
  TicTacNoraPage,
  AnoracondaPage,
  SpaceInvadersPage,
} from "./pages";

import "./index.css";
import { PianoraPage } from "./pages/PianoraPage";

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
        path: "tic-tac-nora",
        element: <TicTacNoraPage />,
      },
      {
        path: "anoraconda",
        element: <AnoracondaPage />,
      },
      {
        path: "pianora",
        element: <PianoraPage />,
      },
      {
        path: "space-invaders",
        element: <SpaceInvadersPage />,
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
