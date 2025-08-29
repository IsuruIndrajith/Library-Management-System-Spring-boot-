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
  


const BASE_URL = "http://localhost:8080/api/v1/books";

export const addBook = (book) => axios.post(`${BASE_URL}/saveBooks`, book);

export const updateBook = (book) => axios.put(`${BASE_URL}/updateBooks`, book);

export const deleteBook = (bookID) => axios.delete(`${BASE_URL}/deleteBooks/${bookID}`);

export const searchBook = (bookID) => axios.get(`${BASE_URL}/searchBooks/${bookID}`);

export const getAllBooks = () => axios.get(`${BASE_URL}/getAllBooks`);

             
