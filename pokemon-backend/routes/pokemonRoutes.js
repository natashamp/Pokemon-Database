const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// Get Pokémon with "Magic" abilities
router.get('/pokemon-magic', (req, res) => {
  const query = `
    SELECT DISTINCT P.Name AS PokemonName, A.AbilityName
    FROM Pokemon P
    JOIN PokemonAbilities PA ON P.PokemonID = PA.PokemonID
    JOIN Abilities A ON PA.AbilityID = A.AbilityID
    WHERE A.AbilityName LIKE '%Magic%'
    ORDER BY P.Name;
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).send('Database error');
    res.json(results);
  });
});

module.exports = router;
