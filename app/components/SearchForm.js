import React, { Component, PropTypes } from 'react'

var styles = require('../styles')

class SearchForm extends Component {
    constructor(props) {
        console.log('props from SearchForm: ', props)
        super();
    }

    render(props) {
        return (
            <div>
                <h3>Search</h3>
                <p>
                    <input type="text" 
                        name="name" 
                        placeholder={this.props.placeholder} 
                        value={this.props.name} 
                        onChange={this.props.handleNameUpdate} 
                        ref="searchField"
                        style={styles.textfield} />
                </p>
                <p>
                    <select name="type" onChange={this.props.handleTypeUpdate}>
                        <option value="song">Song Title</option>
                        <option value="artist">Artist Name</option>
                        <option value="song+artist">Song Title &amp; Artist Name</option>
                        <option value="id">Song ID</option>
                    </select>
                </p>
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
    handleNameUpdate: PropTypes.func.isRequired,
    handleTypeUpdate: PropTypes.func.isRequired,
    handleSearch: PropTypes.func.isRequired,
}

export default SearchForm