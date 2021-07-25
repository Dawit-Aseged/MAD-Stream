const express = require("express");
const app = express();
const Dir = require("./helperFunctions");

const Movies = require("./routes/movies");

app.use(express.urlencoded({ extended: false }));
//app.use(express.json); // USED TO PARSE JSON.
app.use('/dapi/movies', Movies); // USING THE ROUTES SPECIFIED IN THE ROUTES FOLDER.

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/", (req, res) => {
    // This is reserved for hosting the angular file
    res.status(200).json("Works")
})

app.post('/dapi/save', (req, res) => { // ASSUMING THERE'S A FORM WITH AN ACTION NAMED '/DAPI/SAVE', WITH A POST METHOD PLUS AN INPUT FORM OF TYPE=text AND NAME=dirPath
    let { dirPath } = req.body;

    if (!dirPath) {
        return res.status(401).send("Didnt add a directory")
    } else {
        Dir.AddDirectory(dirPath);
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