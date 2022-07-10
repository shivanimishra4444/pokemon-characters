import { getParamsFromURI } from '@/helper/helper';
import { client } from './environment';

export const rootUrl = 'https://pokeapi.co/api/v2/pokemon';


export const getPokemon = function (limit: number, offset: number): Promise<any> {
  localStorage.setItem('offset', offset.toString())
  localStorage.setItem('limit', limit.toString())
  return client(`${rootUrl}?limit=${limit}&offset=${offset}`, 'GET');
};
export const getPokemonPagination = function (url: string): Promise<any> {
  const params = getParamsFromURI(url)
  localStorage.setItem('offset', params.get('offset'))
  localStorage.setItem('limit', params.get('limit'))
  return client(url, 'GET');
};

export const getPokemonDetails = function (url: string): Promise<any> {
  return client(url, 'GET');
};

export const getPokemonDetailsByName = function (name: string): Promise<any> {
  return client(`${rootUrl}/${name}`, 'GET');
};


