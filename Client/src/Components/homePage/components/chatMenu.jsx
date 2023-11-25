import { Chat, Message, WhatsApp } from "@mui/icons-material";
import Menu from "@mui/icons-material/Menu";
import { IconButton, MenuItem , Stack, Typography} from "@mui/material";
import React from "react";


const ChatOption = ()=>{
const [anchorEl, setAnchorEl] = React.useState(null);
const isMenuOpen = Boolean(anchorEl);

const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

const message = [{
    icon: <WhatsApp/>,
    name: "Whatsapp",
    onClick: ()=>console.log("whatsapp")
},

{
    icon: <Message/>,
    name: "Messenger",
    onClick: ()=>console.log("whatsapp")
}]
const details = (
    <Menu
      sx={{ mt: "45px" }}
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={false}
      onClose={handleMenuClose}
    >
      {message.map((message, idx) => (
        <Chat key={idx} onClick={message.onClick}>
            <Stack>
            {/* <IconButton>{message.icon}</IconButton> */}
            <Typography textAlign="center">{message.name}</Typography>
            </Stack>
         
        </Chat>
      ))}
    </Menu>
  );
      
return (
    <>
        <IconButton onClick={handleProfileMenuOpen}><Chat/></IconButton>
        {details}
    </>
)
}
export default ChatOption