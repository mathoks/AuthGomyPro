// import { useQuery } from "@apollo/client";
// import { useEffect, useState } from "react";
// import { useRecoilState } from "recoil";
// import { Load, Users, userError, userTrigger } from "../../../utills/store";
// import { GET_ALL_USERS } from "../../../Query/Api.jsx";
// import { useSetRecoilState } from "recoil";
// import { UsersLiist } from "../Loaders/getUsers";

// const useFetchUsers = (list) => {
// const setUsers = useSetRecoilState(Users);
// const setIsLoading = useSetRecoilState(Load);
// const setErrors = useSetRecoilState(userError);
// const trigger = useRecoilState(userTrigger)
// const setTrigger = useSetRecoilState(userTrigger)
// const [after, setAfter] = useState(null)

// console.log(list)
//   const { loading, data, error, fetchMore } = useQuery (GET_ALL_USERS, {
//     variables: list, 
//     fetchPolicy: "cache-and-network", 
//     //onCompleted: (data)=>{setUsers((prev) => [...new Set([...prev, ...data?.Users?.edges])])}
//   });
//   fetchMore({
//     variables: {
//         after : data?.Users?.pageInfo?.endCursor || null,
//         //hasNextPage: data?.Users?.pageInfo?.hasNextPage,
//         //first: data?.Users?.pageInfo?.first //data?.Users?.pageInfo?.first 
//     },
//   })
  
//      return {data, fetchMore, error, loading}
// }  
// export default useFetchUsers    
       
// //   return {onTrigger, isLoading: loading, isError: error , };
// // }
// // export default useFetchUsers;
// // useEffect(() => {
// //     if(loading) 
// //     setIsLoading(true)

// // if ( ) {
// //   // setUsers((prev) => [...new Set([...prev, ...data?.Users?.edges])]);
// //    setUsers(data?.Users?.edges) 
// //    setIsLoading(false)
    
// // }
// // if (data?.Users?.pageInfo?.endCursor ) {
// //    setAfter(data?.Users?.pageInfo?.endCursor)
// // }
// // if (error) {
// //     setErrors(error);
// //     setIsLoading(false)
// // }

// // return () => {
// //     setIsLoading(false)
// //     setErrors(false)
// //     setTrigger(false)
// // };
// // }, [data, loading,  error]);

 
// //fetchMore({
            
//     //     variables: {
//     //     after: aff,
//     //     hasNextPage: data?.Users?.pageInfo.hasNextPage || false,
//     //     first: data?.Users?.pageInfo?.first || false
//     //     },
//     //     updateQuery: (prevResult, { fetchMoreResult }) => {
//     //     const prevEdges = prevResult?.Users?.edges ?? [];
//     //     const newEdges = fetchMoreResult?.Users?.edges ?? [];
//     //     var newCusor = fetchMoreResult?.Users?.pageInfo.endCursor;
//     //     const first = fetchMoreResult?.Users?.pageInfo.first
//     //     const newHasNextPage = fetchMoreResult?.Users?.pageInfo.hasNextPage;
//     //     //setUsers((prev) => [...new Set([...prev, ...newEdges])]);
//     //     return newEdges.length
//     //         ? {
//     //             Users: {
//     //             __typename: prevResult.Users.__typename,
//     //             edges: [...new Set([...prevEdges, ...newEdges])],
//     //             pageInfo: {
//     //                 endCursor: newCusor,
//     //                 hasNextPage: newHasNextPage,
//     //                 first: first,
//     //                 __typename: prevResult?.Users?.pageInfo?.__typename 
//     //             },
//     //             },
//     //         }
//     //         : prevResult;
//     //     },


