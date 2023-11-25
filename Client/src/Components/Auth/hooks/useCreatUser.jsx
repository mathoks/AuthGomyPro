import { useMutation } from "@apollo/client";
import { ADD_NEW_USER } from "../../../Mutation/ApiMutate";
import { userMessage, userNew, userSuccess } from "../../../utills/store";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

export const useCreatUser = (list, cat, city) => {
  const [message, setmessage] = useRecoilState(userMessage);
  const [newuser, setnewuser] = useRecoilState(userNew);
  const [IsSuccess, setIsSuccess] = useRecoilState(userSuccess);
  const Navi = useNavigate()
  const userInfo = Object.assign(
    {},
    { location: city.toLowerCase(), category: cat, ...list }
  );

 
  
  const [addUser, { data, error: isError, loading }] = useMutation(ADD_NEW_USER);

  if (isError) {
    console.log(isError)
    return  setmessage(isError);
  }

  async function submit() {
   
      const { data: da, errors } = await addUser({
        variables: {
          info: userInfo,
        },
        onCompleted: ()=> Navi('/get-started/Signin')
      });

     if (errors){
      console.log(errors)
      return setmessage(errors)

     }

       const {
          code,
          data: user,
          success,
          message: mess,
        } = await da.createUser;
        if (code === 404) {
          return setmessage(mess);
        }
        // user.authToken = authToken;
        // localStorage.setItem("user", JSON.stringify(user));
        setIsSuccess(success);
        setmessage(mess);
        setnewuser(user);
        
      }
  
      
      return { isError, loading, submit, message, IsSuccess, newuser, data 
    
  }

 };
 



 

