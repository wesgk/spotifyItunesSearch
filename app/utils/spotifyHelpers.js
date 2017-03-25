
import axios from 'axios'
import queryString from 'query-string'

const client_id = '39652b89ede94100abfd9e82cf8f5d45'; // Your client id
const client_secret = '8341a2f591144da2af7f4bd58d682ffc'; // Your secret
const redirect_uri = 'http://127.0.0.1:8888/#/callback'; // Your redirect uri
// const redirect_uri = 'http://wesknight.com'; // Your redirect uri
const stateKey = 'spotify_auth_state'; 
const authUrl = 'http://localhost:8888/';

const SpotifyWebApi = require('spotify-web-api-node')
const spotifyApi = new SpotifyWebApi();

export const getAuthObj = () => {
    const api = authUrl + 'authcode';
    console.log('API to: ' + api);
    return axios.get(api)
      .then(function (response) {
        console.log('response: ', response);
        return response;
      })
      .catch(function (error){
        console.error('error: ' + error);
      });
}

export const setAccessToken = (token) => {
  spotifyApi.setAccessToken(token)
}

// 'track:Alright artist:Kendrick Lamar'
// 'artist:Love'
export const searchTracks = (name) => {
  return spotifyApi.searchTracks(name)
    .then((data) => {
      console.log('Search by ' + name + ', ', data.body)
      return data.body
    }, (err) => {
      console.error(err)
    })
}

export const getAudioAnalysisForTrack = (id) => {
  /* Get Audio Analysis for a Track */
  return spotifyApi.getAudioAnalysisForTrack('3Qm86XLflmIXVm1wcwkgDK')
    .then(function(data) {
      console.log('getAudioAnalysisForTrack: ', data.body)
    }, function(err) {
      done(err);
    });
}

export const getTrack = (id) => {
  return spotifyApi.getTrack(id)
    .then(function(data) {
      console.log('getTrack: ', data.body)
    })
}