import React from 'react';

import TrackList from '../TrackList/TrackList';
import './SearchResults.css';
function SearchResults(props) {
    const { results, onAdd } = props;

    return (
        <div className="searchContainer">
            <h1 className="searchTitle">Search Results</h1>
            <TrackList tracks={results} onAdd={onAdd} onRemove={null}/>
        </div>
    );

}
export default SearchResults;