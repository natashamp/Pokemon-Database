import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BattleStats from './components/BattleStats'; // Correct path to the BattleStats component

function App() {
  const [pokemonData, setPokemonData] = useState([]); // State for all Pokémon data
  const [filteredData, setFilteredData] = useState([]); // State for filtered Pokémon data
  const [loading, setLoading] = useState(true); // State for loading status
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const [filters, setFilters] = useState({ // State for filters
    isLegendary: '',
    generation: '',
  });

  useEffect(() => {
    // Fetch data from the backend API
    fetch('http://localhost:3001/pokemon')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched Pokémon data:', data);
        setPokemonData(data); // Set the full Pokémon data
        setFilteredData(data); // Initialize filtered data with all Pokémon
        setLoading(false); // Set loading to false
      })
      .catch((error) => {
        console.error('Error fetching Pokémon data:', error);
        setLoading(false); // Set loading to false on error
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

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Apply filters when the button is pressed
  const applyFilters = () => {
    let filtered = pokemonData;

    if (filters.isLegendary && filters.isLegendary !== '') {
      filtered = filtered.filter(
        (pokemon) => String(pokemon.IsLegendary) === filters.isLegendary
      );
    }

    if (filters.generation && filters.generation !== '') {
      filtered = filtered.filter(
        (pokemon) => String(pokemon.Generation) === filters.generation
      );
    }

    // Apply search term after filtering
    if (searchTerm) {
      filtered = filtered.filter((pokemon) =>
        Object.values(pokemon).some((val) =>
          String(val).toLowerCase().includes(searchTerm)
        )
      );
    }

    setFilteredData(filtered);
  };

  return (
    <Router>
      <div style={styles.container}>
        {/* Navigation Bar */}
        <nav style={styles.navbar}>
          <Link to="/" style={styles.navLink}>Home</Link>
          <Link to="/battle-stats" style={styles.navLink}>Battle Stats</Link>
        </nav>

        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <>
                <header style={styles.header}>
                  <h1 style={styles.title}>Pokémon Database</h1>
                  <p style={styles.subtitle}>Discover stats and details about your favorite Pokémon!</p>
                </header>
                <main style={styles.main}>
                  {loading ? (
                    <p style={styles.loading}>Loading Pokémon data...</p>
                  ) : (
                    <>
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

                      {/* Filters */}
                      <div style={styles.filterContainer}>
                        <label style={styles.filterLabel}>
                          Legendary:
                          <select
                            name="isLegendary"
                            value={filters.isLegendary}
                            onChange={handleFilterChange}
                            style={styles.filterSelect}
                          >
                            <option value="">All</option>
                            <option value="1">Yes</option>
                            <option value="0">No</option>
                          </select>
                        </label>
                        <label style={styles.filterLabel}>
                          Generation:
                          <select
                            name="generation"
                            value={filters.generation}
                            onChange={handleFilterChange}
                            style={styles.filterSelect}
                          >
                            <option value="">All</option>
                            <option value="1">Generation 1</option>
                            <option value="2">Generation 2</option>
                            <option value="3">Generation 3</option>
                            <option value="4">Generation 4</option>
                            <option value="5">Generation 5</option>
                            <option value="6">Generation 6</option>
                            <option value="7">Generation 7</option>
                            <option value="8">Generation 8</option>
                          </select>
                        </label>
                        <button onClick={applyFilters} style={styles.filterButton}>
                          Apply Filters
                        </button>
                      </div>

                      {/* Table */}
                      <div style={styles.tableContainer}>
                        <table style={styles.table}>
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Name</th>
                              <th>BaseStats</th>
                              <th>ClassificationInfo</th>
                              <th>Height (in)</th>
                              <th>Height (m)</th>
                              <th>Weight (lbs)</th>
                              <th>Weight (kg)</th>
                              <th>Capture Rate</th>
                              <th>Gender Male Ratio</th>
                              <th>EggSteps</th>
                              <th>EggCycles</th>
                              <th>Generation</th>
                              <th>Legendary</th>
                              <th>Mythical</th>
                              <th>UltraBeast</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredData.map((pokemon) => (
                              <tr key={pokemon.PokemonID}>
                                <td>{pokemon.PokemonID}</td>
                                <td>{pokemon.Name}</td>
                                <td>{pokemon.BaseStats}</td>
                                <td>{pokemon.ClassificationInfo}</td>
                                <td>{pokemon.HeightInches}</td>
                                <td>{pokemon.HeightMeters}</td>
                                <td>{pokemon.WeightPounds}</td>
                                <td>{pokemon.WeightKilograms}</td>
                                <td>{pokemon.CaptureRate}</td>
                                <td>{pokemon.GenderMaleRatio}</td>
                                <td>{pokemon.EggSteps}</td>
                                <td>{pokemon.EggCycles}</td>
                                <td>{pokemon.Generation}</td>
                                <td>{pokemon.IsLegendary ? 'Yes' : 'No'}</td>
                                <td>{pokemon.IsMythical ? 'Yes' : 'No'}</td>
                                <td>{pokemon.IsUltraBeast ? 'Yes' : 'No'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}
                </main>
              </>
            }
          />

          {/* Battle Stats Page */}
          <Route path="/battle-stats" element={<BattleStats />} />
        </Routes>
      </div>
    </Router>
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
  navbar: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginBottom: '20px',
    backgroundColor: '#00939b',
    padding: '10px',
    borderRadius: '8px',
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
  header: {
    marginBottom: '30px',
    backgroundColor: '#00939b',
    color: 'white',
    padding: '20px',
    borderRadius: '8px',
  },
  title: {
    fontSize: '2.5rem',
    margin: '0',
  },
  subtitle: {
    fontSize: '1.2rem',
    margin: '10px 0 0',
  },
  main: {
    marginTop: '20px',
  },
  loading: {
    fontSize: '1.5rem',
    color: '#6c757d',
  },
  tableContainer: {
    overflowX: 'auto',
    margin: '0 auto',
    maxWidth: '90%',
    borderRadius: '8px',
    borderColor: '#00939b',
    borderWidth: '1px',
    borderStyle: 'solid',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'white',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
    backgroundColor: 'white',

  },
  filterButton: {
    marginLeft: '20px',
    padding: '10px 20px',
    fontSize: '1rem',
    backgroundColor: '#00939b',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  filterContainer: {
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
  },
  filterLabel: {
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  filterSelect: {
    marginLeft: '10px',
    padding: '5px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ddd',
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
};

export default App;