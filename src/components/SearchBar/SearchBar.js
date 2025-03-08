import React, {useState, useCallback} from 'react';

import './SearchBar.css';
function SearchBar(props) {

    const [entry, setEntry] = useState("");
    const search = useCallback(() => {props.onSearch(entry)}, [entry, props.onSearch]);

    function handleEntryChange(event)
    {
        setEntry(event.target.value);
    }
    const text = "";
    return (<div className="SearchBar">
        <input onChange={handleEntryChange}></input>
    <button onClick={search}>Search</button>
    </div>);
}

export default SearchBar;