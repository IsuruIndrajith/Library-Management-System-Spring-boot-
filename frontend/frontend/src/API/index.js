import axios from "axios";
import AuthService from '../services/AuthService';

// Create axios instance with interceptors
const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1'
});

// Add request interceptor to include JWT token
api.interceptors.request.use(
  (config) => {
    const token = AuthService.getCurrentUser()?.token;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      AuthService.logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Books Page
export const getBooks = async () => {
  console.log('🔍 Calling getBooks API...');
  try {
    const res = await api.get("/books/getAllBooks");
    console.log('✅ getBooks API response:', res.data);
    return res.data; // This is the full ResponseDTO
  } catch (error) {
    console.error('❌ getBooks API error:', error.response?.data || error.message);
    throw error;
  }
};
  


// Books API
export const addBook = (book) => api.post('/books/saveBooks', book);

export const updateBook = (book) => api.put('/books/updateBooks', book);

export const deleteBook = (bookID) => api.delete(`/books/deleteBooks/${bookID}`);

export const searchBook = (bookID) => api.get(`/books/searchBooks/${bookID}`);

export const getAllBooks = () => api.get('/books/getAllBooks');

// Members API
export const getAllMembers = () => api.get('/members/getAllMembers');

export const getMemberById = (id) => api.get(`/members/GetMembersByID/${id}`);

export const addMember = (member) => api.post('/members/add', member);

export const updateMember = (id, member) => api.put(`/members/update/${id}`, member);

export const deleteMember = (id) => api.delete(`/members/delete/${id}`);
