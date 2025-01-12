import { createBrowserRouter,RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import AdminProduct from "./pages/adminProduct";
import AddProduct from "./pages/addProduct";
import ModifyProduct from "./pages/modifyProduct";
import AdminDashboard from "./pages/adminDashboard";
import AdminCommandes from "./pages/adminCommandes";
import ModifyCommande from "./pages/modifyCommande";
import ProductPage from "./pages/productPage";
import Carts from "./pages/carts";
import Commandes from "./pages/commandes";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signUp";

function App() {
  const path = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      path:'/adminProduct',
      element: <AdminProduct />
    },
    {
      path:'/addProduct',
      element: <AddProduct />
    },
    {
      path:'/modifyProduct',
      element: <ModifyProduct />
    },
    {
      path:'/adminDashboard',
      element: <AdminDashboard />
    },
    {
      path:'/adminCommandes',
      element: <AdminCommandes />
    },
    {
      path:'/modifyCommande',
      element: <ModifyCommande />
    },
    {
      path:'/products',
      element: <ProductPage />
    },
    {
      path:'/carts',
      element: <Carts />
    },
    {
      path:'/commandes',
      element: <Commandes />
    },
    {
      path:'/login',
      element: <LoginPage />
    },
    {
      path:'/signup',
      element: <SignupPage />
    },
  ])
  return (
    <div>
        <RouterProvider router = {path} />  
    </div>
  );
}

export default App;
