
import { searchAvatar } from "../../../utills/srtingTocol";
// export const memoized1 = (arr = [], fn)=>{
    
// const cache = new Map();


// const key = arr.map((chip, id)=>{

// const keys = JSON.stringify(id)
// if (cache.has(keys))
// return cache.get(key)

// const result = fn(chip)
// cache.set(keys, result)
// //Object.assign(bg, result)
// return result
// })

// return key.map((chip)=> chip)

// }

export const memoized1 = (arr = []) => {
    const cache = new Map();
  
    return arr.map((chip) => {
      const cacheKey = JSON.stringify(chip); // Use the entire chip object as the cache key
      if (cache.has(cacheKey)) {
        return cache.get(cacheKey);
      }
  
      const result = searchAvatar(chip);
      cache.set(cacheKey, result);
      return result;
    });
  };
  
//   const momoize = (chipData = [], searchAvatar) => {
//     var res;
//     const memo = {};
//     const momoized = (id) => {
//       if (memo[id]) {
//         return memo[id];
//       }
//       const result = searchAvatar(chipData[id]);
//       memo[id] = result;
//       console.log(result);
//       res = result;
//       return result;
//     };
//     return chipData.map((_, id) => momoized(id));
//   };

//   console.log(memoized1(chipInfo,searchAvatar));