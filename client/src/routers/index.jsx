import {createBrowserRouter} from "react-router-dom";
import Layout from "../components/Layout";
import HomePage from "../pages/HomePage";
import ProductPage from "../pages/ProductPage";
import NotFound from "../components/NotFound";
import DetailPage from "../pages/DetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "products",
        element: <ProductPage />,
      },
      {
        path: "products/:slug",
        element: <DetailPage />,
      },
      {
        path: "not-found",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
