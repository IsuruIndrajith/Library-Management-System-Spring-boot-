export const getRecentlyAddedBooks = () => { 
   return fetch('https://dummyjson.com/products')
      .then(res => res.json());
}

export const getNewlyAddedBooks = () => {
   return fetch('https://dummyjson.com/carts')
      .then(res => res.json());
}
