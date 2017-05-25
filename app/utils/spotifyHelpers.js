
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
    
    return axios.get(api)
      .then(function (response) {
        return response;
      })
      .catch(function (error){
        console.error('error: ' + error);
      });
}

const paramify = (oObj) => {
  var str = oObj.keys(obj).map(function(key) {
      return key + '=' + obj[key];
  }).join('&');
}


export const setAccessToken = (token) => {
  spotifyApi.setAccessToken(token)
}

export const formatSpotifyData = (obj) => {
  const data = obj
  data.track = {
    href: obj.href,
    name: obj.name,
    preview: obj.preview 
  }
  return data
}

const getOptionSettings = (type, term) => {
  let searchString = ''
  switch (type) {
      case 'song':
          searchString = term
      break;
      case 'artist':
          searchString = 'artist:' + term
      break;
      case 'song+artist':
          let parts = term.split(', ')
          let track = parts[0]
          let artist = parts[1]
          searchString = 'track:' + track + ' artist:' + artist
      break;
      case 'id':
          searchString = term
      break;
      default:
          searchString = term
      break;
  }
  return searchString
}

export const searchTracks = (type, name) => {
  let searchString = getOptionSettings(type, name)
  
  return spotifyApi.searchTracks(searchString)
    .then((data) => {
      return data.body
    }, (err) => {
      console.error(err)
    })
}

export const getAudioAnalysisForTrack = (id) => {
  /* Get Audio Analysis for a Track */
  return spotifyApi.getAudioAnalysisForTrack('3Qm86XLflmIXVm1wcwkgDK')
    .then(function(data) {
    }, function(err) {
      done(err);
    });
}

export const getTrackById = (id) => {
  debugger
  return spotifyApi.getTrack(id)
    .then(function(data) {
      console.log('getTrack: ', data.body)
    })
}

export default {
  searchTracks,
  getTrackById
}