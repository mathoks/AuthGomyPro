import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import React from "react";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { validator } from "../utills.jsx/validator";
import useForm from "../utills.jsx/useForm";
import { useSignUser } from "../hooks/useSignin";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { refreshed, userData, userMessage, userNew } from "../../../utills/store";
import { useRef } from "react";
import { useGetuser } from "../hooks/usegetDetails";
import { useDashDraw } from "../../../hooks/useDasNav";
import { Checkbox } from "@mui/material";
import { blue } from "@mui/material/colors";
import { FormControlLabel } from "@mui/material";
import { LoginTwoTone } from "@mui/icons-material";

export default function Signin() {
  const Navi = useNavigate();
  const [values, setValues] = useState({ showpass: false });
  const [stata, setstata] = useState({});
  const reset = useResetRecoilState(userMessage);
  const [mess, setmess] = useState(false);
  
  const setuserData = useSetRecoilState(userData);
  const [checked, setchecked] = React.useState(true);
  const { handleOpen } = useDashDraw();
  const [dam, setdam] = useState(false)
  const [init, setinit] = useState({})
  // const setmessage = useSetRecoilState(userMessage)
  // const isSuccess = useRecoilValue(userSuccess);

  document.onload= ()=>setdam(true)
  var initState = {
    password: "",
    username: "",
  };

  

  const handleCheck = (event) => {
    console.log(event.target.checked);
    setchecked(event.target.checked);

  };

  

  

  const { submit, IsSuccess, message } = useSignUser(stata, mess);

  const { getDetails, data: user, error } = useGetuser();
  



  useEffect(() => {
    if (IsSuccess) {
      
     getDetails();
         if(user){
          console.log("hhhh")
           setuserData(user)
    setTimeout(() => {
        Navi("/settings/Dashboard");
        handleOpen();
      }, 1000);
     
    }
    }
    if(error){
       Navi("/home");
    }
    }, [IsSuccess, user, error,]);


  // useEffect(() => {
  //   if (error?.message === "you are unathorized") {
  //     Navi("/Signin");
  //   }
  // }, [error, IsSuccess]);

  //const Submit = useCallback(()=> { return submit},[stata])
  const { handleChange, handleSubmit, handleBlur, state, errors, isSubmited} = useForm({
    initState,
    callback: reset,
    validator,
    checked
  });

  
  
//  window.onload =(e)=>{
    
//     const Form = document.querySelectorAll(".form");
//     console.log(Form)
//   Form.forEach((_, i) => {
//     Form[i].addEventListener('focus' ,()=>{
//       if (e.target.value && e.target.name === 'username') {
//         initState.username = e.target.value;
//         setinit(init.username = e.target.value)
//         console.log(init)
//         Object.assign(stata, initState.username)
//         handleChange()
//         handleBlur()
 
//       } if( e.target.value && e.target.name === 'password'){
//         initState.password = e.target.value;
//         setinit(init.password = e.target.value)
//         Object.assign(stata, initState.password)
//        handleChange()
//         handleBlur()
//       }
//     }
//     );
//      })
//   }
  
  

  console.log(message);
  useEffect(() => {
    if (state) setstata(state);
  }, [state]);

  // useEffect(()=>{
  //   const handleClick = e =>{
  //     setmess(true)
  //   }
  //   const gh = ref.current
  //   gh.addEventListener('click', handleClick);
  //   return ()=>{

  //     gh.removeEventListener('click', handleClick)

  //   }
  // },[submit])

 

  useEffect(() => {
    setmess(true);
    return () => setmess(false);
  }, [submit]);

  

  let isValidForm =
    Object.values(errors).filter((error) => typeof error !== "undefined")
      .length === 0;

  const errorMessage = () => {
    if (isSubmited && mess)
      return (
        <Typography sx={{ textAlign: "center", pb: "15px", color: "red" }}>
          {message}
        </Typography>
      );
  };

  const successMessage = () => {
    if (message && IsSuccess)
      return (
        <Typography sx={{ textAlign: "center", pb: "15px" }}>
          {message}
        </Typography>
      );
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showpass: !values.showpass });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  //submition//

  // Showing success message

  // Showing error message if error is true

  const inFo = <Stack spacing={2} width="70%" sx={{ ml: "15%", pt: "12px" }}>
  <Box>
  <Typography sx={{color: "Gray"}}>
    Forgot password?{"   "}
    <NavLink
        to={"/get-started/signup"}
        style={{ textDecoration: "none" }}
        children="Reset password"
      />
  </Typography>
    <Typography sx={{color: "Gray"}}>
      Not a member?{"   "}
      <NavLink
        to={"/get-started/signup"}
        style={{ textDecoration: "none" }}
        children="Signup now"
      />{" "}
      or
    </Typography>
    <Typography sx={{color: "Gray"}}>
      continue as{" "}
      <Link
        to="/home"
        replace
        children="guest"
        style={{ textDecoration: "none" }}
        
      />
    </Typography>
  </Box>
</Stack>

  return (
    <>
    
    <Box
      sx={{
        mt: "20%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Box sx={{display:"flex", padding:"30px", justifyContent: "center", alignItems:"center", flexDirection: "column"}}>
      <Box>
      <LoginTwoTone color="primary" />
      </Box>
      <Box>
      <Typography
          variant="h5"
        >
          Login <br />
      </Typography>
      </Box>  
    </Box>
    
      <form onSubmit= {handleSubmit}>
       

        {/* Calling to the methods */}

        <Box sx={{ textAlign: "center" }}>
          {errorMessage()}

          {successMessage()}
        </Box>

        <Stack spacing={2} width="70%" sx={{ ml: "15%" }}>
          <TextField
            autoFocus
            className="form"
            id="username"
            autoComplete="username"
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
           // onFocus={handleBlur}
            onKeyDown={handleBlur}
            defaultValue={state['username']}
            name="username"
            error={errors.username ? true : false}
            helperText={errors.username}
            label="Username"
            size="small"
            variant="outlined"
            InputLabelProps={{ sx: { ml: 0.05 } }}
          />

          <TextField
            label="Password"
            size="small"
            width="4px"
            key="password-note"
            name="password"
            onKeyDown={handleBlur}
            className="form"
            hidden
            autoComplete="current-password"
            id="outlined-basic-password"
            type={values.showpass ? "text" : "password"}
            //fullWidth
            required
            defaultValue={state.password }
            error={errors.password ? true : false}
            helperText={errors.password}
            onBlur={handleBlur}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showpass ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>
        <Stack spacing={2} width="70%" sx={{ ml: "15%", pt: "12px" }}>
          {/* <Box display={"flex"} alignItems={"center"} >*/}
          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                sx={{
                  color: blue[800],
                  "&.Mui-checked": {
                    color: blue[800],
                  },
                }}
                onChange={handleCheck}
                InputProps={{ "aria-label": "controlled" }}
              />
            }
            label="Remember me"
          />

          <Button
            disabled={!isValidForm}
            //className="btn"
            type="submit"
            variant="contained"
            color="primary"
            onClick={submit}
            children="Login"
          />
          
        </Stack>
       
      </form>
      {inFo}
    </Box>
    
      </>
  );
}

//Signin.propTypes = {
// setToken: PropTypes.func.isRequired
//}
