import axios from "axios";


export const getRecentlyAddedBooks = () => { 
   return fetch('https://dummyjson.com/products')
      .then(res => res.json());
}

export const getNewlyAddedBooks = () => {
   return fetch('https://dummyjson.com/carts')
      .then(res => res.json());
}

// Books Page
export const getBooks = async () => {
  const res = await axios.get("http://localhost:8080/api/v1/books/getAllBooks");
  return res.data; // This is the full ResponseDTO
};
  
             
