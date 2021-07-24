const express = require("express");
const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/", (req, res)=> {
  // This is reserved for hosting the angular file
  res.status(200).json("Works")
})

app.get("/dapi/movies", (req, res) => {
  res.status(200).json({
    movies: [
      {
        movie: "Some Movie",
        location: "D:\\Videos\\Movies\\Army of The Dead.mp4"
      },

      {
        movie: "Some Movie",
        location: "D:\\Videos\\Movies\\Cosmic Sin.mp4"
      },

      {
        movie: "Some Movie",
        location: "D:\\Videos\\Movies\\Mortal Kombat.mp4"
      },

      {
        movie: "Some Movie",
        location: "D:\\Videos\\Movies\\Raya and the Last Dragon.mp4"
      }
    ]
  })
})
app.listen(8000, () => {
  console.log("Listening on Port 8000")
})
