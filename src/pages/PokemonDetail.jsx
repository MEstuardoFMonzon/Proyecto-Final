import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/main.css";  // Asegúrate de que este archivo de estilo está correcto

function PokemonDetail() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPokemonDetail = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        setPokemon(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error al cargar los detalles del Pokémon.");
        setLoading(false);
      }
    };
    fetchPokemonDetail();
  }, [name]);

  if (loading) return <div className="loading-spinner">Cargando...</div>;  // Puedes agregar un spinner aquí
  if (error) return <p>{error}</p>;

  return (
    <div className="pokemon-detail">
      <button onClick={() => navigate("/")} className="back-button">Volver</button>
      <div className="pokemon-card">
        <div className="pokemon-header">
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
            alt={pokemon.name}
            className="pokemon-image"
          />
          <div className="pokemon-info">
            <h1>{pokemon.name}</h1>
            <p className="pokemon-id">#{pokemon.id}</p>
            <div className="pokemon-types">
              {pokemon.types.map((type) => (
                <span key={type.type.name} className={`type ${type.type.name}`}>
                  {type.type.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="pokemon-details">
          <div className="detail-section">
            <h3>Sobre</h3>
            <p>Especie: {pokemon.species.name}</p>
            <p>Altura: {pokemon.height / 10} m</p>
            <p>Peso: {pokemon.weight / 10} kg</p>
          </div>

          <div className="stats-section">
            <h3>Estadísticas Base</h3>
            <div className="stats">
              {pokemon.stats.map((stat) => {
                // Lógica para asignar la clase 'low', 'medium', 'high'
                let statClass = '';
                if (stat.base_stat < 40) {
                  statClass = 'low'; // Baja
                } else if (stat.base_stat >= 40 && stat.base_stat <= 70) {
                  statClass = 'medium'; // Media
                } else {
                  statClass = 'high'; // Alta
                }

                return (
                  <div key={stat.stat.name} className="stat-item">
                    <p>{stat.stat.name}: <strong>{stat.base_stat}</strong></p>
                    <div className="stat-bar">
                      <div
                        className={`stat-bar-fill ${statClass}`}
                        style={{ width: `${stat.base_stat}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonDetail;
