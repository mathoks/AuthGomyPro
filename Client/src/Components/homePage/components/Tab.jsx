import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useScrollRestoration } from "use-scroll-restoration";

function LinkTab(props) {
  const Navi = useNavigate();

  return (
    <Tab
      component={NavLink}
      style={({ isActive }) => {
        return {
          color: isActive ? "#fff" : "#ddd",
          fontSize: isActive ? "15px" : "12px",
          //borderBottom: isActive? '0.3em solid  #fff': "none",
          textRendering: isActive ? "optimizeLegibility" : "",
        };
      }}
      className={({ isActive, isPending }) => {
        return isActive ? "active" : isPending ? "pending" : "";
      }}
      {...props}
      disableTouchRipple
    />
  );
}

export default function NavTab() {
  const { pathname } = useLocation();
  const path = pathname.split("/")[1];
  const [value, setValue] = React.useState(path || "home");

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    window.addEventListener("popstate", () => {
      const loc = window.location.pathname.split("/")[1];
      setTimeout(setValue(loc), 200);
    });

    return () => {
      window.removeEventListener("popstate", () => {
       const loc = window.location.pathname.split("/")[1];
        setTimeout(setValue(loc), 200);
      });
    };
  }, [path]);

 

  return (
    <Box
      sx={{
        width: "100%",
        height: "70%",
        flexGrow: 1,
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      <Tabs
        scrollButtons
        value={value}
        variant="fullWidth"
        onChange={handleChange}
        aria-label="nav tabs example"
        sx={{
          "& .MuiTab-root": {
            fontWeight: "400",
            backgroundColor: "inherit",
            textDecoration: "none",
          },
          "& .MuiTabs-indicator": { backgroundColor: "#fff" },
        }}
      >
        <LinkTab
          label="Hire"
          to="home"
          value="home"
          className="home"
        />
        <LinkTab
          label="Chat"
          to="chatRoom"
          value="chatRoom"
          className="chatRoom"
        />
        <LinkTab
          label="Posts"
          to="catalouge"
          preventScrollReset={true}
          value="posts"
          className="catalouge"
        />
      </Tabs>
    </Box>
  );
}
