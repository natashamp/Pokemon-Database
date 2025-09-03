import axios from 'axios';

const API_URL = 'http://localhost:3001';

export const fetchMagicPokemon = () => {
  return axios.get(`${API_URL}/pokemon-magic`).then(res => res.data);
};
export const fetchAllPokemon = () => {
  return axios.get(`${API_URL}/pokemon`).then(res => res.data);
};
export const fetchPokemonById = (id) => {
  return axios.get(`${API_URL}/pokemon/${id}`).then(res => res.data);
};
export const fetchPokemonByName = (name) => {
  return axios.get(`${API_URL}/pokemon/${name}`).then(res => res.data);
};
export const fetchPokemonByType = (type) => {
  return axios.get(`${API_URL}/pokemon/type/${type}`).then(res => res.data);
};
export const fetchPokemonByAbility = (ability) => {
  return axios.get(`${API_URL}/pokemon/ability/${ability}`).then(res => res.data);
};
export const fetchPokemonByRegion = (region) => {
  return axios.get(`${API_URL}/pokemon/region/${region}`).then(res => res.data);
};  