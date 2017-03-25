import React, { PropTypes } from 'react'
import SingleTrack from './SingleTrack'

const styles = require('../styles')

function TrackList ({ tracks }) {
    { console.log('TrackList: ' + tracks) }
    return (
    <div>
        <ul className="list-unstyled">
            <li>
                { tracks.map( track => ( <SingleTrack track={track} /> ) ) }
            </li>
        </ul>
    </div>
    )
}

export default TrackList

TrackList.propTypes = {
    tracks: PropTypes.array,
}