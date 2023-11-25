import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { chatNav, useloc } from "../../../utills/store";
import { useLocation, useNavigate, } from "react-router-dom";
import React from "react";


export const useDraw = () => {    
  const Navi = useNavigate();
  const [isOpen, setisOpen] = useRecoilState(chatNav);
  const SetNav = useSetRecoilState(chatNav);
    const {pathname} = useLocation()
    const path = pathname.split('/')[2]
  const [val, setVal] = React.useState(path || "messages") 

 
  const handleOpen = () => {
    setisOpen(true);
  };

  const handleClose = () => {
    SetNav(false);  
    Navi(-1);    
  };

  return {
    isOpen,
    handleClose,
    handleOpen,
    setVal,
    val
  };
};


