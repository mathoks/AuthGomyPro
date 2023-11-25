
export const memoized2= (arr = []) => {
    const cache = new Map();
    
    return arr.edges.map((chip) =>  {
      const cacheKey = JSON.stringify(chip.cursor); // Use the entire chip object as the cache key
      if (cache.has(cacheKey)) {
        return cache.get(cacheKey);
      }
      
      cache.set(cacheKey, chip.node);
      
      return chip.node
    });
    
  };
  
