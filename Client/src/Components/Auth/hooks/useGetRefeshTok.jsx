import { useMutation } from "@apollo/client";
import { GETREFRESH } from "../../../Mutation/ApiMutate";
import { useNavigate } from "react-router-dom";

export const useGetRefreshToken = () => {
  const Navi = useNavigate();

  const [getRefresh, { data: token, error }] = useMutation(GETREFRESH);

  async function getRefreshed() {
    const { data: da, err } = await getRefresh({
      onCompleted: () => {
        if (token)
        return  sessionStorage.setItem("token", JSON.stringify(token?.refresh));
      },
    });

    if (err?.graphQLErrors[0].message === "Please Logging") {
      return //Navi("Signin");

    }

    return da;
  }
  return { getRefreshed, token, error };
};
