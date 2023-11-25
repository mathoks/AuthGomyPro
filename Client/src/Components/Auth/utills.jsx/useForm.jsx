import { useState, useEffect } from "react";
import { getCountryCode } from "./validator";
import { useSetRecoilState } from "recoil";
import { userMessage } from "../../../utills/store";

// ******************************
const useForm = ({ initState, callback, validator, checked }) => {
  const [state, setState] = useState(initState);
  const [errors, setErrors] = useState({});
  const [isSubmited, setIsSubmited] = useState(false);
  const [countryCode, setCountryCode] = useState("");
  const setmessage = useSetRecoilState(userMessage);

  // ******************************
  const isValidErrors = () =>
    Object.values(errors).filter((error) => typeof error !== "undefined")
      .length > 0;
  useEffect(() => {
    isValidErrors();
    return ()=>{ if (isSubmited && !isValidErrors() && handleSubmit)callback()}
  }, [errors]);

  const user = sessionStorage.getItem("user");
  const pass = sessionStorage.getItem("pass");

  useEffect(() => {
    if (user && pass) {
      return setState({ ...state, username: user, password: pass });
    }
    if(!checked){
     return  sessionStorage.removeItem('pass')
    }
    return;
  }, [user, pass, checked]);

  // ******************************
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState(() => ({
      ...state,
      [name]: value,
    }));
    if (checked && name === "username") {
      sessionStorage.setItem("user",  value);
    }
    if (checked && name === "password") {
      sessionStorage.setItem("pass", value);
    }
    
    if (name === "phone") {
      const country = getCountryCode(value);
      setCountryCode(() => country);
    }
  };

  // ******************************
  const handleBlur = (e) => {
    const { name: fieldName } = e.target;
    const faildFiels = validator(state, fieldName);

    setErrors(() => ({
      ...errors,
      [fieldName]: Object.values(faildFiels)[0],
    }));
  };

  // ******************************
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name: fieldName } = e.target;
    const faildFiels = validator(state, fieldName);
    setErrors(() => ({
      ...errors,
      [fieldName]: Object.values(faildFiels)[0],
    }));
    setIsSubmited(true);
  };

  return {
    handleChange,
    handleSubmit,
    handleBlur,
    state,
    errors,
    countryCode,
    isSubmited,
  };
};

export default useForm;
