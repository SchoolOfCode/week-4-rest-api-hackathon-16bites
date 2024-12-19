import express from 'express';
import fs from "node:fs/promises";
const filename = 'pokemongen1.json';

const app = express();
const port = 3000

// app.get("/", function(req, res) {
//     res.send("Hello World!")
// })

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })



//GET request - all Pokémon
//make a get request to path "/" using async function
app.get("/", async function(req,res) {
    try {
    const data = await fs.readFile(filename, "utf8");
    const parsedData = JSON.parse(data);
    res.status(200).json (
    {
        success: true,
        payload: parsedData
    });
    } catch(error) {
    res.status(500).json (
    {
        success: false,
        payload: "Error"
    });
    }
}
);