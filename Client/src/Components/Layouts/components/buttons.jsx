import { Fab } from "@mui/material"
import { styled } from "@mui/material/styles";
import { ArrowBack } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { searchIn } from "../../../utills/store";
export const Back = (props)=>{
    const {path} = props
    const setsearching = useSetRecoilState(searchIn)
    const Navi = useNavigate()
    const {pathname} = useLocation()
    const handleBack = ()=>{
        if (pathname === '/search')
        setsearching(false)
        Navi(path)
    }

    const StyledFab = styled(Fab)({
        position: "fixed",
    
        bottom: '5%',
        left: "70%",
        right: 0,
        margin: "0 auto",
        color: "#3b82f",
        mini: "true",
      });
    
return (
    <StyledFab size="large" color="primary" onClick={handleBack}> 
      
              <ArrowBack sx={{ color: "#fff" }} />
            </StyledFab>
)
}