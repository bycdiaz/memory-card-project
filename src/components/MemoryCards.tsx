import { useEffect, useState } from "react";
import { Pokemon, pokemonList } from "../data";
import { capitalizeName } from "../helpers";
import '../styles/pokemon-list.css';

type Requestdata = { name: Pokemon, spriteUrl: string }[]

function MemoryCards(props: {
  handleCardClick: (pokemonName: Pokemon) => void;
}) {
  const [pokemonData, setPokemonData] = useState<Requestdata>([]);

  useEffect(() => {
    getPokemonData();
  }, [])

  return (
    <div className="pokemon-list">
      {pokemonData.map(pokemon => {
        return (
          <div
            key={pokemon.name}
            onClick={() => {
              props.handleCardClick(pokemon.name);
              shuffleList(pokemonData);
            }}
            className="pokemon"
          >
            <img src={`${pokemon.spriteUrl}`} alt={`Icon of pokemon: ${pokemon.name}`} />
            <div className="pokemon-name">
              {capitalizeName(pokemon.name)}
            </div>
          </div>
        )
      })}
    </div>
  );

  async function getPokemonData() {
    Promise.all(pokemonList.map(pokemon =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`)
    ))
      .then(async promiseResult => {
        const requestData: Requestdata = [];
        for (const pokemonPromise of promiseResult) {
          const data = await pokemonPromise.json();
          requestData.push({
            name: data.name,
            spriteUrl: data.sprites.front_default
          })
        }
        shuffleList(requestData);
      }).catch(error => {
        console.log(error);
      })
  }

  function shuffleList(data: Requestdata) {
    setPokemonData([...data].sort(() => Math.random() - 0.5));
  }
}

export default MemoryCards
