import { createBrowserRouter,RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import AdminDashboard from "./pages/adminDashboard";

function App() {
  const path = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path:'/adminDashboard',
      element: <AdminDashboard />
    }
  ])
  return (
    <div>
        <RouterProvider router = {path} />  
    </div>
  );
}

export default App;
