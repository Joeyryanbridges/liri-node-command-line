//accessing liribot
var inquirer = require('inquirer')
//require functions for node packages
require("dotenv").config();
//Loading of Api/packages
var request = require("request");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
//node package for reading nd writing files. 
var fs = require("fs");
//.env keys to javascript fo API's and their functionality
var keys = require('./keys.js');
var omdbApi = (keys.omdb);

//Importing spotify and twitter keys
var twitter = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);

//Variables for the user's input
var userCommand = process.argv[2];
var userArgument = process.argv[3];

//Switch-case to direct the function that will be ran
function switchCase(userCommand, userArgument) {
    switch (userCommand) {
        case "my-tweets":
            myTweets();
            break;

        case "spotify-this-song":
            if (userArgument) {
                spotifyThisSong(userArgument);
            } else {
                spotifyThisSong("The Sign, Ace of Base");
                console.log("   Search a new song yourself!  ")
            };
            break;

        case "movie-this":
            if (userArgument) {
                movieThis(userArgument);
            } else {
                movieThis("Mr. Nobody");
                console.log("   Search a movie yourself!!   ")
            };
            break;

        case "do-what-it-says":
            doWhatItSays();
            break;
    };
};

//Make myTweets show last 20 tweets and when they were created
function myTweets() {
    var params = {
        screen_name: 'himynameis_joey',
        count: 20
    };
    twitter.get('statuses/user_timeline/', params, function (error, tweets, response) {
        if (!error) {
            for (i = 0; i < tweets.length; i++) {
                console.log("   *************************************")
                console.log("Tweet: " + tweets[i].text);
                console.log("Date: " + tweets[i].created_at);
                console.log("   *************************************")
                //appending to .txt file
                fs.appendFile("log.txt", "Tweet: " + tweets[i].text + "\r\n" + tweets[i].created_at + "\r\n" + "\r\n", (error) => { /* err */ });
            }
        }
    });
}

//Make spotifyThisSong show song information
//* Artist
//* The song's name
//* A preview link of the song from Spotify
//* The album that the song is from
function spotifyThisSong(song) {
    if (song === '') {
        song = 'The Sign Ace of Base';
    }
    spotify.search({
        type: 'track', query: song
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        else {
            var songInfo = data.tracks.items[0];
            console.log("Artist: " + songInfo.artists[0].name);
            console.log("Track: " + songInfo.name);
            console.log("Album: " + songInfo.album.name);
            console.log("Preview: " + songInfo.preview_url);
            console.log("------------------------------------");
            fs.appendFile("log.txt", "Artist: " + songInfo.artists[0].name + "\r\n", (error) => { /* oversee error */ })
            fs.appendFile("log.txt", "Track: " + songInfo.name + "\r\n", (error) => { /* oversee error */ })
            fs.appendFile("log.txt", "Album: " + songInfo.album.name + "\r\n", (error) => { /* oversee error */ })
            fs.appendFile("log.txt", "Preview: " + songInfo.preview_url + "\r\n", (error) => { /* oversee error */ })
            fs.appendFile("log.txt", "----------------------------------------------------------------" + "\r\n", (error) => { /* oversee error */ });
        }
    });
};

//Make movieThis output movie information
//* Title of the movie.
//* Year the movie came out.
//* IMDB Rating of the movie.
//* Rotten Tomatoes Rating of the movie.
//* Country where the movie was produced.
//* Language of the movie.
//* Plot of the movie.
//* Actors in the movie.

function movieThis(movie) {
    var title = movie;
    if (title === '') {
        title = "Mr. Nobody"
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=" + omdbApi.key;
    request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var body = JSON.parse(body);
            console.log("     *****************************  ")
            console.log("Title: " + body.Title);
            console.log("Year: " + body.Year);
            console.log("IMDB Rating: " + body.imdbRating);
            console.log("Rotten Tomatoes Score: " + body.Ratings[1].Value);
            console.log("Country produced in: " + body.Country);
            console.log("Language: " + body.Language);
            console.log("Plot: " + body.Plot);
            console.log("Actors: " + body.Actors);
            console.log("     *****************************  ")
            //appending to .txt file
            fs.appendFile("log.txt", "Title: " + body.Title + "\r\n", (error) => { /* oversee error */ });
            fs.appendFile("log.txt", "Year: " + body.Year + "\r\n", (error) => { /* oversee error */ });
            fs.appendFile("log.txt", "IMDB Rating: " + body.imdbRating + "\r\n", (error) => { /* oversee error */ });
            fs.appendFile("log.txt", "Rotten Tomatoes Score: " + body.Ratings[1].Value + "\r\n", (error) => { /* oversee error */ });
            fs.appendFile("log.txt", "Country produced in: " + body.Country + "\r\n", (error) => { /* oversee error */ });
            fs.appendFile("log.txt", "Language: " + body.Language + "\r\n", (error) => { /* oversee error */ });
            fs.appendFile("log.txt", "Plot: " + body.Plot + "\r\n", (error) => { /* oversee error */ });
            fs.appendFile("log.txt", "Actors: " + body.Actors + "\r\n", (error) => { /* oversee error */ });
            console.log("----------------------------------------------------------------");
            fs.appendFile("log.txt", "----------------------------------------------------------------" + "\r\n", (error) => { /* oversee error */ });
        };
    });
};

switchCase(userCommand, userArgument)
