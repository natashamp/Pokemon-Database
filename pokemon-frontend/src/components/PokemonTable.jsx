import React, { useEffect, useState } from 'react';

function PokemonTable() {
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the backend API
    fetch('http://localhost:3001/pokemon')
      .then((response) => response.json())
      .then((data) => {
        setPokemonData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching Pokémon data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <table border="1">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Type</th>
          <th>Level</th>
        </tr>
      </thead>
      <tbody>
        {pokemonData.map((pokemon) => (
          <tr key={pokemon.id}>
            <td>{pokemon.id}</td>
            <td>{pokemon.name}</td>
            <td>{pokemon.type}</td>
            <td>{pokemon.level}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default PokemonTable;