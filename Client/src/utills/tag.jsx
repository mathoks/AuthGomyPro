import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SEO } from "./SEO";

const Tags = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    switch (pathname) {
      case "/home":
        SEO({
          title: "welcome to 4hire",
          metaDescription: "this is the homepage",
        });
        break;
      case "/get-started/signup":
        SEO({ title: "Sign up", metaDescription: "become a member" });
        break;
      case "/get-started/Signin":
        SEO({
          title: "Sign in",
          metaDescription: "gain access to more functionality",
        });
        break;
      default:
        break;
    }
  }, [pathname]);
};

export default Tags;
