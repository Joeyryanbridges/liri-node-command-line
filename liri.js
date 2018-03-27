//Loading of Api/packages
const dotEnv = require("dotenv").config();
const request = require("request");
const fs = require("fs");
const key = require(__dirname + "/keys.js");
const socialMedia = require("twitter");
const musicMedia = require("node-spotify-api");
const moviesMedia = require("omdb");

//Import Keys?
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

//Arguments for the user's input
userCommands = process.argv[2];
userArgument = process.argv[3];

//Switch-case to direct the function that will be ran
switch (action) {
    case "my-tweets":
        myTweets();
        break;

    case "spotify-this-song":
        spotifyThisSong();
        break;

    case "movie-this":
        movieThis();
        break;

    case "do-what-it-says":
        doWhatItSays();
        break;
}

//Make myTweets show last 20 tweets and when they were created
function myTweets() {

}

//Make spotifyThisSong show song information
function spotifyThisSong() {

}

//Make movieThis output movie information
function movieThis() {

}

//Make doWhatItSays text in random.txt calling one of liri's commands
function doWhatItSays() {

}