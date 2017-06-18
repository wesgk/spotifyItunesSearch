import React, { Component, PropTypes } from 'react'

const styles = require('../styles')

class SearchForm extends Component {
    constructor(props) {
        super();
    }

    render() {
        return (
            <div>
                <h3>Search</h3>
                <p>
                    <select name="service" onChange={this.props.handleServiceUpdate}>
                        <option value="itunes">iTunes</option>
                        <option value="spotify">Spotify</option>
                    </select>
                </p>
                <p>
                    <select name="type" onChange={this.props.handleTypeUpdate}>
                        <option value="song">Song Title</option>
                        <option value="artist">Artist Name</option>
                        <option value="song+artist">Song Title &amp; Artist Name</option>
                    </select>
                </p>
                <p>
                    <input type="text" 
                        name="name" 
                        placeholder={this.props.placeholder} 
                        value={this.props.name} 
                        onChange={this.props.handleNameUpdate} 
                        ref="searchField"
                        style={styles.textfield} />
                </p>
                <div style={styles.errorMessage}>
                    {this.props.statusMessage}
                </div>
                <p>
                    <button name="submit" onClick={this.props.handleSearch}>Search</button>
                </p>
            </div>
        )
    }
}

SearchForm.propTypes = {
    name: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    statusMessage: PropTypes.string,
    handleServiceUpdate: PropTypes.func.isRequired,
    handleNameUpdate: PropTypes.func.isRequired,
    handleTypeUpdate: PropTypes.func.isRequired,
    handleSearch: PropTypes.func.isRequired,
}

export default SearchForm