require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const pokedex = require('./pokedex.json');
console.log('API_TOKEN: ', process.env.API_TOKEN);
const app = express();

app.use(morgan('dev'));

app.use(validateBearerToken);

app.get('/types', handleGetTypes);

app.get('/pokemon', handleGetPokemon);

function validateBearerToken(req,res,next){
  const apiToken = process.env.API_TOKEN;
  const authToken = req.get('Authorization');
  console.log('authToken: ', authToken);
  console.log('ApiToken: ', apiToken);
  if (!authToken || authToken.split(' ')[1] !== apiToken) {
    return res.status(401).json({ error: 'Unauthorized request' });
  }

  next();
}

const validTypes = ['Bug', 'Dark', 'Dragon', 'Electric', 'Fairy', 'Fighting', 'Fire', 'Flying', 'Ghost', 'Grass', 'Ground', 'Ice', 'Normal', 'Poison', 'Psychic', 'Rock', 'Steel', 'Water'];


function handleGetTypes(req, res){
  res.json(validTypes);
}

function handleGetPokemon(req, res){
  let response = pokedex.pokemon;

  if (req.query.name) {
    response = response.filter(pokemon =>
      // case insensitive searching
      pokemon.name.toLowerCase().includes(req.query.name.toLowerCase())
    );
  }

  // filter our pokemon by type if type query param is present
  if (req.query.type) {
    response = response.filter(pokemon =>
      pokemon.type.includes(req.query.type)
    );
  }

  res.json(response);
}

const PORT = 8000;
const base = 'http://localhost:';
app.listen(PORT, () => {
  console.log(`Express server is listening on ${base}${PORT}!`);
});