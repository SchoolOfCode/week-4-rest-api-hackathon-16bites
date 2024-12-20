import express from 'express';
import fs from 'node:fs/promises';

const filename = 'pokemongen1.json';
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

// Helper function to get all Pokémon
async function getAllPokemon() {
    try {
        const data = await fs.readFile(filename, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading the file:', error);
        throw error;
    }
}

// Helper function to get Pokémon by Number
async function getPokemonByNumber(pokemonNumber) {
    const allPokemons = await getAllPokemon();

    // Find Pokémon by "Number"
    const pokemon = allPokemons.find(pokemon => pokemon.Number === pokemonNumber);

    return pokemon || null; // Return null if no Pokémon is found
}

// Endpoint to get all Pokémon
app.get('/', async (req, res) => {
    try {
        const allPokemons = await getAllPokemon();
        res.status(200).json({
            success: true,
            payload: allPokemons
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving Pokémon data'
        });
    }
});

// Endpoint to get a Pokémon by Number
app.get('/pokemon/number/:number', async (req, res) => {
    try {
        const pokemonNumber = parseInt(req.params.number); // Convert the parameter to an integer
        const pokemon = await getPokemonByNumber(pokemonNumber);

        if (pokemon) {
            res.status(200).json({
                success: true,
                payload: pokemon
            });
        } else {
            res.status(404).json({
                success: false,
                message: `Pokémon with Number ${pokemonNumber} not found`
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving Pokémon'
        });
    }
});

// Endpoint to get a Pokémon by Name
app.get('/pokemon/name/:name', async (req, res) => {
    try {
        const pokemonName = req.params.name.toLowerCase();
        const allPokemons = await getAllPokemon();

        // Find Pokémon by "Name" (case-insensitive)
        const pokemon = allPokemons.find(pokemon => pokemon.Name.toLowerCase() === pokemonName);

        if (pokemon) {
            res.status(200).json({
                success: true,
                payload: pokemon
            });
        } else {
            res.status(404).json({
                success: false,
                message: `Pokémon with Name "${req.params.name}" not found`
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving Pokémon'
        });
    }
});

// Endpoint to get a Pokémon by Type 1
app.get('/pokemon/type1/:type1', async (req, res) => {
    try {
        const pokemonType1 = req.params.type1.toLowerCase();
        const allPokemons = await getAllPokemon();

        // Find Pokémon by "Type 1" (case-insensitive)
        const pokemon = allPokemons.filter(pokemon => pokemon.Type1.toLowerCase() === pokemonType1);

        if (pokemon) {
            res.status(200).json({
                success: true,
                payload: pokemon
            });
        } else {
            res.status(404).json({
                success: false,
                message: `Pokémon with Type "${req.params.type1}" not found`
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving Pokémon'
        });
    }
});