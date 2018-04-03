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
                break;
            };

        case "movie-this":
            if (userArgument) {
                movieThis(userArgument)
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
function spotifyThisSong() {
    if (song === '') {
        song = 'The Sign Ace of Base';
    }
    spotify.search({ type: 'track, query: song' }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        else {
            var songInfo = data.tracks.item[0];
            console.log("Artist: " + songInfo.artists[0].name);
            console.log("Track: " + songInfo.name);
            console.log("Album: " + songInfo.album.name);
            console.log("Preview: " + songInfo.preview_url);
            console.log("------------------------------------");
        }
    });


    //Make movieThis output movie information
    //* Title of the movie.
    //* Year the movie came out.
    //* IMDB Rating of the movie.
    //* Rotten Tomatoes Rating of the movie.
    //* Country where the movie was produced.
    //* Language of the movie.
    //* Plot of the movie.
    //* Actors in the movie.

    function movieThis(userArgument) {
        request("http://www.omdbapi.com/?t=" + inputName + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
            if (!error && response.statusCode === 200) {
                var movieBody = JSON.parse(body);
                console.log("     *****************************  ")
                console.log("Title: " + movieBody.Title);
                console.log("Year :" + movieBody.Year);
                console.log("Rating: " + movieBody.Rating[1]);
                console.log("Rotten Tomatoes: " + movieBody.Rating[1].Value);
                console.log("Where was it produced: " + movieBody.Country);
                console.log("Language: " + movieBody.Language);
                console.log("Plot of movie: " + movieBody.Plot);
                console.log("Actors: " + movieBody.Actors);
                console.log("     *****************************  ")
            };
        });
    };
};

switchCase(userCommand, userArgument);
