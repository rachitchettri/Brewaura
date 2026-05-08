import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
});

export const recipeService = {
  getAll: (cups) => api.get('/recipes', { params: cups ? { cups } : {} }).then((res) => res.data),
  getById: (id) => api.get(`/recipes/${id}`).then((res) => res.data),
  create: (recipe) => api.post('/recipes', recipe).then((res) => res.data),
  update: (id, recipe) => api.put(`/recipes/${id}`, recipe).then((res) => res.data),
  remove: (id) => api.delete(`/recipes/${id}`).then((res) => res.data),
};

export default api;
