import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  CallOutlined,
  WhatsApp,
  ThumbUpOutlined,
  ThumbDownOutlined,
  Verified,
} from "@mui/icons-material";
import {
  styled,
  alpha,
  Card,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import { Link, useLocation } from "react-router-dom";
import { stringAvatar } from "../../../utills/stringAvatar";
import myUpper from "../../../utills/caps";
import { useLike } from "../hooks/useLike";
import { useSetRecoilState } from "recoil";
import { searchIn } from "../../../utills/store";
import { useSubscription } from "@apollo/client";
import { LIKE_SUBSCRIPTION } from "../../../subscriptions/subscriptions";
import ChatOption from "./chatMenu";

const UserWrapper = styled(Card)(({ theme }) => ({
  position: "relative",
  // color: "GrayText",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 1),
  boxShadow: theme.shadows[10],
  overflowY: "scroll",
  transition: theme.transitions.create("open", {
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
  }),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 1),
    boxShadow: theme.shadows[10],
  },
  //marginRight: theme.spacing(2),
  marginBottom: "15px",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

export default function Index({
  firstname,
  about,
  skill,
  name,
  city,
  idx,
  user_id,
  phone,
  total,
  total2 = 4,
  __typename,
}) {
  const [mess, setmess] = useState("")
  const reple = useMemo(() => stringAvatar(name), [name]);
  const { pathname } = useLocation();
  const setsearching = useSetRecoilState(searchIn);

  const info = {
    liked_id: user_id,
  };

  React.useEffect(() => {
    if (pathname === "/home") setsearching(false);
  }, [pathname]);

  const { submit } = useLike(info);
  useSubscription (LIKE_SUBSCRIPTION, {
    fetchPolicy: "no-cache",
   async onSubscriptionData ({subscriptionData: {data}}) {
        const {TotalCount: {message}} = await data.rating_like
        console.log(message)
    },
  });

  // const { data } = useSubscription(LIKE_SUBSCRIPTION, {
  //   shouldResubscribe: true,
  //   fetchPolicy: "network-only",
  //   async onSubscriptionData () {
      
  //     if(data){

  //       const {
  //         rating_like: {
  //           TotalCount: { message },
  //         },
  //       } = await data;
  //     setmess(message) 
  //       console.log(mess)
  //     }
  //   },
  // });

  // if(data)
  // console.log(data.rating_like.TotalCount.message)

  const Features = [
    {
      val: total,
      Icon: <ThumbUpOutlined size="20px" />,
      onClick: useCallback(() => {
        submit();
      }, []),
      label: "total-likes",
    },

    {
      val: total2 === 0 ? null : total2,
      Icon: <ThumbDownOutlined size="20px" />,
      onClick: () => {
        console.log("down");
      },
      label: "total-dislikes",
    },

    {
      Icon: <WhatsApp/>,

      onClick: () => {
        window.location.href = ` http://wa.me/234+${phone}`;
      },
      label: "chat",
    },

    {
      Icon: <CallOutlined />,
      onClick: () => {
        window.location.href = "tel:" + { phone };
      },
      label: "call-provider",
    },
  ];

  return (
    <>
      <Stack
        direction={{ xs: "column", sm: "column", md: "row" }}
        sx={{ display: { lg: "grid" } }}
        gap={1}
      >
        <UserWrapper>
          <Link
            preventScrollReset={true}
            to={`/user/${user_id}/About`}
            style={{ textDecoration: "none", color: "inherit" }}
            onClick={() => {
              console.log("open drawer");
            }}
          >
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar {...reple} />
                </ListItemAvatar>
                <ListItemText
                  insert="true"
                  primary={
                    <>
                      {myUpper(name)}
                      {<Verified color="primary" fontSize="12px" />}
                    </>
                  }
                  primaryTypographyProps={{
                    fontSize: 17,
                    fontFamily: "sans-serif",
                    fontWeight: "300",
                    lineHeight: "50px",
                    pb: "10px",
                    mb: "5px",
                    wrap: "break-word",
                    width: "200px",
                    textOverflow: "[...]",
                    overflow: "clip",
                    component: "span",
                    textRendering: "optimizeLegibility",
                  }}
                  secondary={
                    <>
                      <li> {__typename}</li>
                      <li>
                        {" "}
                        {city.cityname} {city.name}
                      </li>
                    </>
                  }
                  secondaryTypographyProps={{
                    noWrap: true,
                    component: "ul",
                    fontSize: 15,
                    fontWeight: 100,
                    lineHeight: "30px",
                    color: "inherit",
                    display: "block",
                    margin: 0,
                    padding: 0,
                  }}
                  sx={{
                    my: 0,
                    listStyleType: "none",
                  }}
                />
              </ListItem>
            </List>

            <ListItemText
              secondary={about}
              secondaryTypographyProps={{
                marginTop: "-4px",
                marginLeft: "70px",
                wrap: "normal",
                width: "200px",
                fontSize: 13,
                lineHeight: "16px",
                color: "text.secondary",
                display: "block",
              }}
            />
          </Link>
          <Divider variant="inset" />
          <Stack>
            <List sx={{ display: "flex", ml: "55px", mt: "-15px" }}>
              {Features.map((item, index) => {
                const { Icon, onClick, val, label } = item;
                return (
                  <ListItemButton
                    key={index}
                    alignItems="flex-start"
                    aria-label={label}
                    onClick={onClick}
                    disableRipple
                  >
                    <ListItemIcon sx={{ color: "#231709" }}>
                      {Icon}
                    </ListItemIcon>
                    <ListItemText
                      secondary={
                        <span
                          style={{
                            marginLeft: "-12px",
                            marginTop: "12px",
                            paddingTop: "10px",
                          }}
                        >
                          {val}
                        </span>
                      }
                    ></ListItemText>
                  </ListItemButton>
                );
              })}
            </List>
            {/* <ChatOption/> */}
          </Stack>
          
        </UserWrapper>
      </Stack>
      
      <Divider variant="inset" component="div" />
    </>
  );
}
