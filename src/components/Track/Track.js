import React from 'react';
import './Track.css';
function Track(props) {
    const name = props.name;
    const artist = props.artist;
    const album = props.album;
    const id = props.id;
    const uri = props.uri;

    function removeTrack(event) {

        const obj = {
            id: id,
            name: name,
            artist: artist,
            album: album,
            uri: uri
        };

        props.onRemove(obj);
    }

    function addTrack(event) {
        const obj = {
            id: id,
            name: name,
            artist: artist,
            album: album,
            uri: uri
        }

        props.onAdd(obj);
    }
    if(props.onRemove === null)
    {
        return (
            <div className="track">
                <div className="songInfo">
                <h1 className="name">{name}</h1>
                <h1 className="info">{album + " - " + artist}</h1>
                </div>
                <div className="button">
                <button className="change" onClick={addTrack}>+</button>
                </div>
            </div>
        );
    }
    else
    {
        return (
            <div className="track">
                <div className="songInfo">
                <h1 className="name">{name}</h1>
                <h1 className="info">{album + " - " + artist}</h1>
                </div>
                <div className="button">
                <button className="change" onClick={removeTrack}>-</button>
                </div>
            </div>
        );
    }
}
export default Track;

