import React, { useState } from "react";
import Navbar from "./Navbar";

import "../../styles/SearchBox.css";

function SearchBox() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="div-control">
      {/* <input
        placeholder="Type to search..."
        onChange={(event) => setSearchValue(event.target.value)}
      ></input> */}
      <form action="/" method="get">
        <label htmlFor="header-search">
            <span className="visually-hidden">Search candles</span>
        </label>
        <input
            type="text"
            id="header-search"
            placeholder="Search candles"
            name="s" 
        />
        <button type="submit">Search</button>
    </form>
    </div>
  );
}

export default SearchBox;
