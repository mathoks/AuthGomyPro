import client from "../../../client";
import { CHAT_MAIN } from "../../../Mutation/ApiMutate";
export async function retryAdd(list){
    
      const userInfo = { ...list };
    
      try {
         await client.mutate({mutation:CHAT_MAIN, variables: {info: userInfo}, 
      })
       
    }
    catch (err){
      console.log(err)  
}
}