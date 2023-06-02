const express = require("express");
const path = require("path");

const serveHtml = (req, res) => {
  res.cookie("XSRF-TOKEN", req.csrfToken());
  return res.sendFile(
    path.resolve(__dirname, "../../frontend", "build", "index.html")
  );
};

const staticAssets = express.static(path.resolve("../frontend/build"));


module.exports = { serveHtml, staticAssets };
