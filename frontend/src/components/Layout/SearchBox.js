import React, { useState } from "react";
import Navbar from "./Navbar";

import "../../styles/SearchBox.css";

function SearchBox() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="div-control">
      <input
        
        placeholder="Type to search..."
        onChange={(event) => setSearchValue(event.target.value)}
      ></input>
    </div>
  );
}

export default SearchBox;
