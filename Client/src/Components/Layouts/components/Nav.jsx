import React, { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import NavTab from "../../homePage/components/Tab";
import NavDrawer from "../../homePage/components/NavDrawer";
import { searchIn, userData } from "../../../utills/store";
import { useNavDraw } from "../../homePage/hooks/useDrawerNav";
import { MenuItems1 } from "./menuItem";
import { SearchWrapper } from "./searchWrapper";
import { useGetuser } from "../../Auth/hooks/usegetDetails";
import { useGetRefreshToken } from "../../Auth/hooks/useGetRefeshTok";

export default function Nav() {
  const { handleOpen } = useNavDraw();
  const searching = useRecoilValue(searchIn);
  const setSearching = useSetRecoilState(searchIn);
  const setData = useSetRecoilState(userData);
  const { getDetails, data, error } = useGetuser();
  const { token } = useGetRefreshToken();
  

  useEffect(() => {
    const Token = sessionStorage.getItem("token");
    if (Token) {
    getDetails();
    
    }

    return () => {
      if (data) return setData(data?.me);
    };
  }, [error, token]);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" sx={{ bgcolor: "#3b82fe" }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              onClick={handleOpen}
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Box>
              <Typography
                variant="h6"
                noWrap
                // component="div"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                4hire
              </Typography>
            </Box>
            <Box sx={{ flexGrow: { xs: 0, sm: 0.6, md: 1 } }} />
            <Box>
              <SearchWrapper
                searching={searching}
                setSearching={setSearching}
              />
            </Box>
            <Box sx={{ flexGrow: 1 }} />

            <Box>
              <MenuItems1 />
            </Box>
          </Toolbar>

          {searching ? "" : <NavTab />}
        </AppBar>
        <NavDrawer />
      </Box>
      {/* { searching ? createPortal(<SearchForm/>, document.getElementById('search')): ''} */}
    </>
  );
}
