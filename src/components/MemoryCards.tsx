import { useEffect, useState } from "react";
import { pokemonList } from "../types";

function MemoryCards() {
  const [pokemonData, setPokemonData] = useState<{ name: string, spriteUrl: string }[]>([]);

  useEffect(() => {
    getPokemon();
  }, [])

  return (
    <div>
      {pokemonData.map(pokemon => {
        return (
          <div
            key={pokemon.name}
            onClick={_event => {
              console.log(`Clicked on ${pokemon.name}`)
            }}
          >
            <img src={`${pokemon.spriteUrl}`} alt={`Icon of pokemon: ${pokemon.name}`} />
            <div className="pokemon-name">{pokemon.name}</div>
          </div>
        )
      })}
    </div>
  );

  async function getPokemon() {
    Promise.all(pokemonList.map(pokemon =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`)
    ))
      .then(async promiseResult => {
        const requestData = [];
        for (const pokemonPromise of promiseResult) {
          const data = await pokemonPromise.json();
          requestData.push({
            name: data.name,
            spriteUrl: data.sprites.front_default
          })
        }
        setPokemonData(requestData);
      }).catch(error => {
        console.log(error);
      })
  }
}

export default MemoryCards
