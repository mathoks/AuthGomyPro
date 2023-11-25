import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PhoneNumber from "../utills.jsx/phonenumber";
import {
  TextField,
  Paper,
  Button,
  Container,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import { validator } from "../utills.jsx/validator";
import useForm from "../utills.jsx/useForm";
import { useCreatUser } from "../hooks/useCreatUser";
import { States, CategorY } from "../utills.jsx/States";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { userSuccess } from "../../../utills/store";
import { userMessage } from "../../../utills/store";

export default function Form() {
  const [stata, setstata] = React.useState("");
  const [city, setcity] = React.useState("");
  const [cities, setcities] = React.useState([]);
  const [cat, setcat] = useState("");
  const [state1, setstate1] = useState({});
  const isSuccess = useRecoilValue(userSuccess);
  const reset = useResetRecoilState(userMessage);

  const initState = {
    email: "",
    password: "",
    phone: "",
    firstname: "",
    lastname: "",
    username: "",
  };

  const { submit, message, isError, data } = useCreatUser(
    state1,
    cat,
    city.replace(/[' ']/g, "_")
  );

  const { handleChange, handleSubmit, handleBlur, state, errors, countryCode } =
    useForm({
      initState,
      callback: reset,
      validator,
    });
  const handleCat = useCallback(
    (event) => {
      setcat(event.target.value);
    },
    [cat]
  );

  const handleChanges = useCallback(
    (event) => {
      setstata(event.target.value);
    },
    [stata]
  );

  useEffect(() => {
    if (state) setstate1(state);
  }, [state]);

  useEffect(() => {
    setstata(stata);
    setcities(Object.values(States).find((_, idx) => idx === stata));
  }, [handleChanges, stata]);

  const handleChangess = (event) => {
    setcity(event.target.value);
  };

  const nav = useNavigate();

  let isValidForm =
    Object.values(errors).filter((error) => typeof error !== "undefined")
      .length === 0;

  useEffect(() => {
    if (isSuccess && data) {
      alert(message);
      nav("/get-started/Signin");
    
    }
    if (isError) console.log(isError);
  }, [isSuccess, isError, data]);

  // Showing success message

  const successMessage = () => {
    return (
      <span
        className="success"
        style={{
          textAlign: "center",

          display: isSuccess ? "" : "none",
        }}
      >
        {message}
      </span>
    );
  };

  // Showing error message if error is true

  const errorMessage = () => {
    return (
      <span
        className="error"
        style={{
          color: "red",
          textAlign: "center",

          display: message ? " " : "none",
        }}
      >
        {message}
      </span>
    );
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          fontSize: "24px",
          alignItems: "center"
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: "20px",
            flexDirection: "column",
            fontSize: "24px",
            textAlign: "center"
          }}
        >
          <Typography component={"h2"} color={"grey"}>
            Join milions of users own a space
            in our platform for building  your proffesional network
          </Typography>
          <Typography variant=" h5" sx={{ textAlign: "center" , pt: "10px"}}>
                New User Registration
              </Typography>
        </Box>
        <Container maxWidth="xs" sx={{ mt: "30px", minHeight: "70vh", display: "flex", flexDirection: "column",justifyContent: "center", alignItems: "center"}}>

              

              {/* Calling to the methods */}
              
              <Typography sx={{ pb: "12px", pl: "40px", fontColour: "red" }}>
                {errorMessage()}

                {successMessage()}
              </Typography>

              <form onSubmit={handleSubmit}>
              <Paper elevation={2} sx={{padding: '50px'}}>
                <Stack spacing={2} width="100%" position={"center"}>
                  {/*FIRSTNAME*/}
                  <TextField
                    required
                    autoFocus
                    label="Firstname"
                    name="firstname"
                    type="text"
                    className="signup"
                    defaultValue={state.firstname}
                    onChange={handleChange}
                    error={errors?.firstname ? true : false}
                    helperText={errors.firstname}
                    onBlur={handleBlur}
                    onKeyDown={handleBlur}
                    onFocus={handleBlur}
                    
                  />

                  {/*LASTNAME*/}
                  <TextField
                    required
                    label="Lastname"
                    name="lastname"
                    type="text"
                    className="signup"
                    defaultValue={state.lastname}
                    onChange={handleChange}
                    onKeyDown={handleBlur}
                    onFocus={handleBlur}
                    error={errors?.lastname ? true : false}
                    helperText={errors.lastname}
                    onBlur={handleBlur}
                  />

                  {/*USERNAME*/}
                  <TextField
                    required
                    label="Username"
                    name="username"
                    type="text"
                    className="signup"
                    defaultValue={state.username}
                    onChange={handleChange}
                    onKeyDown={handleBlur}
                    onFocus={handleBlur}
                    error={errors?.username ? true : false}
                    helperText={errors.username}
                    onBlur={handleBlur}
            
                  />
                  <FormControl >
                    <InputLabel className="signup">State</InputLabel>

                    <Select
                      labelId="demo-simple-select-error-label"
                      id="demo-simple-select-error"
                      value={stata}
                      label="State"
                      onChange={handleChanges}
                      //renderValue={(value) => `⚠️  - ${value}`}
                    >
                      {Object.keys(States).map((sta, idx) => (
                        <MenuItem value={idx} children={sta} key={idx} />
                      ))}
                    </Select>
                    <FormHelperText>{errors?.location}</FormHelperText>
                  </FormControl>

                  <FormControl >
                    <InputLabel className="signup">City</InputLabel>

                    <Select
                      labelId="demo-simple-select-error-label"
                      id="demo-simple-select-error"
                      value={city}
                      label="City"
                      placeholder="choose  a city"
                      onChange={handleChangess}
                      //renderValue={(value) => `⚠️  - ${value}`}
                    >
                      {cities?.map((sta, idx) => (
                        <MenuItem value={sta} children={sta} key={idx} />
                      ))}
                    </Select>
                    <FormHelperText>{errors?.location}</FormHelperText>
                  </FormControl>

                  <FormControl >
                    <InputLabel className="signup">Category</InputLabel>

                    <Select
                      labelId="demo-simple-select-error-label"
                      id="demo-simple-select-error"
                      value={cat}
                      label="Category"
                      onChange={handleCat}
                      placeholder="select a category"
                    >
                      {CategorY.map((sta, idx) => (
                        <MenuItem value={sta} children={sta} key={idx} />
                      ))}
                    </Select>
                    <FormHelperText>{errors?.location}</FormHelperText>
                  </FormControl>

                  {/* EMAIL */}
                  <TextField
                    required
                    label="Email"
                    name="email"
                    className="signup"
                    defaultValue={state.email}
                    onChange={handleChange}
                    onKeyDown={handleBlur}
                    error={errors?.email ? true : false}
                    helperText={errors?.email}
                    onBlur={handleBlur}
                  />

                  {/* PASSWORD */}
                  <TextField
                    required
                    label="Password"
                    name="password"
                    type="password"
                    className="signup"
                    autoComplete={state.password}
                    defaultValue={state.password}
                    onChange={handleChange}
                    onKeyDown={handleBlur}
                    error={errors.password ? true : false}
                    helperText={errors.password}
                    onBlur={handleBlur}
                    onFocus={handleBlur}
                  />
                
                {/* PHONENUMBER */}
                  <PhoneNumber
                    errors={errors}
                    state={state}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    onKeyDown={handleBlur}
                    onFocus={handleBlur}
                    countryCode={countryCode}
                  />
              
                  <Button
                    disabled={!isValidForm}
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={submit}
                    children = "Next"
                  />
                
                </Stack>
                </Paper>
              </form>
          
        </Container>
      </Box>
    </>
  );
}
