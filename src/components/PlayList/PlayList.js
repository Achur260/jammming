import React from 'react';
import TrackList from "../TrackList/TrackList";
import './PlayList.css';
function PlayList(props) {


    const {tracks, title} = props;

    function changeTitle(event) {
        props.onTitleChange(event.target.value);
    }


    return (
        <div className="playlist">
            <input onChange={changeTitle} className="playlistTitle" value={title} />
            <TrackList tracks={tracks} onRemove={props.onRemove} />
            <button className="save" onClick={props.onSave}>Save To Spotify</button>

        </div>
    );



}
export default PlayList;