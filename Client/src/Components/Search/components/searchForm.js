// import * as React from 'react'
// import {
//   List,
//   ListItemButton,
//   Box,
//   ListItemIcon,
//   ListItemText,
//   Typography,
//   Container,
//   ListItem,
// } from "@mui/material";
// import { Refresh } from "@mui/icons-material";
// import { styled, alpha } from "@mui/material";
// import Index from "../../homePage/components";
// import { useRecoilValue, useResetRecoilState } from "recoil";
// import { notfound, searchdata, values } from "../../../utills/store";
// import FilterChip  from "./filterChip";
// import { getParams } from '../../../utills/getParams'

// const SearchItemWrapper = styled(Container)(({ theme }) => ({
//   position: "relative",
//   color: "GrayText",

//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 1),

//   overflowY: "scroll",
//   transition: theme.transitions.create("open", {
//     easing: "cubic-bezier(0.4, 0, 0.2, 1)",
//   }),
//   "&:hover": {
//     backgroundColor: alpha(theme.palette.common.white, 1),
//   },
//   marginRight: theme.spacing(2),
//   marginLeft: "0px",
//   marginTop: "-10px",
//   // width: '100%',
//   // height:'800vh',
//   [theme.breakpoints.up("sm")]: {
//     marginLeft: theme.spacing(3),
//     width: "auto",
//   },
// }));
// export const SearchForm = () => {
//   const resetData = useResetRecoilState(searchdata);
//   const searchData = useRecoilValue(searchdata);
//   const notfounds = useRecoilValue(notfound)
//   const isActive = useRecoilValue(values)
//   //var query = getParams('q')

//   return (
//     <>
//       <SearchItemWrapper>
//         <Box>
//           <List >
//           <ListItem disablePadding>
//             <ListItemButton disableRipple>
//               <ListItemIcon
//                 children={<Refresh />}
//                 onClick={resetData}
//                 sx={{ minWidth: (theme) => theme.spacing(4) }}
//               />{" "}
//               <ListItemText children="Reset all" />
//             </ListItemButton>
//           </ListItem>
//           <ListItem sx={{justifyContent: "center", display: "flex", textAlign: "center"}} disablePadding>
//           <ListItemText  children= {isActive ? "auto filtering active" : " "}/>
//           </ListItem>
//           <ListItem disablePadding >

//         <FilterChip />

//         </ListItem>
//             <ListItem>
//             </ListItem>
//           </List>
//         </Box>
//       </SearchItemWrapper>

//       {!notfound ?  <Box><Typography>not found</Typography></Box>
// : searchData ? (
//         searchData.map((user, idx) => (
//           <Box key={idx}>
//             <Index key={user.idx} {...user}></Index>
//           </Box>
//         ))
//       ) : (
//         <Typography>searching</Typography>
//       )}
//     </>
//   );
// };

import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import { ArrowBack, Refresh } from "@mui/icons-material";
import {
  Container,
  Box,
  Typography,
  Divider,
  Card,
  CardContent,
  CardActionArea,
  CardActions,
  Button,
  Fab
} from "@mui/material";
import Index from "../../homePage/components";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { notfound, searchdata, values } from "../../../utills/store";
import FilterChip from "./filterChip";
import { useNavigate } from "react-router-dom";
import { Back } from "../../Layouts/components/buttons";

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
  
  
  
  return (
    <>
      <SearchItemWrapper>
        <Box>
          <Card sx={{m: 2}}>
            <CardActionArea sx={{bgcolor:"#fff"}}>
              <CardContent sx={{textAlign:"initial", textRendering: "optimizeLegibility" }}> <Typography gutterBottom component={'div'}>4hire</Typography>
              <Typography color={"text.secondary"}> You can search using key words on location, city, state, name, phone, skill, and category active filtering is applied dynamically</Typography></CardContent>
            </CardActionArea>
            {/* <Divider /> */}
            <CardActions sx={{bgcolor: "#fff"}}>
             
                <Button
                  startIcon={<Refresh />}
                  children="Reset"
                  onClick={resetData}
                  sx={{ minWidth: (theme) => theme.spacing(4) }}
                />
                
              
            </CardActions>
          </Card>

          <FilterChip />
        </Box>
      </SearchItemWrapper>
      <Divider variant="middle" sx={{ mb: 2, color: "deepskyblue" }} />

      {searchData ? (
        searchData.map((user, idx) => (
          <Box key={idx}>
            <Index key={user.idx} {...user}></Index>
          </Box>
        ))
      ) : (
        <Typography>not found</Typography>
      )}
      <Back path ={'/home'}/>
      
    </>
  );
};
