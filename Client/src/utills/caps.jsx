const  myUpper = (string)=> {
    const app = string;
    const arr = app.split(" ")
    for (var i =0; i < arr.length; i++){
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);}
    const myU = arr.join(" ");
    return myU
}
export default myUpper