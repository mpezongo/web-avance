import { createBrowserRouter,RouterProvider } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  const path = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
  ])
  return (
    <div>
        <RouterProvider router = {path} />  
    </div>
  );
}

export default App;
