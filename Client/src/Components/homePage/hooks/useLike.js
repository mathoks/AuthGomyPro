import { useMutation } from "@apollo/client";
import { LIKE_USER } from "../../../Mutation/ApiMutate";

export const useLike = (list) => {
  const userInfo = { ...list }; // Shallow copy the list into userInfo

  const [like, { data }] = useMutation(LIKE_USER);
  const submit = async () => {
    try {
      await like({
  
        onError: ()=>{
        
        },
        variables: {
          ids: userInfo,
        },
        fetchPolicy : "network-only",
        update: (cache, { data }) => {
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
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return { submit };
};

