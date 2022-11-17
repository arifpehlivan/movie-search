import axios from 'axios';
import React, { useState } from 'react'
import { Context, useContext } from '../context';
import "./search.css";

const Search = () => {
    const { text, setText } = useContext(Context);
    const [historyText,setHistoryText] = useState("");
    const handleText = e => {
        setText(e.target.value);
    }
    const handleHistory = () =>{
        setHistoryText(text);
        const deleteCache = async () => {
            await axios.get(`http://localhost:3000/api/clear/`);
        }
        setTimeout(deleteCache,30000)
    }
    console.log("historyText",historyText);
    return (
        <div className="search">
            <input type="text" placeholder='Search movie' onChange={handleText} />
            <button onClick={handleHistory}>Search</button>
        </div>
    )
}

export default Search