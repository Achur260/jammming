import React, {useState, useCallback} from 'react';

import './SearchBar.css';
function SearchBar(props) {

    const [entry, setEntry] = useState("");
    const searchProp = props.onSearch;
    const search = useCallback(() => {props.onSearch(entry)}, [entry, searchProp]);

    function handleEntryChange(event)
    {
        setEntry(event.target.value);
    }

    return (<div className="SearchBar">
        <input onChange={handleEntryChange}></input>
    <button onClick={search}>Search</button>
    </div>);
}

export default SearchBar;