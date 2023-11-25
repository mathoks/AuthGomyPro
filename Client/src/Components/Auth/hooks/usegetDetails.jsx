import { useLazyQuery } from "@apollo/client";
import { GETLOGEDUSER } from "../../../Query/Api";
import { useSetRecoilState } from "recoil";
import { userData } from "../../../utills/store";

export const useGetuser = () => {
  const setUserdata = useSetRecoilState(userData);
  

  const [getDetails, { loading, error, data }] = useLazyQuery(GETLOGEDUSER, {
   onError: ({ graphQLErrors }) => {
      if (
        graphQLErrors[0].message === "token expired" ||
        graphQLErrors[0].message === "try again"
      ) {
        return 
      } else
       if (graphQLErrors[0].message === "log in" && !data?.me)
        return
    },
    onCompleted: (data) => {
      setUserdata(data.me);
      return data;
    },
  });

  return { getDetails, error, data, loading };
};
