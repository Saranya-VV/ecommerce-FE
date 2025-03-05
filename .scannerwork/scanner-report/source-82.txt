import ReactDOM from "react-dom/client";
import {
  Outlet,
  createBrowserRouter,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Header from "./ui/Header.jsx";
import NotFound from "./pages/NotFound.jsx";
import Footer from "./ui/Footer.jsx";
import { getProducts } from "./data/index.jsx";
import { app } from "./fireabase.config.js";
import { store, persistor } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Cart from "./pages/Cart.jsx";
import Login from "./pages/Login.jsx";
import "react-toastify/dist/ReactToastify.css";
import Product from "./pages/Product.jsx";
import Success from "./pages/Success.jsx";
import Register from "./pages/Register.jsx";
import Profile from "./pages/Profile.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import OrderSummary from "./pages/OrderSummary.jsx";



const RootLayout = () => {

  return (
    <div>
      <Header />
      <ScrollRestoration />
      <Outlet />
      <Footer />
    </div>
  );
};

// Define routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <App />,
        loader: getProducts,
      },
      {
        path: "/product/:id",
        element: <Product />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/success",
        element: <Success />,
      },
      {
        path: "/user-details",
        element: <PrivateRoute element={<Profile />} />, 
      },
      {
        path: "/Orders",
        element: <PrivateRoute element={ <OrderSummary />} />,
      },
      {
        path: "/*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
 
]);


// Render the root component
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider app={app} store={store}>
    <PersistGate loading={"loading"} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
);
