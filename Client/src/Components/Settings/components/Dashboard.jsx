import React from "react";
import { useNavigate } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import {  Container, AppBar, Drawer } from "@mui/material/";
import { useDashDraw } from "../../../hooks/useDasNav";
import {
  Box,
} from "@mui/material";
import { MenuItems1 } from "../../Layouts/components/menuItem";
import Tab3 from "./tab3";

function Dashboard() {
  const { isOpen, handleClose } = useDashDraw();
  const drawerWidth = window.innerWidth;
  const Navi = useNavigate();
  

  const handleClosed = () => {
    handleClose();
    return Navi('/home');
  };

  const theme = useTheme();

  

  
  const StyledAva = styled("div")({
    position: "absolute",
    top: 50,
    left: 10,
    right: 0,
    margin: "0 auto",
    //backgroundColor: "#fff",
    //onClick :`${()=>{(console.log("hyp"))}}`,
    mini: "true",
  });

  return (
    <>
      <Drawer
        open={isOpen}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="temporary"
        anchor="right"
        onClose={handleClosed}
        // onOpen={() => {
        //   Navi("/settings/Dashboard");
        // }}
      >
        <AppBar sx={{ height: "80px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              m: "15px 15px",
            }}
          >
            <IconButton onClick={handleClosed}>
              {theme.direction === "rtl" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>

            <Typography
              variant="body1"
              sx={{
                color: "#fff",
                paddingLeft: "5%",
                "& .MuiTypography-body1": { paddingLeft: "23%" },
              }}
              children="mat"
            />

            <MenuItems1 />
          </Box>
          <Box>
            <StyledAva
              children={
                <>
                  <IconButton>
                    <Avatar />
                  </IconButton>
                </>
              }
            />
          </Box>
        </AppBar>

        <Divider />

        <Container>
          <Box sx={{ paddingTop: "50px" }}>
            <Tab3 />
          </Box>
        </Container>
      </Drawer>
    </>
  );
}

export default Dashboard;
