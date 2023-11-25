import { UsersLiist } from "../Components/homePage/Loaders/getUsers"
import { ScrollRestoration } from "react-router-dom";

export const Homepage = () => {

    return <>
        <UsersLiist/>
        {/* <ScrollRestoration
        getKey={(location, matches) => {
          const paths = ["/home", '/user'];
          return paths.includes(location.pathname)
            ? location.pathname
            : location.key;
        }} 
      /> */}
        
    </>
}
export default Homepage