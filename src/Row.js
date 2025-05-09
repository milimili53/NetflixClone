import React, {useState, useEffect} from 'react';
import axios from './axios';
import './Row.css';
import Youtube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({title, fetchUrl, isLargeRow}) {
    
    const [movies, setMovies] = React.useState([]);
    const [trailerUrl, setTrailerUrl] = React.useState("");

    useEffect(() => {
        // if [], run once when the row loads and don't run again
        // if [movies], run once when the row loads and every time movies changes
        // if [title], run once when the row loads and every time title changes
        
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    
    }, [fetchUrl])

    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
          // https://developers.google.com/youtube/player_api_reference#Parameters
          autoplay: 1,
        },
      };

    const handleClick = (movie) => {
        if(trailerUrl) {
            setTrailerUrl("");
        } else {
            movieTrailer(movie?.name || '')
            .then(url => {
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get('v'));
            }).catch(error => console.log(error));
        }
    }


    console.log(movies);
  
    return (
    <div className='row'>
        <h2>{title}</h2>
        
        <div className='row_posters'>
            {movies.map(movie => {
               return <img 
               key={movie.id} 
               onClick={() => handleClick(movie)}
               className={`row_poster ${isLargeRow && "row_posterLarge"}`} 
               src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
               alt={movie.name} />
            })}
        </div>
          { trailerUrl &&  <Youtube videoId={trailerUrl} opts={opts}  /> }
    </div>
  )
}

export default Row