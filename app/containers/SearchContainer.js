import React, { Component } from 'react'
import SearchForm from '../components/SearchForm'
import TrackList from '../components/TrackList'
import { searchTracks, getAudioAnalysisForTrack, getTrackById } from '../utils/spotifyHelpers'
// getTrackById
import iTunes from '../utils/itunesHelpers'

const searchTypes = {
    song: 'song',
    artist: 'artist',
    songAndArtist: 'song+artist',
    id: 'id'
}

class SearchContainer extends Component {
    constructor (props) {
        super(props);
        this.state = {
            name: '',
            type: 'song',
            status: '',
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
            case searchTypes.song:
                placeholder = 'Song title'
            break;
            case searchTypes.artist:
                placeholder = 'Artist name'
            break;
            case searchTypes.songAndArtist:
                placeholder = 'Song title, artist name'
            break;
            case searchTypes.id:
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
        switch (type) {
            // need to reformat single track response
            case searchTypes.id:
                return getTrackById(term)
                    .then((data) => (data))
            break;
            default:
                return searchTracks(type,   term)
                    .then((data) => (data))
            break;
        }   
    }

    validateForm (type, term) {
        if(type === searchTypes.songAndArtist) {
            return term.match('.*\,.*')
        }
        return true
    }

    validationMessage (type) {
        let msg
        switch (type) {
            case searchTypes.songAndArtist:
                msg = 'Use the format "song title, artist name"'
            break;
        }
        return msg
    }

    handleSearch (thisService) {
        const service = (typeof thisService === 'string') ? thisService : this.state.service
        this.setState({status: ''})

        if(!(this.state.name.length)) {
            return
        }

        if(!this.validateForm(this.state.type, this.state.name)) {
            this.setState({
                status: this.validationMessage(this.state.type)
            })
            return false
        }

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
                    })
            break;

            case 'itunes':
                return iTunes.searchSong(this.state.type, this.state.name)
                    .then((data) => {
                        this.setState({
                            tracks: data.results,
                            service
                        })
                        this.setState({loading: false})
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
                    statusMessage={this.state.status}
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