import React, { PropTypes } from 'react'

const styles = require('../styles')

function SingleTrack ({track}) {

    if(track) {
        const image = track.album ? track.album.images[0].url : 'data:text/plain;charset=utf-8;base64,TWlzc2luZyBJbWFnZQ=='
        const artistHref = track.artists ? track.artists[0].href : '#'
        const artistName = track.artists ? track.artists[0].name : 'Missing'
        return (
        <div>
            <ul className="list-unstyled">
                <li><img style={styles.img} src={image} /></li>
                <li>
                    <dl>
                        <dt>Artist</dt>
                        <dd><a href={artistHref} target="_blank">{track.artists[0].name}</a></dd>
                        <dt>Track name</dt>
                        <dd><a href={track.track.href} target="_blank">{track.track.name}</a></dd>
                        <dt>Album name</dt>
                        <dd><a href={track.album.href} target="_blank">{track.album.name}</a></dd>
                    </dl>
                </li>
            </ul>
        </div>)
    } else {
        return (
            <div><img src="data:text/plain;charset=utf-8;base64,TWlzc2luZyBJbWFnZQ==" /></div>
        )
    }
}

export default SingleTrack

SingleTrack.propTypes = {
    track: PropTypes.object,
}