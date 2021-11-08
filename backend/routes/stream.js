const express = require('express')
const routes = express.Router();
const fs = require('fs')
const path = require('path')
const Dir = require("../helperFunctions")


routes.get("", (req, res) => {
  var filePath = decodeURIComponent(req.url.split("=")[1]);
  if(!fs.existsSync(filePath)){
    res.status(400).json({message: "File doesn't exist"})
    return;
  }
  const range = req.headers.range; // This is to find the range of bytes the video requested
  if (!range) {
      res.status(400).send("Requires Range Header");
  } else {
      if (path.extname(filePath) !== ".mp4") {
          res.status(400).send("File format must be .mp4");
      } else {
          const videoPath = filePath; // Path of the video
          const videoSize = fs.statSync(videoPath).size; // Size of the video

          const CHUNK_SIZE = 20 ** 6; // The chunck of file that is sent at a time
          const start = Number(range.replace(/\D/g, ""));
          const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

          const contentLength = end - start + 1;
          const headers = {
              "Content-Range": `bytes ${start}-${end}/${videoSize}`,
              "Accept-Ranges": "bytes",
              "Content-Length": contentLength,
              "Content-Type": "video/mp4",
          };

          res.writeHead(206, headers);
          const videoStream = fs.createReadStream(videoPath, { start, end }); // The read stream
          videoStream.pipe(res); // The response
      }
  }
});


module.exports = routes;
