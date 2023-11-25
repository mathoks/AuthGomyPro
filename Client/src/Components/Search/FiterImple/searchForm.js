import * as React from 'react'
import {
  List,
  ListItemButton,
  Box,
  ListItemIcon,
  ListItemText,
  Typography,
  Container,
  ListItem,
} from "@mui/material";
import { Refresh } from "@mui/icons-material";
import { styled, alpha } from "@mui/material";
import Index from "../../homePage/components";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { notfound, searchdata } from "../../../utills/store";
import { FilterChip } from "./filterChip";
import { useState } from "react";
import { MyFilter } from "./filterList";
import { useSearchParams } from "react-router-dom";

const SearchItemWrapper = styled(Container)(({ theme }) => ({
  position: "relative",
  color: "GrayText",

  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 1),

  overflowY: "scroll",
  transition: theme.transitions.create("open", {
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
  }),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 1),
  },
  marginRight: theme.spacing(2),
  marginLeft: "0px",
  marginTop: "-10px",
  // width: '100%',
  // height:'800vh',
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));
export const SearchForm = () => {
  const resetData = useResetRecoilState(searchdata);
  const searchData = useRecoilValue(searchdata);
  const notfounds = useRecoilValue(notfound)
  


  
  return (
    <>
      <SearchItemWrapper>
        <Box>
          <List>
          <ListItem>
            <ListItemButton>
              <ListItemIcon
                children={<Refresh />}
                onClick={resetData}
                sx={{ minWidth: (theme) => theme.spacing(4) }}
              />{" "}
              <ListItemText children="Reset all" />
            </ListItemButton>
          </ListItem>
          <ListItem>
        
        <FilterChip />
        
        </ListItem>
            <ListItem>
            <MyFilter/>
              {/* <ListItemButton disableRipple={true}>
                <ListItemIcon
                  sx={{ minWidth: (theme) => theme.spacing(4) }}
                  children={<TuneOutlined />}
                />

                <ListItemText
                  primary={
                    <Typography children="Filter" sx={{ color: "GrayText" }} />
                  }
                />
              </ListItemButton> */}
            </ListItem>
          </List>
        </Box>
      </SearchItemWrapper>
      
      {!notfound ?  <Box><Typography>not found</Typography></Box>
: searchData ? (
        searchData.map((user, idx) => (
          <Box key={idx}>
            <Index key={user.idx} {...user}></Index>
          </Box>
        ))
      ) : (
        <Typography>searching</Typography>
      )}
    </>
  );
};
