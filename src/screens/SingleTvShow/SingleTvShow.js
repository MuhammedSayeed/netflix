import axios from 'axios';
import React, { useState } from 'react'
import './SingleTvShow.scss'
import YouTube from 'react-youtube';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Navbar from '../../Navbar/Navbar';

function SingleTvShow() {
    const [tvDetails, setTvDetails] = useState({});
    const [videToken, setVideoToken] = useState();
    const [showVid, setShowVid] = useState(false);
    const [selectedmovie, setSelectedMovie] = useState();


    let { movieId } = useParams();

    async function getSingleMovie(idMovie) {
        const { data } = await axios.get(`https://api.themoviedb.org/3/tv/${idMovie}?api_key=e2c7e2bffd34a508df0d5cb1690b0e45&language=en-US&append_to_response=videos`);
        setTvDetails(data);
        return data;

    }

    const selectMovie = async () => {
        const movie = await getSingleMovie(movieId);
        setSelectedMovie(movie);
        console.log(movie)
    }

    const renderTrailer = async () => {
        await selectMovie();
        const trailer = await selectedmovie.videos.results.find(vid => vid.name === 'Official Trailer');
        setVideoToken(trailer.key);
        setShowVid(true);

    }

    useEffect(
        () => {
            getSingleMovie(movieId);
        }, [])
    return <>

        <Navbar />

        <div className="container-fluid d-flex justify-content-center align-items-center">
            {/* trailer */}

            {
                showVid && <>
                    <div className='youtube-video'>

                        <div className='youtube-container'>
                            <div className='youtube-video-close'>
                                <p>Close Trailer</p>
                                <div className="icon-close">
                                    <i onClick={() => { setShowVid(!showVid) }} className="fa-solid fa-xmark" ></i>
                                </div>

                            </div>
                            <YouTube videoId={videToken} /></div>
                    </div>

                </>
            }
            <div className="single-movie">
                <div className="moviePoster">
                    <img src={'https://image.tmdb.org/t/p/w500/' + tvDetails?.poster_path} alt={tvDetails.id} />
                </div>
                <div className="movie-Info">
                    <div className="movieTitle">
                        <h2>{tvDetails.title}</h2>
                    </div>
                    <div className="movie-tagline">
                        <p>{tvDetails.tagline}</p>
                    </div>
                    <div className="genres">
                        {tvDetails.genres?.map((gerne, idx) => {
                            return <span key={idx}>{gerne.name}</span>

                        })}

                    </div>
                    <div className="vote">
                        <p>Vote : {Math.ceil(tvDetails.vote_average)}</p>

                    </div>
                    <div className="relase-date">
                        <p>Relase date : {tvDetails.release_date} </p>
                    </div>
                    <div className="overview">
                        <p>{tvDetails.overview}</p>
                    </div>
                    <div className="btns">
                        <button onClick={() => { renderTrailer() }} className='trailer'>trailer <i className="fa-solid fa-play"></i></button>
                        
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default SingleTvShow;