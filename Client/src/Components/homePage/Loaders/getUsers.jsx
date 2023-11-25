import React from "react";
import { Box, CircularProgress } from "@mui/material";
import Errorpage from "../../ErrorPage/components/errorpage";
import Index from "../components";
import { useQuery } from "@apollo/client";
import { GET_ALL_USERS } from "../../../Query/Api";
import InViews from "./InView";
import { useRecoilValue } from "recoil";
import { userData } from "../../../utills/store";

export const UsersLiist = () => {
  // const { onScrollMove } = useScrollRestore();
  // React.useEffect(() => {
  //   onScrollMove();
  // }, []);

  const { data, loading, error, fetchMore } = useQuery(GET_ALL_USERS, {
    variables: { lim: 10 },
    fetchPolicy: "cache-first",
    //  onCompleted: ()=>{
    //   urlParams('page', 1)
    //  }
  });
  const datam = useRecoilValue(userData);
  const remArray = React.useMemo(() => {
    if (datam !== null) {
      console.log(datam);
      return data?.Users?.edges
        ?.filter((item) => item.node.user_id !== datam.user_id)
        .map((item) => <Index key={item.node.idx} {...item.node}></Index>);
    } else {
      console.log("mee");
      return data?.Users?.edges?.map((item) => (
        <Index key={item.node.idx} {...item.node}></Index>
      ));
    }
  }, [data, datam]);

  const handleTrigger = () => {
    if (data?.Users?.pageInfo?.hasNextPage) {
      fetchMore({
        variables: {
          after: data.Users.pageInfo.endCursor,
        },
        //   onCompleted: urlParams('page', data.Users.pageInfo.endCursor)
      });
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Errorpage />;
  if (!data)
    return (
      <div>
        <p>No data</p>
      </div>
    );

  return (
    <>
      {remArray}
      <footer>
        <Box>
          <InViews action={handleTrigger} />
        </Box>
      </footer>
    </>
  );
};
