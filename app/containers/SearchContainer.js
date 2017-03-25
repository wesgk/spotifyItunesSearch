import React, { Component } from 'react'
import SearchForm from '../components/SearchForm'
import TrackList from '../components/TrackList'
import { searchTracks, getAudioAnalysisForTrack, getTrack } from '../utils/spotifyHelpers'

class SearchContainer extends Component {
    constructor (props) {
        super(props);
        this.state = {
            name: '',
            type: 'song',
            placeholder: 'Song title',
            tracks: []
        }
        this.handleNameUpdate = this.handleNameUpdate.bind(this)
        this.handleTypeUpdate = this.handleTypeUpdate.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
    }

    handleNameUpdate (e) {
        this.setState({
            name: e.target.value
        })
    } 

    updatePlaceholder (type) {
        console.log('updatePlaceholder: ' + type)
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

    handleSearch (e) {
        let searchString = ''
        console.log('searching on ' + this.state.name)
    
        switch (this.state.type) {
            case 'song':
                searchString = this.state.name
                searchTracks(searchString)
                    .then((data) => {
                        console.log('search results: ', data)
                        this.setState({
                            tracks: data.tracks.items
                        })
                    })
            break;
            case 'artist':
                searchString = 'artist:' + this.state.name
                searchTracks(searchString)
                    .then((data) => {
                        console.log('search results: ', data)
                        this.setState({
                            tracks: data.tracks.items
                        })
                    })
            break;
            case 'song+artist':
                // 'track:Alright artist:Kendrick Lamar'
                let parts = this.state.name.split(', ')
                let track = parts[0]
                let artist = parts[1]
                searchString = 'track:' + track + ' artist:' + artist
                searchTracks(searchString)
                    .then((data) => {
                        console.log('search results: ', data)
                        this.setState({
                            tracks: data.tracks.items
                        })
                    })
            break;
            case 'id':
                searchString = this.state.name
                getTrack(this.state.name)
                    .then((data) => {
                        console.log('ID: ', data)
                        this.setState({
                            tracks: data.tracks.items
                        })
                    })
            break;
            default:
                console.log('default case')
            break;
        }
        console.log('searchString: ' + searchString)
    }

    render() {
        return(
            <div>
                <SearchForm 
                    name={this.state.name} 
                    placeholder={this.state.placeholder}
                    type={this.state.type}
                    handleNameUpdate={this.handleNameUpdate} 
                    handleTypeUpdate={this.handleTypeUpdate} 
                    handleSearch={this.handleSearch} />
                    { console.log('tracks: ', this.state.tracks) }
                    <TrackList tracks={this.state.tracks} />
            </div>
        )
    }
}

export default SearchContainer