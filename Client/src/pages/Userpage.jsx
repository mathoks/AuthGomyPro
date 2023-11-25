import { Back } from "../Components/Layouts/components/buttons"
import UsersDrawer2 from "../Components/UserPage/components/UserDrawer"


export const Userpage = () => {

    return <>
        <UsersDrawer2/>
        <Back path={-1}/>
    </>
}
export default Userpage