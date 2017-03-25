
import axios from 'axios'
import queryString from 'query-string'

const client_id = '39652b89ede94100abfd9e82cf8f5d45'; // Your client id
const client_secret = '8341a2f591144da2af7f4bd58d682ffc'; // Your secret
const redirect_uri = 'http://127.0.0.1:8888/#/callback'; // Your redirect uri
// const redirect_uri = 'http://wesknight.com'; // Your redirect uri
const stateKey = 'spotify_auth_state'; 

export const generateRandomString = (length) => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

 export const login = () => {
    const state = generateRandomString(16)
    
    console.log('in login');

    // your application requests authorization
    const scope = 'user-read-private user-read-email user-top-read'
    const link = 'https://accounts.spotify.com/authorize?response_type=code&'
    const myString = queryString.stringify({
        // response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
        })
    
    console.log('link: ' + link + myString)

    return link + myString
        
} 

export const loginLink = login()

/* export const callback = (req, res) => {

// your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  console.log('in callback');

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
            refresh_token = body.refresh_token;

        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          console.log(body);
        });

        // we can also pass the token to the browser to make requests from there
        res.redirect('/#' +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          }));
      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
} */