// Courtesy of: https://www.html5rocks.com/en/tutorials/cors/
// Create the XHR object.
export const createCORSRequest = (method, url) => {
  let xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}

// Helper method to parse the title tag from the response.
export const getTitle = (text) => {
  return text.match('<title>(.*)?</title>')[1];
}

// Make the actual CORS request.
export const makeCorsRequest = (url) => {
  // This is a sample server that supports CORS.
  // var url = 'http://html5rocks-cors.s3-website-us-east-1.amazonaws.com/index.html'

  console.log('url: ' + url)
  let success = ''
  let fail = ''

  let response = new Promise((resolve, reject) => {
    success = resolve
    fail = reject
  })

  let xhr = createCORSRequest('GET', url);
  if (!xhr) {
    alert('CORS not supported');
    fail('not supported')
  }

  // Response handlers.
  xhr.onload = () => {
    console.log('onload ', xhr)
    /* let text = xhr.responseText;
    let title = getTitle(text);
    let response = {
      text,
      title
    }*/
    // console.log('onload: ' + url + ': ' + title)
    // alert('Response from CORS request to ' + url + ': ' + title);
    success(xhr.response)
  }

  xhr.onerror = () => {
    console.log('Woops, there was an error making the request.');
    alert('Woops, there was an error making the request.');
    fail('error')
  }

  xhr.send();

  return response;
}