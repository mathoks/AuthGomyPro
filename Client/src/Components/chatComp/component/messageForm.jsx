import {
  Box,
  Chip,
  Container,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import React, { useEffect } from "react";
import { InputMess } from "./inputMess";
import MesegeStack from "./mesegeStack";
import { useGetMainChat } from "../hooks/useGetmainChat";
import ChatUser from "./chatUse";
import { useDraw } from "../hooks/useDraw3";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { chatMess, currentUser } from "../../../utills/store";
import { useSubscription } from "@apollo/client";
import { MAIN_CHAT_SUB } from "../../../subscriptions/subscriptions";






const MessageForm = () => {
  const [draw, setdraw] = React.useState(196);
  const chatArray = useRecoilValue(chatMess);
  const setChatArray = useSetRecoilState(chatMess);
  const { data } = useGetMainChat();
  const { handleClose, isOpen } = useDraw();
  const curr_user = useRecoilValue(currentUser);


  
   
   useEffect(() => {
    document.getElementById("scroll").scrollTo(0,document.getElementById("scroll").scrollHeight);
   }, [chatArray]);
  

  const newMap = new Map();
  data?.getMainChat.forEach((element) => {
    newMap.set(element.user_id, element);
  });

  const NewUsers = Array.from(newMap.values());

  useSubscription (MAIN_CHAT_SUB, {
    fetchPolicy: "no-cache",
   onSubscriptionData ({subscriptionData: {data}}) {
        const {main_chat} = data
        if(main_chat.user_id)
        setChatArray((prev)=>[...prev, main_chat ]); 
    },
  });
 
  React.useEffect(() => {
    if (data?.getMainChat?.length && curr_user) {
      return setChatArray(data.getMainChat);
    }
  }, [data, curr_user]);

  const drawerWidth = 200;
  const theme = useTheme();

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "left",
    padding: theme.spacing(2, 2),
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
    backgroundColor: "#ddd",
    color: "black",
  }));

  const months = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "November",
    "December",
  ];
  const date = new Date();

  const month = `${date.getDate()} ${
    months[date.getMonth() - 1]
  } ${date.getFullYear()}`;

  return (
    
    <Box
      id="scroll"
      sx={{
        WebkitScrollSnapType: "-moz-initial",
        overflow: "scroll",
        height: "73vh",
      }}
    >
      <Stack
        paddingTop={1}
        paddingBottom={1}
        direction={"row"}
        spacing={8}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Box></Box>
        <Box>
          <Chip label={month} />
        </Box>
        <Box></Box>
      </Stack>

      {chatArray.map((item, id, array) =>{ 
        
        let same = false
        {/* const compare = (item)=> {
          if(id === 0 || array){
          if(item.username === chatArray[id-1].username ) 
          return same = true
        }
        else return same = false
        } */}
        const compare = ()=>{
          if (id === 0 || array[id-1].username !== item.username){
          return same = false
          }
          else return same = true
        }
        compare(item)
        
        return (
        
        <Box
          sx={{
            marginRight: "10px",
            display: "flex",
            justifyContent:
              item.user_id === curr_user.like_id ? "flex-end" : "flex-start",
          }}
        >
          <MesegeStack key={item.timestamp} {...item} show = {same}/>
        </Box>
        
      )})}

      <InputMess />
      <Box sx={{ paddingTop: "40px" }}>
        <Drawer
          onClose={handleClose}
          open={isOpen}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              position: "absolute",
              top: "106px",
              left: draw,
            },
          }}
          variant="temporary"
        >
          <DrawerHeader>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexBasis: "90%",
                  gap: "10px",
                }}
              >
                <Container>
                  <Typography component={"h2"} sx={{ fontSize: "20px" }}>
                    {" "}
                    Users
                  </Typography>
                </Container>
              </Box>

              <IconButton
                onClick={handleClose}
                // sx={{ ml: "7%" }}
              >
                {theme.direction === "rtl" ? (
                  <ChevronLeftIcon />
                ) : (
                  <ChevronRightIcon />
                )}
              </IconButton>
            </Box>
          </DrawerHeader>
          <Divider />
          <Box sx={{ paddingTop: "10px" }}>
            {NewUsers.map((item) => (
              <ChatUser key={item.idx} {...item} />
            ))}
          </Box>
        </Drawer>
      </Box>

      {/* </Stack> */}
    </Box>
  );
};

export default MessageForm;
