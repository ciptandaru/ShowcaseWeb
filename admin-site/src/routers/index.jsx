import {createBrowserRouter, redirect} from "react-router-dom";
import Layout from "../components/Layout";
import HomePage from "../pages/HomePage";
import FormProduct from "../pages/FormProduct";
import CategoriesPage from "../pages/CategpriesPage";
import FormEditProduct from "../pages/FormEditProduct";
import FormCategory from "../pages/FormCategory";
import FormEditCategory from "../pages/FormEditCategory";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    loader: () => {
      if (!localStorage.getItem("access_token")) {
        throw redirect("/login");
      } else {
        return null;
      }
    },
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: ":slug",
        element: <FormEditProduct />,
      },
      {
        path: "create-product",
        element: <FormProduct />,
      },
      {
        path: "categories",
        element: <CategoriesPage />,
      },
      {
        path: "categories/:id",
        element: <FormEditCategory />,
      },
      {
        path: "create-category",
        element: <FormCategory />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
    loader: () => {
      if (localStorage.getItem("access_token")) {
        throw redirect("/");
      } else {
        return null;
      }
    },
  },
]);

export default router;
