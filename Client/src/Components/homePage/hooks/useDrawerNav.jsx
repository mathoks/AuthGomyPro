import { useRecoilState, useSetRecoilState,} from "recoil";
import { drawerNav } from "../../../utills/store";


export const useNavDraw = ()=>{
    const [isOpen, setisOpen] = useRecoilState(drawerNav)
    const SetNav= useSetRecoilState(drawerNav)
    const handleOpen = ()=>{
        setisOpen(true)
    }
    const handleClose = ()=>{

        SetNav(false)
    }

    return {
        isOpen, handleClose, handleOpen, 
    }
}