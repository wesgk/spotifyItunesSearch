import React, { PropTypes } from 'react'

const styles = require('../styles')

function SingleTrack ({track}) {
    return (
    <div>
        <ul className="list-unstyled">
            <li><img style={styles.img} src={track.album.images[0].url} /></li>
            <li>
                <dl>
                    <dt>Artist</dt>
                    <dd><a href={track.artists[0].href} target="_blank">{track.artists[0].name}</a></dd>
                    <dt>Track name</dt>
                    <dd><a href={track.href} target="_blank">{track.name}</a></dd>
                    <dt>Album name</dt>
                    <dd><a href={track.album.href} target="_blank">{track.album.name}</a></dd>
                </dl>
            </li>
        </ul>
    </div>)
}

export default SingleTrack

SingleTrack.propTypes = {
    track: PropTypes.object,
}