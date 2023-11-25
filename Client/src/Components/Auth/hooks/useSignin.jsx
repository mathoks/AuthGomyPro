import { useMutation , useQuery} from "@apollo/client";
import { LOG_USER} from "../../../Mutation/ApiMutate";
import { refreshed, userData, userMessage, userNew, userSuccess } from "../../../utills/store";
import { useRecoilState, useSetRecoilState } from "recoil";
import { GraphQLError } from "graphql";
import { useGetuser } from "./usegetDetails";
import { useNavigate } from "react-router-dom";

export const useSignUser = (list) => {
  const [message, setmessage] = useRecoilState(userMessage);
  const [newuser, setnewuser] = useRecoilState(userNew);
  const [IsSuccess, setIsSuccess] = useRecoilState(userSuccess);
  const setdata = useSetRecoilState(userData)
  const Navi = useNavigate()
  const setRefreshed = useSetRecoilState(refreshed)

  
  
  const userInfo = Object.assign(
    {},
    { ...list }
  );

 
 try {

  const [signUser, { data, error, loading }] = useMutation(LOG_USER);
  //const {data: datum, refetch} = useGetuser()

  async function submit() { 
    const { data, errors } = await signUser({
        variables: {
         credentials : userInfo,
        },
        onCompleted: (data)=> {
        console.log(data.authenticate.data)
        sessionStorage.setItem("token", JSON.stringify(data.authenticate.data));
        setIsSuccess(data.authenticate.success);
        setmessage(data.authenticate.mess);
        console.log(data.authenticate.IsSuccess)
        setnewuser(data.authenticate.data);
        
        return setRefreshed(true) 
        },

        onError: (error)=>{
          if (error.message) {
            return setmessage(error.message);
            
          }
        }
      });  
      
    }

     
    
      
      return { loading, submit, message, IsSuccess, newuser, data }


  
 } catch (error) {
  throw new Error ("something happened")
 } 
  

 };
 



 

