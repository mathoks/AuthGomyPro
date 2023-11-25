import { flatten } from "flat";

const filter = (data, searchText) => {
  var NewList = [];

  data?.map((element) => {
    const {
      about,
      idx,
      lastname,
      firstname,
      user_id,
      createdat,
      city_id,
      ...rest
    } = flatten(element);
    const newString = Object.values(rest).toString().replace(/[',']/g, " ");
    const newOb = Object.defineProperty(element, "searchField", {
      value: newString,
      writable: true,
      configurable: true,
    });
    return NewList.push(newOb);
  });
  console.log(NewList)
  const words = searchText.split(" ");
  return NewList.filter((list) =>
    words.every((word) => list.searchField.includes(word))
  ).sort((a, b) => a.createdat - b.createdat);
};

export default filter;
