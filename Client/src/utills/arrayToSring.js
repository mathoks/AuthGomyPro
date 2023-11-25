import { Diction } from "../Components/Search/helpers/Dictionary";
import { getParams } from "./getParams";

export const arrayToArray = (queryString) => {
    //const queryString = getParams('q');
    const wordsArray = queryString ? queryString.split(" ") : [];
    const filteredArray = wordsArray.filter((item) => !Diction.includes(item));
    console.log(filteredArray)
   const newString = filteredArray.toString().replace(/,/g, " ");
    console.log(newString)
    return newString;
  };
  
