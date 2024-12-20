import express from "express";
import fs from "node:fs/promises";
const filename = "pokemongen1.json";

const app = express();
const port = 3000;

app.listen(port, function () {
  console.log(`Example app listening on port ${port}`);
});

// Helper function to convert object keys to lowercase
function convertKeysToLowercase(obj) {
  const newObj = {};
  for (let key in obj) {
    newObj[key.toLowerCase()] = obj[key];
  }
  return newObj;
}


// GET request - all Pokémon
app.get("/", async function (req, res) {
  try {
    const data = await fs.readFile(filename, "utf8");
    let parsedData = JSON.parse(data);


    // Convert all keys in the parsed data to lowercase
    parsedData = parsedData.map(convertKeysToLowercase);



    // get the key and value from the query, convert them to lowercase
    const key = Object.keys(req.query)[0].toLowerCase();
    const value = req.query[key].toLowerCase();

      // check if the query is for 'highest'
      if (value === 'highest') {
        // Sort the data based on the key ('attack', 'defense' etc)
        parsedData = parsedData.sort(function (a, b) {
          return b[key] - a[key]; // Sort descending for highest
        });
        // Take the first element which should be highest
        parsedData = [parsedData[0]];

      // check if the query is for 'lowest' and do the same
      } else if (value === 'lowest') {
        parsedData = parsedData.sort(function (a, b) {
          return a[key] - b[key]; // Sort ascending for lowest
        });
        // Take the first element which should be the lowest
        parsedData = [parsedData[0]];

        // check if there is a key and value
      } else if (key && value) {
        parsedData = parsedData.filter(function (pokemon) {
          // if the key is 'number', convert the query value into a number
          if (key === 'number') {
          // return the pokemon whose number matches the numeric value
            return pokemon[key] === Number(value);
          } else {
            return (
              pokemon[key] && //check that the key in question exists
              //return the matching database item
              pokemon[key].toString().toLowerCase() === value);
          }
        });
      } 
    

    res.status(200).json({
      success: true,
      payload: parsedData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      payload: "Error",
    });
  }
});

