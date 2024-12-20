// import express from 'express';
// import fs from "node:fs/promises";
// import { type } from 'node:os';
// const filename = 'pokemongen1.json';

// const app = express();
// const port = 3000;

// // app.get("/", function(req, res) {
// //     res.send("Hello World!")
// // })

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
//   })



// //GET request - all Pokémon
// //make a get request to path "/" using async function
// app.get("/", async function(req,res) {
//     try {
//     const data = await fs.readFile(filename, "utf8");
//     const parsedData = JSON.parse(data);
//     res.status(200).json (
//     {
//         success: true,
//         payload: parsedData
//     });
//     } catch(error) {
//     res.status(500).json (
//     {
//         success: false,
//         payload: "Error"
//     });
//     }
// }
// );


// //Create  variable to store all of our Pokemon
// //return from an async function to resolve promise
// async function getAllPokemon() {
//     const data = await fs.readFile(filename, "utf8");
//     //Forgot to parse from JSON!
//     const allPokemons = JSON.parse(data);
//     // console.log(allPokemons);
//     return allPokemons;    
// }

// //get Pokemon by Number helper function
// //take in a given Pokemons number 1,2,3
// async function getPokemonByNumber(pokemonNumber) {
//     const allPokemons = await getAllPokemon();
//     // console.log(allPokemons);

//     //filter allPokemons by "Number" = pokemonNumber
//     const pokemon = allPokemons.filter(function(pokemon) {
//         return pokemon.Number === pokemonNumber;
//         });
//     console.log(pokemon)
//     //store the resulting object in a new variable
//     //return the resulting object
//     }

// getPokemonByNumber(10)