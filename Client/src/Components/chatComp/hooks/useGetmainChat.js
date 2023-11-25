import { GET_MAIN_CHAT } from "../../../Query/Api";
import { useQuery } from "@apollo/client";

export const useGetMainChat = ()=>{
    const {data, error, loading} = useQuery(GET_MAIN_CHAT, {
        onCompleted: ()=>{
            
            return data
        },
        onError: (err)=>{
            console.log(err)
            return 
        },
        fetchPolicy: "no-cache"
    })
    return {data, error, loading}
}