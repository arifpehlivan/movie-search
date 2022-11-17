import { useState } from 'react';
import './App.css';
import Movies from './components/Movies';
import Search from './components/Search';
import { Context } from "./context.js";

function App() {
    const [text, setText] = useState("");
    const dataText = {
        text,
        setText
    }
    return (
        <Context.Provider value={dataText}>
            <Search />
            <Movies text={text} />
        </Context.Provider>
    );
}

export default App;
