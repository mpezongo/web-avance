import { createBrowserRouter,RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import AdminProduct from "./pages/adminProduct";
import AddProduct from "./pages/addProduct";
import ModifyProduct from "./pages/modifyProduct";
import AdminDashboard from "./pages/adminDashboard";

function App() {
  const path = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
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
  ])
  return (
    <div>
        <RouterProvider router = {path} />  
    </div>
  );
}

export default App;
