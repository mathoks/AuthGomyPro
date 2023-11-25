import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export const useScrollRestore = () => {
  const { pathname } = useLocation();
  const scrollPos = useRef({});

  useEffect(() => {
    const handleScroll = (event) => {
      scrollPos.current = { ...scrollPos, [pathname]: event.target.scrollTop };
    };
    window.addEventListener("scroll", handleScroll, { capture: true });
    return () => {
      window.removeEventListener("scroll", handleScroll, { capture: true });
    };
  }, []);

  useEffect(() => {
    if (scrollPos.current[pathname]) {
      setTimeout(() => {
        window.scrollTo({
          top: scrollPos.current[pathname],
          behavior: "smooth",
        });
      }, 0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);
};
