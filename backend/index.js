const express = require("express");
const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/", (req, res)=> {
  res.status(200).json("Works")
})

app.listen(8000, () => {
  console.log("Listening on Port 8000")
})
