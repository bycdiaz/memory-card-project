export const pokemonList = [
  'charmander',
  'charmeleon',
  'charizard',
  'bulbasaur',
  'ivysaur',
  'venusaur',
  'squirtle',
  'wartortle',
  'blastoise',
  'haunter',
  'scyther',
  'arcanine'
] as const;

export type Pokemon = typeof pokemonList[number];
