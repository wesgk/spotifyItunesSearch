import React, { Component } from 'react'
import SearchForm from '../components/SearchForm'
import TrackList from '../components/TrackList'
import { searchTracks, getAudioAnalysisForTrack, getTrack } from '../utils/spotifyHelpers'
// getTrackById
import iTunes from '../utils/itunesHelpers'

class SearchContainer extends Component {
    constructor (props) {
        super(props);
        this.state = {
            name: '',
            type: 'song',
            placeholder: 'Song title',
            tracks: [],
            service: 'spotify',
            loading: false
        }
        // this.TrackList = ITunesTrackList // default tracklist component
        this.handleServiceUpdate = this.handleServiceUpdate.bind(this)
        this.handleNameUpdate = this.handleNameUpdate.bind(this)
        this.handleTypeUpdate = this.handleTypeUpdate.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
    }

    handleServiceUpdate (e) {
        console.log('service update: ' + e.target.value)
        let service = e.target.value
        this.setState({
            service: e.target.value
        })
        this.handleSearch(service)
    } 

    handleNameUpdate (e) {
        this.setState({
            name: e.target.value
        })
    } 

    updatePlaceholder (type) {
        let placeholder = ''
        switch (type) {
            case 'song':
                placeholder = 'Song title'
            break;
            case 'artist':
                placeholder = 'Artist name'
            break;
            case 'song+artist':
                placeholder = 'Song title, artist name'
            break;
            case 'id':
                placeholder = 'ID'
            break;
        }
        this.setState({
            placeholder
        })
    }

    handleTypeUpdate (e) {
        let type = e.target.value
        this.setState({
            type
        })
        this.updatePlaceholder(type)
    }

    getSpotifyData (type, term) {
        let searchString = ''
        switch (type) {
            case 'song':
                searchString = term
                return searchTracks(searchString)
                    .then((data) => (data))
            break;
            case 'artist':
                searchString = 'artist:' + term
                return searchTracks(searchString)
                    .then((data) => (data))
            break;
            case 'song+artist':
                // 'track:Alright artist:Kendrick Lamar'
                let parts = term.split(', ')
                let track = parts[0]
                let artist = parts[1]
                searchString = 'track:' + track + ' artist:' + artist
                return searchTracks(searchString)
                    .then((data) => (data))
            break;
            case 'id':
                searchString = term
                return getTrack(term)
                    .then((data) => (data))
            break;
            default:
                console.log('default case')
            break;
        }
    }

    getITunesData (type, term) {
        let searchString = ''
        switch (type) {
            case 'song':
                searchString = term
                return iTunes.searchSong(searchString)
                    .then((data) => (data))
            break;
            case 'artist':

            break;
            case 'id':

            break;
            default:
                console.log('default case')
            break;
        }
    }

    handleSearch (thisService) {
        const service = (typeof thisService === 'string') ? thisService : this.state.service
        this.setState({loading: true})
        switch (service) {
            case 'spotify':
                this.getSpotifyData(this.state.type, this.state.name)
                    .then((data) => {
                        this.setState({
                            tracks: data.tracks.items,
                            service
                        })
                        this.setState({loading: false})
                        console.debug('Spotify Search Complete ', data.tracks.items)
                    })
            break;

            case 'itunes':
                // this.TrackList = ITunesTrackList
                this.getITunesData(this.state.type, this.state.name)
                    .then((data) => {
                        console.debug('iTunes Search Returned - before state change', data.results)
                        this.setState({
                            tracks: data.results,
                            service
                        })
                        this.setState({loading: false})
                        console.debug('iTunes Search Returned ', data.results)
                    })
            break;

            default: 
                this.getSpotifyData(this.state.type, this.state.name)
            break;
        }
    }

    render() {
        return(
            <div>
                <SearchForm 
                    name={this.state.name} 
                    placeholder={this.state.placeholder}
                    type={this.state.type}
                    handleServiceUpdate={this.handleServiceUpdate} 
                    handleNameUpdate={this.handleNameUpdate} 
                    handleTypeUpdate={this.handleTypeUpdate} 
                    handleSearch={this.handleSearch} 
                    />
                    <TrackList tracks={this.state.tracks} service={this.state.service} isLoading={this.state.loading} />
            </div>
        )
    }
}

export default SearchContainer