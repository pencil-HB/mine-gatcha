import React from "react";
import { createRoot } from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
    Outlet,
    createRoutesFromElements,
} from "react-router-dom";
import Gatcha from "./routes/Gatcha";
import Home from "./routes/Home";
import Reports from "./routes/Reports";
import Login from "./routes/Login";
import Navbar from "./components/Navbar";
import "./App.css";

const AppLayout = () => (
    <>
        <Navbar />
        <Outlet />
    </>
);

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route element={<AppLayout />}>
//       <Route path="/" element={<Home />} />
//       <Route path="/products" element={<Products />} />
//       <Route path="/reports" element={<Reports />} />
//     </Route>
//   )
// );

const router = createBrowserRouter([
    {
        element: <AppLayout />,
        children: [
            {
                path: "/",
                element: <Login />,
            },
            {
                path: "/home",
                element: <Home />,
            },
            {
                path: "gatcha",
                element: <Gatcha />,
            },
            {
                path: "reports",
                element: <Reports />,
            },
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);