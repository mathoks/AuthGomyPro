export const urlParams = (key, value)=>{
    const searchParams = new URLSearchParams(window.location.search)
    searchParams.set(key, value)
    const newPathe = window.location.pathname + "?" + searchParams.toString()
    window.history.pushState(null, "", newPathe)
}

export const urlParamsPage = (key, value)=>{
  const searchParams = new URLSearchParams(window.location.search)
  searchParams.set(key, value)
  const newPathe = window.location.pathname + "?" + searchParams.toString()
  window.history.pushState(null, "", newPathe)
} 

export const removeParams = (value) => {
  const searchParams = new URLSearchParams(window.location.search);
  const url = window.location.search;
  let newsrr = url.split("?q=").join("");
  const nnhn = newsrr.split("+");
  console.log(nnhn);
  var direct = new RegExp(value, "g");
  console.log(
    window.location.pathname + "?" + searchParams.toString().replace(direct, "")
  );

  const newPathe =
    window.location.pathname +
    "?" +
    searchParams.toString().replace(direct, "");
  window.history.pushState(null, "", newPathe);
}; 


// export const removeParams = (key, value)=>{
//     const searchParams = new URLSearchParams(window.location.search)
//     searchParams.delete(key)
//     const newPathe = window.location.pathname + "?" + searchParams.toString()
//     window.history.pushState(null, "", newPathe)
// } 