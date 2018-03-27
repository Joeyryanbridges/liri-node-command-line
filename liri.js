//Loading of Api/packages
const dotEnv = require("dotenv").config();
const request = require("request");
const fs = require("fs");
const key = require(__dirname + "/keys.js");
const socialMedia = require("twitter");
const musicMedia = require("node-spotify-api");
const moviesMedia = require("omdb");


