import { useState } from 'react'
import './App.css'
import Login from './screens/Login';
import Home from './screens/Home';
import ErrorPage from './error';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,  //<Login />
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: <Home />,
    errorElement: <ErrorPage />,
  }
]);

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
