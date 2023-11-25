import client from "../../../client";
import { GETREFRESH } from "../../../Mutation/ApiMutate";

export async function refresh() {
  const { data, errors } = await client.mutate({ mutation: GETREFRESH });
  console.log(data);
  if (data)
    return sessionStorage.setItem("token", JSON.stringify(data?.refresh));
  if (errors?.graphQLErrors[0].message === "Please Logging" || "unauthorized") {
    console.log("please login");
    return;
  }

  return data;
}
