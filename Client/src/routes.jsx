import React, {useEffect} from "react";
import { Navigate } from "react-router-dom";
import Errorpage from "./Components/ErrorPage/components/errorpage";
import { UsersLiist } from "./Components/homePage/Loaders/getUsers";
import UsersDrawer2 from "./Components/UserPage/components/UserDrawer";
import About from "./Components/homePage/components/About";
import Form from "./Components/Auth/component/SignUp";
import Dashboard from "./Components/Settings/components/Dashboard";
import Signin from "./Components/Auth/component/SignIn";
import AuthPages from "./pages/authPage";
import Homepage from "./pages/homePage";
import { SearchForm } from "./Components/Search/components/searchForm";
import SearchResult from "./pages/searchResult";
import Work from './Components/UserPage/components/work';
import App from "./App";



const Routes = ()=>{

const Token = sessionStorage.getItem("token")
useEffect(() => {
    sessionStorage.getItem("token")
}, [Token]);

return {
    path: "/",
    element: <App />,
    errorElement: <Errorpage />,
    children: [
      { index: true, element: <Navigate to="home" replace={true} exact /> },
      {
        path: "home",
        element: <Homepage />,
       
      },
      { path: "search", element: <SearchResult/> },
    ],
  },
  
  {
    path: "/get-started",
    element: <AuthPages />,
    errorElement: <Errorpage />,
    children: [
      {
        path: "signup",
        element: <Form />,
      },
      {
        path: "Signin",
        element: <Signin />,
      },
    ],
  },

  {
    path: "user/:id/About",
    element: <UsersDrawer2 />,
    errorElement: <Errorpage />,
    children: [
      {
        index: true,
        element: <About />,
      },
      {
        path: `work`,
        element: <Work />,
      },
      {
        path: `Post`,
        element: <Work />,
      },
      {
        path: `Gallery`,
        element: <Work />,
      },
    ],
  },
  {
    path: "settings/Dashboard",
    element:  Token ? <Dashboard /> : <Navigate to="/get-started/SignIn" replace= {true} />,
  }
}
export default Routes