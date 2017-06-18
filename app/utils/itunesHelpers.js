import axios from 'axios'
import queryString from 'query-string'
import { makeCorsRequest } from './corsHelpers'

// from: https://affiliate.itunes.apple.com/resources/documentation/itunes-store-web-service-search-api/#legal
// https://itunes.apple.com/search?parameterkeyvalue
// term: URL encoded term
// countr: 2 letter country code 
// media: music
// entity: musicArtist, musicTrack, album, song
/*
term
country=CA
media=music
entity=musicArtist|musicTrack|album|musicVideo|mix|song
attribute=allArtistTerm|songTerm
callback=wsSearchCB
limit=10
lang=en_us
*/

// https://itunes.apple.com/search?term=love&country=CA&media=music&entity=musicArtist&limit=10&lang=en_us

let api = 'https://itunes.apple.com/search?'

let defaultOptions = {
    term: 'n/a', // replaced
    country: 'CA',
    media: 'music',
    entity: 'song', // replaced
    attribute: 'artistTerm', // replaced
    limit: 10,
    lang: 'en_us',
}

// callback: 'wsSearchCB',
// https://itunes.apple.com/search?term=dylan&country=CA&media=music&entity=&attribute=&limit=10&lang=en_us

const toParams = (obj) => {
    var str = Object.keys(obj).map(function(key) {
        return key + '=' + obj[key];
    }).join('&')
    return str
}

window.wsSearchCB = () => {
    console.info('callback fired')
}

export const formatITunesData = (obj) => {
    const data = {
        artists: [
            {
                href: obj.artistViewUrl,
                name: obj.artistName
            }
        ],
        album: {
            images: [
                {
                    url: obj.artworkUrl100
                }
            ],
            href: obj.collectionViewUrl,
            name: obj.collectionName
        },
        track: {
            href: obj.trackViewUrl,
            name: obj.trackName,
            preview: obj.previewUrl
        }
    }
    return data
} 

const getOptionSettings = (type, name) => {
    let options = {}
    switch(type) {
        case 'song':
            options = {
                term: name,
                entity: 'song',
                attribute: 'songTerm'
            }
        break;
        case 'artist':
            options = {
                term: name,
                entity: 'musicArtist',
                attribute: 'artistTerm'
            }
        break;
        case 'song+artist':
            options = {
                term: name,
                entity: 'musicTrack',
                attribute: 'artistTerm'
            }
        break;
        case 'id':
            options = {
                term: name,
                entity: 'musicTrack',
                attribute: 'artistTerm'
            }
        break;
    }

    return Object.assign({}, defaultOptions, options)
}

export const searchSong = (type, name) => {
    let options = getOptionSettings(type, name)
    let url = api + toParams(options)
    
    return makeCorsRequest(url)
        .then((res) => {
            let data = JSON.parse(res)
            return data
        })
}

export default {
    searchSong,
    formatITunesData
}
