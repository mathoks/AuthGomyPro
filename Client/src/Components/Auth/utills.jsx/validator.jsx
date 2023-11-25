import { parsePhoneNumber } from "react-phone-number-input";
import { get } from "lodash";

// ******************************
export const validator = (values, fieldName) => {
  let errors = {};
  switch (fieldName) {
    case "firstname":
      validateFirstName(values.firstname, errors)
      break;
      case "lastname": 
      validateLastName(values.lastname, errors)
      break;
    case "email":
      validateEmail(values.email, errors);
      break;
    case "password":
      validatePassword(values.password, errors);
      break;
    case "phone":
      validatePhoneNumber(values.phone, errors);
      break;
     case "username":
      validateUserName(values.username, errors);
      break;
    default:
  }
  return errors;
};

// ******************************
export function getCountryCode(phoneNumber) {
  return get(parsePhoneNumber(phoneNumber), "country");
}

// ******************************
function validatePhoneNumber(phone, errors) {
  let result = true;
  const phoneObject = parsePhoneNumber(phone);
  if (!phoneObject) {
    errors.phone = "Invalid Phonenumber";
    result = false;
  }
  return result;
}
// ******************************
function validateEmail(email, errors) {
  let result = true;

  if (!email) {
    errors.email = "Email is Required";
    result = false;
  } else {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    result = re.test(String(email).toLowerCase());
    if (!result) errors.email = "Invalid Email address";
  }
  return result;
}
// ******************************
function validateUserName(username, errors) {
  let result = true;

  if (!username) {
    errors.username = "Username is Required";
    result = false;
  } 
	else if (username.length > 10)
	{
          errors.username = " you exceeded max 10 character"
          result = false;
	}

 else {
    const re = /^([a-zA-Z\-0-9])+$/;
    result = re.test(String(username).toLowerCase());
    if (!result) errors.username = "Invalid username format";
  }
  return result;
}

function validateFirstName(firstname, errors) {
  let result = true;

  if (!firstname) {
    errors.firstname = "Firstname is Required";
    result = false;
  } 
	else if (firstname.length > 15)
	{
          errors.firstname = " you exceeded max 10 character"
          result = false;
	}

 else {
    const re = /^([a-zA-Z\-0-9])+$/;
    result = re.test(String(firstname).toLowerCase());
    if (!result) errors.firstname = "Invalid firstname format";
  }
  return result;
}

function validateLastName(lastname, errors) {
  let result = true;

  if (!lastname) {
    errors.lastname = "Lastname is Required";
    result = false;
  } 
	else if (lastname.length > 15)
	{
          errors.lastname = " you exceeded max 10 character"
          result = false;
	}

 else {
    const re = /^([a-zA-Z\-0-9])+$/;
    result = re.test(String(lastname).toLowerCase());
    if (!result) errors.lastname = "Invalid firstname format";
  }
  return result;
}

function validatePassword(pass, errors) {
  let result = true;

  if (!pass) {
    errors.password = "Password is Required";
    result = false;
  } else {
    var lower = /(?=.*[a-z])/;
    result = lower.test(pass);

    if (!result) {
      errors.password = "Password must contain at least one lower case letter.";
      result = false;
    } else if (pass.length < 8) {
      errors.password = "Your password has less than 8 characters.";
      result = false;
    }
  }

  return result;
}