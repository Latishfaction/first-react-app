import React from "react";
import { useEffect,useState } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";


// http://www.omdbapi.com/?i=tt3896198&apikey=6f8f4316
const apikey = "6f8f4316";
const URL_API = `http://www.omdbapi.com/?i=tt3896198&apikey=${apikey}`;


const App=()=>{
    const [movies,setmovies]=useState([]);
    const [searchTerm,setSearchTerm] =useState("");
    
    const searchMovies = async(title)=>{
        const response = await fetch(`${URL_API}&s=${title}`);
        const data = await response.json();
        setmovies(data.Search);
    }
    useEffect(()=>{
        searchMovies(searchTerm);
    },[])

    return(
        <div className="app">
            <h1>MovieLand</h1>

            <div className="search">
                <input 
                    placeholder="Search for Movies"
                    value={searchTerm}
                    onChange={(e)=>{
                        setSearchTerm(e.target.value);
                    }}
                />
                <img 
                    src={SearchIcon}
                    alt="SearchIcon"
                    onClick={ ()=>{searchMovies(searchTerm)}}
                />
            </div>
            
            {
                movies.length>0?
                (
                <div className="container">
                    {
                        movies.map((movie)=>(
                            <MovieCard movie={movie} />
                        ))
                    }
                </div>

                ):
                (
                    <div className="empty">
                        <h2>No movies found.</h2>
                    </div>
                )
            }
        </div>
    )
}

export default App;