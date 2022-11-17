import React, { useEffect, useState } from 'react'
import axios from "axios";
import "./movies.css";

const Movies = ({ text }) => {
    const [movieData, setMovieData] = useState([])
    useEffect(() => {
        if (text?.length > 2) {
            const fetchData = async () => {
                const data = await axios.get(`http://localhost:3000/api/search/${text}`);
                setMovieData(data.data.Search);
            }
            fetchData();
        }
    }, [text])

    return (
        <div className='container'>
            {movieData?.map((movie) => {
                return (
                    <div key={movie.imdbID} >
                        <img src={movie.Poster} alt="" />
                        <p>{movie.Title}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Movies