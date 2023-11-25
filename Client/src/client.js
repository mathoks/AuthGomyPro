import { ApolloClient, from, gql } from "@apollo/client";
import { InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { HttpLink, split } from "@apollo/client";
import { createFragmentRegistry } from "@apollo/client/cache";
import {
  relayStylePagination,
  getMainDefinition,
} from "@apollo/client/utilities";
import { GraphQLWsLink, } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { onError } from "@apollo/client/link/error";
import { refresh } from "./Components/Auth/utills.jsx/refresh";
import { retryLike } from "./Components/Auth/utills.jsx/retryLike";
import { retryAdd } from "./Components/Auth/utills.jsx/reAddMessage";

const tokens = sessionStorage.getItem("token");
console.log(tokens)


const getToken = ()=>{
  const tok = sessionStorage.getItem("token")
  if(tok){
    return  tok.replace(/["]+/g, "")
  }
else {
  return  ""
}
}

let restartRequestedBeforeConnected = false;
let gracefullyRestart = () => {
  restartRequestedBeforeConnected = true;
};

const wsLink = new GraphQLWsLink(
  createClient({
    url: "wss://chat-app-go-apc4.onrender.com/subscriptions",
    connectionParams: {
      
      token : getToken()
      
    },
    on: {
      message: (message) => {
        console.log(message)
      },
      connected: (socket) => {
        
        gracefullyRestart = () => {
          console.log(socket.readyState)
          if (socket.readyState === WebSocket.OPEN) {
            socket.close(4205, 'Client Restart');
          }
        };
  
        // just in case you were eager to restart
        if (restartRequestedBeforeConnected) {
          restartRequestedBeforeConnected = false;
          gracefullyRestart();
        }
      },
      error: (err)=>{
        console.log(err)
      },
      
    },
  })
);


const authLink = setContext((_, { headers }) => {
  //const getToken = () => `${sessionStorage.getItem('token').replace(/["]+/g, "")}`
  return {
    headers: {
      ...headers,
      "x-access-token": getToken()//tokens ? sessionStorage.getItem('token').replace(/["]+/g, ""): " ",
    },
  };
});

const refreshToken = onError(({ graphQLErrors, operation }) => {
  if (graphQLErrors[0].message === "unauthorized") {
    console.log("unauthorized")
    return window.location.replace("/get-started/Signin");
  }
  if (graphQLErrors[0].message === "token expired") {
      refresh()
      
  
    if (operation.operationName === "likeUser") {
      const like_id = operation.variables.ids.liked_id;
      console.log("error")
      return setTimeout(() => {
        retryLike({ liked_id: like_id })
      }, 2000); ;
    }

    if (operation.operationName === "addCHAT") {
      const message = operation.variables.info.mess;
      const room_id = operation.variables.info.room_id;
      console.log("error")
      return  retryAdd({ mess: message, room_id }) 
    }
  }
});
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },

  wsLink,
  authLink.setOnError().concat(refreshToken)
);

const link = new HttpLink({
  uri: `https://chat-app-go-apc4.onrender.com`,
  credentials: "include",
});

const cache = new InMemoryCache({
  dataIdFromObject: (object) => object.user_id,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache",
    }
  },

  typePolicies: {
    Query: {
      fields: {
        Users: relayStylePagination(),
      },
    },
  },

  fragments: createFragmentRegistry(gql`
    fragment CoreStudentFields on Student {
      studinfo {
        school
        Department
        levels
        gradYear
        isIT
      }
    }

    fragment CoreArtisanFields on Artisan {
      adderess
      shop
    }

    fragment CoreProffFields on Professional {
      proInfo {
        name
        certification
        competence
        experience
      }
    }

    fragment CoreGraduateFields on Graduate {
      Gradinfo {
        nysc
        school
        jobType
        empStatus
        openJob
        prefJob
        WorkHis {
          company
          roles
          EEnd
          SStart
          ddescription
          createdAt
          updatedAt
        }
      }
    }
  `),
});
console.log(cache);
const client = new ApolloClient({
  //link:authLink.setOnError().concat(link, refreshToken),
  link: from([splitLink, link]),
  cache,
  credentials: "include",
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-and-network",
    },

    query: {
      fetchPolicy: "cache-first",
      errorPolicy: "all",
    },
  },
});

export default client;
