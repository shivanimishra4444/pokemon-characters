import { client } from './environment';

export const rootUrl = 'https://pokeapi.co/api/v2/pokemon';


export const getPokemon = function (limit, offset): Promise<any> {
  return client(`${rootUrl}?limit=${limit}?offset=${offset}`, 'GET');
};
export const getPokemonPagination = function (url): Promise<any> {
  return client(url, 'GET');
};

export const getPokemonDetails = function (url): Promise<any> {
  return client(url, 'GET');
};


