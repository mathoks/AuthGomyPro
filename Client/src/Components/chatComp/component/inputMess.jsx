import React, { useCallback, useEffect, useRef } from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { Chat } from "@mui/icons-material";
import { useState } from "react";
import { SendMes } from "./send";
import { Box, Paper } from "@mui/material";
import { useSendChat , useTyping} from "../hooks/useChat";
import { useSubscription } from "@apollo/client";
import { MAIN_CHAT_SUB, TYPING } from "../../../subscriptions/subscriptions";
import { useSetRecoilState } from "recoil";
import { chatMess } from "../../../utills/store";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.1),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 1),
  },
  marginRight: '0px',//theme.spacing(1),
  marginLeft: "2px",
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "black",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export const InputMess = () => {
  const [val, setVal] = useState("");
  const messText = useRef(null);
  const controller = useRef(new AbortController());
  const [typs, setTyp] = useState(false)
  
  const info = {
    mess: val,
    room_id : 123, 
  }


  const {typing} = useTyping(typs)
  const {submit} = useSendChat(info)
  

  useSubscription (TYPING, {
    fetchPolicy: "no-cache",
   onSubscriptionData ({subscriptionData: {data}}) {
        
        console.log(data)
        
    },
  });



  useEffect(() => {
    if (controller.current) {
      controller.current.abort("still typing....");
    }
    controller.current = new AbortController();
  }, [messText]);

  const handleKeydown = (e) => {
    setTyp(true)
    typing()
    setVal(e.target.value);
    if (e.key === "Enter" && val !== "") {
        e.preventDefault()
        submit()
      setVal("")
      setTyp(false)
    }
   
  };

  const Submit = useCallback(() => {
    if (val !== "") {
      submit()
      setVal("")
    }
  }, [val, submit]);

  return (


    <Box sx={{display: "flex", justifyContent: "space-between"}}>
    <Paper elevation={5} sx={{border: "2px solid white", direction: "ltr", display: "flex", width: "75%", position: "absolute", bottom: "4px", right: "10px", left: "20px"}} >
    <Search >
      <SearchIconWrapper>
        <Chat color="primary" />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Message…"
        inputProps={{ "aria-label": "search" }}
        value={val}
        ref={messText}
        onInput={() => console.log("yess")}
        id="hjjj"
        type="Text"
        onChange={handleKeydown}
        onKeyDown={handleKeydown}
        multiline
        fullWidth
      />
       
       
    
    </Search>
    </Paper>
    <Box sx={{position: "absolute", bottom: "2px" , right: "15px"}}>
    <SendMes okay={Submit}/>
    </Box>
    </Box>
    
  );
};
