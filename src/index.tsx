import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./Root";
import { ErrorPage } from "./pages/ErrorPage";

import "./index.css";

// Every project page carries its own game package, and Pianora drags in Tone.js
// on top of that. Imported eagerly they all landed in the one bundle each
// visitor downloads before seeing anything, whether or not they ever opened a
// game. `lazy` fetches a page's code the first time someone asks for that
// route. The shell, the home page, and the error page stay eager: they are
// what a first visit renders.
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "contact-me",
        lazy: () =>
          import("./pages/ContactMePage").then((m) => ({
            Component: m.ContactMePage,
          })),
      },
      {
        path: "resume",
        lazy: () =>
          import("./pages/ResumePage").then((m) => ({
            Component: m.ResumePage,
          })),
      },
      {
        path: "mine-sweeper",
        lazy: () =>
          import("./pages/MineSweeperPage").then((m) => ({
            Component: m.MineSweeperPage,
          })),
      },
      {
        path: "tic-tac-nora",
        lazy: () =>
          import("./pages/TicTacNoraPage").then((m) => ({
            Component: m.TicTacNoraPage,
          })),
      },
      {
        path: "anoraconda",
        lazy: () =>
          import("./pages/AnoracondaPage").then((m) => ({
            Component: m.AnoracondaPage,
          })),
      },
      {
        path: "arkanora",
        lazy: () =>
          import("./pages/ArkanoraPage").then((m) => ({
            Component: m.ArkanoraPage,
          })),
      },
      {
        path: "pianora",
        lazy: () =>
          import("./pages/PianoraPage").then((m) => ({
            Component: m.PianoraPage,
          })),
      },
      {
        path: "space-invaders",
        lazy: () =>
          import("./pages/SpaceInvadersPage").then((m) => ({
            Component: m.SpaceInvadersPage,
          })),
      },
      {
        path: "legends-of-noragon",
        lazy: () =>
          import("./pages/NoragonPage").then((m) => ({
            Component: m.NoragonPage,
          })),
      },
      {
        path: "crucinora",
        lazy: () =>
          import("./pages/CruciNoraPage").then((m) => ({
            Component: m.CruciNoraPage,
          })),
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
