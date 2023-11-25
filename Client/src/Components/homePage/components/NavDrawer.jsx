import React from "react"
import { NavLink, Link, useNavigate } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";

import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  Typography,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import InfoIcon from "@mui/icons-material/Info";
import SettingsIcon from "@mui/icons-material/Settings";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import Dashboard from '../../Settings/components/Dashboard'
//import Signin from './SignIn'
import "../css/Nav.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { token, userData} from "../../../utills/store";
import { useNavDraw } from "../hooks/useDrawerNav";
import { useDashDraw } from "../../../hooks/useDasNav";
import { useRecoilValue, useSetRecoilState } from "recoil";

const NavDrawer = () => {
    const username = useRecoilValue(token)
    const userInfo = useRecoilValue(userData)
    
  
  const Accord = (
    <Accordion elevation={0} sx={{ml: '-12px'}}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        arial-controls="panel1a-content"
      >
        <Typography sx={{flexShrink: 0}}>About</Typography>
      </AccordionSummary>{" "}
      <AccordionDetails>
        <Typography sx={{color: 'text.secondary'}}> you can get to know us better by reaching out </Typography>
      </AccordionDetails>{" "}
    </Accordion>
  );

  
  
  const {handleClose, isOpen} = useNavDraw();
  const {handleOpen} = useDashDraw()
  


 const Token = sessionStorage.getItem("token") 


  
  
  const Navi = useNavigate()
  const drawerWidth = 240;
  const theme = useTheme();

const gotoDash = ()=> {
  if(userInfo && Token ){
  handleClose(); 
  handleOpen(); 
  Navi('/settings/Dashboard')
  }
  else return Navi('/get-started/SignIn')
}
  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "left",
    padding: theme.spacing(2, 2),
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
    backgroundColor: "#0080ff",
    color: "white",
  }));

  const Features = [
    {
      Name: Accord,
      Icon: <InfoIcon />,
      Value: 1,
      //onClick: () => handleClose() 
    },

    {
      Name: "Settings",
      //"Link": `${<Signin token={token} />}`,
      Icon: <SettingsIcon />,
      Value: 2,
      onClick: () => {
        gotoDash() 
      },
    },

    {
      Name: "Blog",
      Icon: <RssFeedIcon />,
      Value: 3,
      onClick: () => {
        handleClose()
      },
    },

    {
      Name: "Contact Us",
      link: `/settings/Dashboard`,
      Icon: <ContactSupportIcon />,
      Value: 4,
      onClick: () => {
         handleClose()
      },
    },
  ];

  

  return (
    <Box>
      <Drawer
        onClose = {handleClose}
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
        anchor="left"
        
      >
        <DrawerHeader>
        <Box sx={{display: 'flex', justifyContent:'space-between', width:'100%'}}>
        <Box sx={{display: 'flex', alignItems:'center', flexBasis: '90%', gap: "10px"}}>
          <Avatar
            src={username ? "Mathoks" : ""}
            alt="mathoks"
            sx={{ width: "60", height: "60" }}
          />
          {username ? (
            <NavLink
              to="#"
              style={{ fontFamily:'inherit', color: "#fff", textDecoration: "none" }}
              preventScrollReset = {true}
            >
              
              {username}
            </NavLink>
          ) : (
            <Link
              to="/get-started/Signin"
              style={{ fontWeight: "bold", textDecoration: "none" }}
              onClick={handleClose}
              preventScrollReset = {true}
            >
              <Button sx={{ color: "#fff", padding: "15px" }}>Signin</Button>
            </Link>
          )}
          </Box>

          <IconButton
            onClick={handleClose}
           // sx={{ ml: "7%" }}
          >
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
          </Box>
        </DrawerHeader>
        <Divider />
        <List sx={{ display: "block" }}>
          {Features.map((item, index) => {
            const { Name, Icon, onClick } = item;
            return (
              <>
              <ListItemButton
                key={index}
                alignItems="flex-start"
                onClick={onClick}
                
              >
             
                <ListItemIcon sx={{ color: "#0080ff" }}>{Icon}</ListItemIcon>
                
                <ListItemText
                  primary={Name}
                  sx={{ display: "block", fontWeight: "bold" }}
                />
              </ListItemButton>
              
              </>
            );
          })}
        
        </List>
       
      </Drawer>

      <Dashboard/> 
    </Box>
  );
};

export default NavDrawer;
