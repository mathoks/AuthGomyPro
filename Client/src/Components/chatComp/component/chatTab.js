import * as React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useDraw } from "../hooks/useDraw3";

const AntTabs = styled(Tabs)({
  borderBottom: "1px solid #e8e8e8",
  "& .MuiTabs-indicator": {
    backgroundColor: "#1890ff",
  },
});

const AntTab = styled((props) => (
  <Tab disableRipple {...props} component={Link} />
))(({ theme }) => ({
  textTransform: "none",
  minWidth: 0,
  [theme.breakpoints.up("sm")]: {
    minWidth: 0,
  },
  fontWeight: theme.typography.fontWeightRegular,
  marginRight: theme.spacing(2),
  paddingTop: "20px",
  color: "rgba(0, 0, 0, 0.85)",
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  "&:hover": {
    color: "#40a9ff",
    opacity: 1,
  },
  "&.Mui-selected": {
    color: "#1890ff",
    fontWeight: theme.typography.fontWeightMedium,
  },
  "&.Mui-focusVisible": {
    backgroundColor: "#d1eaff",
  },
}));

export default function ChatTab() {
  const { setVal, val, handleOpen, handleClose } = useDraw();
  const { pathname,  } = useLocation();
  const path = pathname.split("/")[2];
  
 window.onload = ()=>{
    if(path === 'users'){
        handleOpen()
    }
 }

  const handleChange = (_, newValue) => setVal(newValue);


  window.onpopstate = (_, newValue) => {
    setVal(path);
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          position: "sticky !important",
          top: -4,
          zIndex: 100,
        }}
      >
        <Box
          sx={{
            bgcolor: "#fff",
            display: "flex",
            justifyContent: "center",
            marginLeft: "0px",
            width: "100%",
          }}
        >
          <AntTabs value={val} onChange={handleChange} aria-label="ant example">
            <AntTab label="Messages" to="messages" value="messages" />
            <AntTab label="Users" to="users" value="users" onClick={handleOpen}/>
            <AntTab label="Rules" to="rules" value="rules" />
          </AntTabs>
        </Box>
      </Box>
    </>
  );
}
