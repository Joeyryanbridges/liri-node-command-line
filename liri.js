//liri bot requirement
var inquirer = require('inquirer')
require("dotenv").config();
//Loading of Api/packages
var request = require("request");
var fs = require("fs");
var key = require(__dirname + "/keys.js");
var socialMedia = require("twitter");
var musicMedia = require("node-spotify-api");
var moviesOmdb = (keys.omdb);
//Initilizes Api's?
var twitter = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);
//Arguments for the user's input
var userCommands = process.argv[2];
var userArgument = process.argv[3];

//Switch-case to direct the function that will be ran
switch (action) {
    case "my-tweets":
        myTweets();
        break;

    case "spotify-this-song":
        if (userArgument) {
            spotifyThisSong(userArgument);
        } else {
            spotifyThisSong("The Sign Ace of Base")
            break;
        };

    case "movie-this":
        movieThis();
        break;

    case "do-what-it-says":
        doWhatItSays();
        break;
}

//Make myTweets show last 20 tweets and when they were created
function myTweets() {
    var params = {
        screen_name: 'himynameis_joey',
        count: 20
    };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (i = 0; i < tweets.length; i++) {
                console.log.apply("Tweet: " + tweets[i].text);
                console.log("Date: " + tweets[i].created_at);
                console.assert.log("-------------------------");
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
    if (song === ' ') {
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

    function movieThis(movie) {
        var title = movie;
        if (title === ' ') {
            title = "Mr. Nobody"
        };
        var omdbQueryUrl = "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=" + moviesOmdb.key;
        request(omdbQueryUrl, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                var movieBody = JSON.parse(body);
                console.log("Title: " + movieBody.Title);
                console.log("Year :" + movieBody.Year);
                console.log("Rating: " + movieBody.Rating[1]);
                console.log("Rotten Tomatoes: " + movieBody.Rating[1].Value);
                console.log("Where was it produced: " + movieBody.Country);
                console.log("Language: " + movieBody.Language);
                console.log("Plot of movie: " + movieBody.Plot);
                console.log("Actors: " + movieBody.Actors);
            }
        })
    }
}
