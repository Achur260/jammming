import React from 'react';
import Track from '../Track/Track';
import './TrackList.css';


function TrackList(props) {

    const tracks = props.tracks;

    const tracksArray = (arr) => arr.map(track => {
        return (<Track id={track.id} name={track.name} album={track.album} artist={track.artist} uri={track.uri} onAdd={props.onAdd} onRemove={props.onRemove} />);
    });


    return (<div className="tracklist">
        {tracksArray(tracks)}
            </div>);

}
export default TrackList;