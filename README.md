# Spotify Song Search & Service Toggle

This simple app is setup to allow a song search on the Spotify API.  Once the form is filled out use the service drop down to toggle between music streaming services. 

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Support](#support)

## Installation

$ npm install
$ npm run start

## Usage

To enable the Spotify API you must authenticate with Spotify.  Without authentication you will see a 'missing token' message inside the consol. Clone and run the Authorization Code flow found here: https://github.com/spotify/web-api-auth-examples.  A successful authentication will supply you a client ID and secret.  Those values ~may~ have to be transfered to the corresponding variables here: /app/utils/spotifyHelpers.js.  

To run the iTunes API you'll need to install this [CORS extension for Chrome](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi)

## Support

email me at wesgknight@gmail.com
