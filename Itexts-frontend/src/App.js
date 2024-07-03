import './App.css';
import Login from './components/login';
import Layout from './Layout'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login/>} ,
        {
          path:"/home/:token",
          element:<Layout/>
            },
  
  ])

  return (
    <>
            <RouterProvider router={router} />
    </>
  );
}

export default App;
