const express = require("express");
const app = express();
const Dir = require("./helperFunctions")

app.use(express.urlencoded({ extended: false }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/", (req, res) => {
    // This is reserved for hosting the angular file
    res.status(200).json("Works")
})

app.get("/dapi/movies", (req, res) => {
    res.status(200).json({
        newMovies: Dir.FinalDir('../Database/addresses.txt'),
    })
})

app.get('/dapi/movies/:dirPathh', (req, res) => {
    let { dirPathh } = req.params;
    if (!dirPathh) {
        return res.status(404).send("File Path not accessed.");
    } else {
        return res.status(200).send("File Path accessed successfully.");
    }
})

app.post('/dapi/save', (req, res) => { // ASSUMING THERE'S A FORM WITH AN ACTION NAMED '/DAPI/SAVE', WITH A POST METHOD PLUS AN INPUT FORM OF TYPE=text AND NAME=dirPath
    let { dirPath } = req.body;

    if (!dirPath) {
        return res.status(401).send("Didnt add a directory")
    } else {

        return res.status(200).send("Directory Added!")
    }
})

app.listen(8000, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log("Listening on Port 8000")
    }
})