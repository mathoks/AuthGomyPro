import client from "../../../client";
import { LIKE_USER } from "../../../Mutation/ApiMutate";
export async function retryLike(list){
    

      const userInfo = { ...list }; // Shallow copy the list into userInfo
    
      try {
         await client.mutate({mutation:LIKE_USER, variables: {ids: userInfo}, 
        update: (cache, {data})=>{
            const { edges } = data.rating_like;
              cache.modify({
                fields: {
                  id: cache.identify(edges.node),
    
                  Users(existingUsers = {}, { readField }) {
                    console.log(existingUsers);
                    const updatedUser = [...existingUsers.edges];
                    const userIndex = updatedUser.findIndex(
                      (edge) =>
                        readField("user_id", edge.node) === edges.node.user_id
                    );
                    if (userIndex > 0) {
                      updatedUser[userIndex] = edges;
                    }
    
                    return existingUsers;
                  },
                },
              });
      }});
    }
    catch(err){
        console.log(err)
    }
       

}