import React, {useState, useCallback} from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import PlayList from "./components/PlayList/PlayList";
import SearchResults from './components/SearchResults/SearchResults';
import Spotify from './APIWork/Spotify';



function App() {
    const [playListTracks, setPlayListTracks] = useState([]);
    const [playListTitle, setPlayListTitle] = useState("");
    const [results, setResults] = useState([]);

    const addSongToPlaylist = (track) => {
        if(playListTracks.find((ttrack) => ttrack.id === track.id)=== undefined) {
            setPlayListTracks((prevTracks) => [...prevTracks, track]);
        }
    };

    const removeSongFromPlaylist = (track) => {
        setPlayListTracks((prevTracks) => prevTracks.filter((ttrack) => ttrack.id !== track.id));
    };

    const updatePlaylistTitle = (title) => {
        setPlayListTitle(title);
    }

    const search = useCallback( async (term) => {
        const theTracks = await Spotify.search(term);
        setResults(theTracks);
    }, []);

    const savePlaylist = async () => {
        const trackUris = playListTracks.map((track) => track.uri);
        await Spotify.savePlaylist(playListTitle, trackUris);
        setPlayListTitle("New PlayList");
        setPlayListTracks([]);
    }
  return (

    <div className="App">
        <div className="App-header">
            <h1 className="App-Title">Jammming</h1>
        </div>
      <SearchBar onSearch={search}/>
        <div className="container">
            <div className="SearchResults">
      <SearchResults results={results} onAdd={addSongToPlaylist} className="SearchResults" />
            </div>
            <div className="Playlist">
      <PlayList tracks={playListTracks} onRemove={removeSongFromPlaylist} title={playListTitle } onTitleChange={updatePlaylistTitle} className="Playlist" onSave={savePlaylist}/>
            </div>
        </div>
    </div>

  );
}

export default App;
