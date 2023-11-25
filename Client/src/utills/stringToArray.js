// import { getParams } from "./getParams"


// export const stringArray = ()=>{
// var strings = (getParams('q'))
// var stringsArray = strings?.split(" ")

// console.log(stringsArray)

// return stringsArray
// }

import { Diction } from "../Components/Search/helpers/Dictionary";
import { getParams } from "./getParams";

export const stringArray = () => {
  const queryString = getParams('q');
  const stringsArray = queryString ? queryString.split(" ") : [];
  const filteredArray = stringsArray.filter((item) =>  !Diction.includes(item));
  console.log(stringsArray, filteredArray);
  
  return filteredArray;
};
