import React from "react";
import { RecoilRoot } from "recoil";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import Work from './Components/UserPage/components/work';
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ApolloProvider } from "@apollo/client";
import client from "./client";
import Errorpage from "./Components/ErrorPage/components/errorpage";
import UsersDrawer2 from "./Components/UserPage/components/UserDrawer";
import About from "./Components/homePage/components/About";
import Form from "./Components/Auth/component/SignUp";
import Signin from "./Components/Auth/component/SignIn";
import AuthPages from "./pages/authPage";
import Homepage from "./pages/homePage";
import SearchResult from "./pages/searchResult";
import Settings from "./pages/settingsPage";
import Basic from "./Components/Settings/components/basic";
import Works from "./Components/Settings/components/work";
import Userpage from "./pages/Userpage";
import ChatPage from "./pages/chatPage";
import MessageForm from "./Components/chatComp/component/messageForm";




const router = createBrowserRouter([
  
  {
    path: "/",
    element: <App />,
    errorElement: <Errorpage />,
    children: [
      { index: true, element: <Navigate to="home" replace={true}  /> },
      {
        path: "home",
        element: <Homepage />,
       
      },
      {
        path: "notification",
        element: <div>my notification</div>,
       
      },
      { path: "search", 
      element: <SearchResult/> 
    },
    {
      path: 'chatRoom',
      element: <ChatPage/>,
      children: [
         { index: true, element: <Navigate to="messages" replace={true} /> },
        {
          path: "messages",
          element: <MessageForm/>
        },
        {
          path: "users",
          //element:<MessageForm/>
        },
        {
          path: "rules",
          element: <div>hhu</div>

        }
      ]
    }
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
    element: <Userpage />,
    errorElement: <Errorpage />,
    children: [
      {
         index: true, element: <Navigate to="basic" replace={true} /> 
      },
      {
        path: "basic",
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
    element:  <Settings />,
    children:[
      {
        index: true,
        element: <Basic/>
      },
      {
        path: "work",
        element: <Works/>
        
      }
    ]
  },
  
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RecoilRoot>
        <RouterProvider router={router} />
      </RecoilRoot>
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
