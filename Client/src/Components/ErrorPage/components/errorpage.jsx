import { useRouteError } from "react-router-dom";

export default function Errorpage(){
    const error = useRouteError();
    console.log(error)

    return (
        <div>
            <h1>Ooops!</h1>
            <p>Sorry page  not found an error as occured</p>
            <p><i>{error?.statusText || error?.message}</i></p>
        </div>
    )
}