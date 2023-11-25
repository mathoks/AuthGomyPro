import { useRecoilState, useSetRecoilState,} from "recoil";
import { dashDraw } from "../utills/store";


export const useDashDraw = ()=>{
    const [isOpen, setisOpen] = useRecoilState(dashDraw)
    const SetNav= useSetRecoilState(dashDraw)
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