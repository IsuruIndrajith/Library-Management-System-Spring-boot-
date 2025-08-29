import axios from "axios";


// export const getRecentlyAddedBooks = async () => {
//   const res = await axios.get("http://localhost:8080/api/v1/books/getAllBooks");
//   return res.data; // This is the full ResponseDTO
// };

// export const getNewlyAddedBooks = async () => {
//   const res = await axios.get("http://localhost:8080/api/v1/books/getAllBooks");
//   return res.data; // This is the full ResponseDTO
// };

// Books Page
export const getBooks = async () => {
  const res = await axios.get("http://localhost:8080/api/v1/books/getAllBooks");
  return res.data; // This is the full ResponseDTO
};
  
             
