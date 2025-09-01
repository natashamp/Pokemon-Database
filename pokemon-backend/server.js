require('dotenv').config(); // Load environment variables from .env
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database.');
});

// Example Route
app.get('/', (req, res) => {
  res.send('Welcome to the Pokemon Backend API!');
});

// API Endpoint to Fetch Pokémon Data with Types and Abilities
app.get('/pokemon', (req, res) => {
  const query = `
    SELECT 
      p.PokemonID,
      p.Name,
      p.HP,
      p.Attack,
      p.Defense,
      p.SpAttack,
      p.SpDefense,
      p.Speed,
      p.BaseStats,
      p.ClassificationInfo,
      p.HeightInches,
      p.HeightMeters,
      p.WeightPounds,
      p.WeightKilograms,
      p.CaptureRate,
      p.GenderMaleRatio,
      p.EggSteps,
      p.EggCycles,
      p.Forms,
      p.Generation,
      p.IsLegendary,
      p.IsMythical,
      p.IsUltraBeast,
      p.NumberImmune,
      p.NumberNotEffective,
      p.NumberNormal,
      p.NumberSuperEffective,
      GROUP_CONCAT(DISTINCT t.TypeName) AS Types,
      GROUP_CONCAT(DISTINCT a.AbilityName) AS Abilities
    FROM Pokemon p
    LEFT JOIN PokemonType pt ON p.PokemonID = pt.PokemonID
    LEFT JOIN Type t ON pt.TypeID = t.TypeID
    LEFT JOIN PokemonAbilities pa ON p.PokemonID = pa.PokemonID
    LEFT JOIN Abilities a ON pa.AbilityID = a.AbilityID
    GROUP BY p.PokemonID;
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Error fetching data');
    } else {
      res.json(results);
    }
  });
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Backend API running on http://localhost:${PORT}`);
});