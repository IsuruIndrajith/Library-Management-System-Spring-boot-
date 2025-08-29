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


const BASE_URL_Member = "http://localhost:8080/api/v1/members";
export const getAllMembers = () => axios.get(`${BASE_URL_Member}/getAllMembers`);

export const getMemberById = (id) => axios.get(`${BASE_URL_Member}/GetMembersByID/${id}`);

export const addMember = (member) => axios.post(`${BASE_URL_Member}/add`, member);

export const updateMember = (id, member) =>
  axios.put(`${BASE_URL_Member}/update/${id}`, member);

export const deleteMember = (id) =>
  axios.delete(`${BASE_URL_Member}/delete/${id}`);