import { Avatar, Box, Container, Stack, Typography } from "@mui/material";
import React, { useMemo } from "react";
import { stringAvatar } from "../../../utills/stringAvatar";
import { Link } from "react-router-dom";

const ChatUser= ({ user_id, username}) => {
  //const names = `${firstname}` `${lastname}` 
 
  const avar = useMemo(() => stringAvatar(username),[username]);
  return (
    <Box sx={{padding: "8px"}}>
    <Container>
      <Link to={`/user/${user_id}/About`} style={{textDecoration: "none"}}>
        <Stack direction={"row"} spacing={2} sx={{alignItems: "center"}}>
          <Avatar {...avar} />

          <Typography
            children={username}
            sx={{ textRendering: "optimizeLegibility", color: "GrayText" }}
          />
        </Stack>
      </Link>
      </Container>
    </Box>
  );
};

export default ChatUser;
