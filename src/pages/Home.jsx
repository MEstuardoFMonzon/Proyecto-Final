import React, { useState, useEffect } from "react";
import axios from "axios";
import PokemonCard from "../components/PokemonCard";
import "../styles/main.css";

function Home() {
  const [allPokemons, setAllPokemons] = useState([]); // Lista completa de Pokémon
  const [filteredPokemons, setFilteredPokemons] = useState([]); // Pokémon filtrados por búsqueda
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const pokemonsPerPage = 20; // Número de Pokémon por página

  // Obtener todos los Pokémon al inicio
  useEffect(() => {
    const fetchAllPokemons = async () => {
      setLoading(true);
      try {
        // Obtener los primeros 1010 Pokémon
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=1010");
        const detailedPokemons = await Promise.all(
          response.data.results.map(async (pokemon) => {
            const details = await axios.get(pokemon.url); // Obtener detalles del Pokémon
            return {
              name: pokemon.name,
              url: pokemon.url,
              types: details.data.types.map((t) => t.type.name),
              id: details.data.id,
            };
          })
        );
        setAllPokemons(detailedPokemons); // Guardar todos los Pokémon
        setFilteredPokemons(detailedPokemons); // Inicialmente, mostrar todos
      } catch (error) {
        console.error("Error al obtener los Pokémon:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllPokemons();
  }, []);

  // Manejar búsqueda
  useEffect(() => {
    if (search.trim() === "") {
      setFilteredPokemons(allPokemons); // Mostrar todos si no hay búsqueda
    } else {
      const results = allPokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredPokemons(results); // Mostrar resultados de búsqueda
      setCurrentPage(1); // Volver a la página 1 cuando se realice una búsqueda
    }
  }, [search, allPokemons]);

  // Paginación
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = filteredPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(prevPage => prevPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredPokemons.length / pokemonsPerPage)) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  return (
    <div className="home">
      <h2>Página Principal</h2>
      <input
        type="text"
        placeholder="Buscar Pokémon"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />
      <div className="pokemon-container">
        {loading ? (
          <p>Cargando Pokémon...</p>
        ) : currentPokemons.length > 0 ? (
          currentPokemons.map((pokemon, index) => (
            <PokemonCard key={index} pokemon={pokemon} />
          ))
        ) : (
          <p>No se encontraron Pokémon que coincidan con la búsqueda</p>
        )}
      </div>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Anterior
        </button>
        <span>Página {currentPage}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage >= Math.ceil(filteredPokemons.length / pokemonsPerPage)}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default Home;
