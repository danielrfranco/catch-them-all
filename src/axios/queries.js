export const POKEMON_BASE_URL = '/pokemon';

export const GET_A_POKEMON = (pokemonString = '') =>
  `${POKEMON_BASE_URL}/${pokemonString}`;
