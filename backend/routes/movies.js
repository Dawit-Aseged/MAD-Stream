/**
 *
 * THIS FILE IS USED TO ROUTE EVERY PATH THAT IS WITHIN
 * '/dapi/movies'. IT JUST MAKES IT EASIER FOR ACCESS.
 *
 */

const express = require('express')
const routes = express.Router();
const Dir = require("../helperFunctions")

Dir.GetFiles('./Database/addresses.txt') // HAD TO INITIALIZE THE FILES FIRST SO THAT IT WOULDNT RETURN AN EMPTY ARRAY WHEN THE USER CALLS IT ON THE FIRST TIME.


routes.get('/', (req, res) => {

    res.status(200).json({
        newMovies: Dir.FinalDir('./Database/addresses.txt'),
    })
    Dir.cleanFiles();
})

// FUNCTION USED TO GET A PATH(WILL DEPRECATE IT LATER, MAYBE)
routes.get('/:dirPathh', (req, res) => {
    let { dirPathh } = req.params;
    if (!dirPathh) {
        return res.status(404).send("File Path not accessed.");
    }
    return res.status(200).send("File Path accessed successfully.");
})

// FUNCTION USED FOR SEARCHING PURPOSES.
routes.get('/v1/search', (req, res) => {
    const { movie } = req.query;

    if (!movie) {
        return res.status(404).send("Parameter Not Fulfilled!")
    }
    return res.status(200).send(`Parameter Fulfilled!: Query: ${movie}`)
})

// NOT SURE THIS WORKS UNLESS THE PRIOR FILES ARE WORKED OUT. THIS WILL BE CHANGED
// TO A POST METHOD AFTER A FORM IS CREATED.
routes.get('/v1/search_by_name', (req, res) => { // ASSUMING THERE'S A FORM WITH AN ACTION NAMED '/search_by_name', WITH A POST METHOD PLUS AN INPUT FORM OF TYPE=text AND NAME=movie
    const { movie } = req.query;

    if (!movie) {
        return res.status(404).send("Parameter Not Fulfilled!")
    }

    // USING A MAP, THEN USING THE MOVIE NAME AS AN IDENTIFIER
    // TO ACCESS THE ROOM DATA VIA THE ROOM MOVIE NAME.
    var Movies = {
        "room": Dir.FinalDir('../Database/addresses.txt'),
    };

    var rooms = new Map();
    for (room of Movies.room) {
        rooms.set(String(room.Movie), room);
    }

    if (!rooms.get(movie)) { // IF NO MOVIES ARE FOUND BY THAT NAME, RETURN NOT FOUND.
        return res.status(404).json({ Status: "Not found" })
    }
    return res.status(200).json({ Movie: `${rooms.get(movie).Movie}`, Location: `${rooms.get(movie).Location}` })
})

module.exports = routes;