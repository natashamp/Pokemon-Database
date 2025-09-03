import React, { useEffect, useState } from 'react';

function BattleStats() {
  const [pokemonData, setPokemonData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // State for filtered Pokémon data
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(''); // State for search term

  useEffect(() => {
    // Fetch data from the backend API
    fetch('http://localhost:3001/pokemon')
      .then((response) => response.json())
      .then((data) => {
        setPokemonData(data);
        setFilteredData(data); // Initialize filtered data with all Pokémon
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching Pokémon data:', error);
        setLoading(false);
      });
  }, []);

  // Handle search input
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = pokemonData.filter((pokemon) =>
      Object.values(pokemon).some((value) =>
        String(value).toLowerCase().includes(term)
      )
    );
    setFilteredData(filtered);
  };

  if (loading) {
    return <p style={styles.loading}>Loading Battle Stats...</p>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Battle Stats</h1>

      {/* Search Input */}
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search Pokémon..."
          value={searchTerm}
          onChange={handleSearch}
          style={styles.searchInput}
        />
      </div>

      <table style={styles.table}>
        <thead>
          <tr style={styles.tableHeader}>
            <th style={styles.tableCell}>ID</th>
            <th style={styles.tableCell}>Name</th>
            <th style={styles.tableCell}>Type</th>
            <th style={styles.tableCell}>Abilities</th>
            <th style={styles.tableCell}>HP</th>
            <th style={styles.tableCell}>Attack</th>
            <th style={styles.tableCell}>Defense</th>
            <th style={styles.tableCell}>Special Attack</th>
            <th style={styles.tableCell}>Special Defense</th>
            <th style={styles.tableCell}>Speed</th>
            <th style={styles.tableCell}>BaseStats</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((pokemon, index) => (
            <tr
              key={pokemon.PokemonID}
              style={
                index % 2 === 0
                  ? styles.tableRowEven
                  : styles.tableRowOdd
              }
            >
              <td style={styles.tableCell}>{pokemon.PokemonID}</td>
              <td style={styles.tableCell}>{pokemon.Name}</td>
              <td style={styles.tableCell}>
                {pokemon.Types
                  ? pokemon.Types.split(',').join(', ')
                  : 'Unknown'}
              </td>
              <td style={styles.tableCell}>
                {pokemon.Abilities
                  ? pokemon.Abilities.split(',').join(', ')
                  : 'Unknown'}
              </td>
              <td style={styles.tableCell}>{pokemon.HP}</td>
              <td style={styles.tableCell}>{pokemon.Attack}</td>
              <td style={styles.tableCell}>{pokemon.Defense}</td>
              <td style={styles.tableCell}>{pokemon.SpAttack}</td>
              <td style={styles.tableCell}>{pokemon.SpDefense}</td>
              <td style={styles.tableCell}>{pokemon.Speed}</td>
              <td style={styles.tableCell}>{pokemon.BaseStats}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#f0f8ff',
    minHeight: '100vh',
  },
  title: {
    fontSize: '2.5rem',
    color: '#00939b',
    marginBottom: '20px',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
  },
  loading: {
    fontSize: '1.5rem',
    color: '#6c757d',
  },
  searchContainer: {
    marginBottom: '20px',
  },
  searchInput: {
    padding: '10px',
    fontSize: '1rem',
    width: '300px',
    borderRadius: '5px',
    border: '1px solid #ddd',
  },
  table: {
    width: '90%',
    margin: '0 auto',
    borderCollapse: 'collapse',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'white',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  tableHeader: {
    backgroundColor: '#00939b',
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  tableRowEven: {
    backgroundColor: '#f8f9fa',
  },
  tableRowOdd: {
    backgroundColor: '#ffffff',
  },
  tableCell: {
    padding: '10px',
    border: '1px solid #ddd',
    textAlign: 'left',
    fontSize: '1rem',
  },
};

export default BattleStats;