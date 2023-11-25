import { useRecoilState, useSetRecoilState} from "recoil";
import { photMod } from "../utills/store";


export const usePhotoModal = ()=>{
    const [isOpen, setisOpen] = useRecoilState(photMod)
    const SetNav= useSetRecoilState(photMod)
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