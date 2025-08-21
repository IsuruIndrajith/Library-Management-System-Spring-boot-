export const getRecentlyAddedBooks = () => { 
   return fetch('https://dummyjson.com/products')
      .then(res => res.json());
}
