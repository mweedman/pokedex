const express = require('express');
const morgan = require('morgan');

const app = express();

app.get('/pokemon', (req,res) => {
  const {name = '', type} = req.query;
  const validTypes = [`Bug`, `Dark`, `Dragon`, `Electric`, `Fairy`, `Fighting`, `Fire`, `Flying`, `Ghost`, `Grass`, `Ground`, `Ice`, `Normal`, `Poison`, `Psychic`, `Rock`, `Steel`, `Water`]

  if(name){
    //name search query here
  };
  if(type){
    if(!validTypes.toLowerCase().includes(type.toLowerCase)){
      return res
        .status(400)
        .send(`Pokemon type must be one of: ${validTypes}`);
    }
  }

  let results = 
});

app.listen(8000, () => {
  console.log('Express server is listening on port 8000!');
});