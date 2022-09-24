import React, { useEffect, useState } from 'react'
import './Banner.scss'
import axios from '../Axios/axios';
import requests from '../requests/Requests';
import { Link } from 'react-router-dom';
import YouTube from 'react-youtube';


function Banner() {
    const baserUrl = "https://image.tmdb.org/t/p/original";
    const [movie, setMovie] = useState([]);
    const [videToken, setVideoToken] = useState();
    const [showVid, setShowVid] = useState(false);
    const [selectedmovie, setSelectedMovie] = useState();

    async function fetchData() {
        const request = await axios.get(requests.fetchTrending);
        setMovie(request.data.results[Math.floor(Math.random() * request.data.results.length - 1)]);
        return request;
    }

    async function getSingleMovie() {
        const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=e2c7e2bffd34a508df0d5cb1690b0e45&language=en-US&append_to_response=videos`);
        return data;

    }

    const selectMovie = async () => {
        const movie = await getSingleMovie();
        setSelectedMovie(movie);
    }

    const renderTrailer = async () => {
        await selectMovie();
        const trailer = await selectedmovie.videos.results.find(vid => vid.name === 'Official Trailer');
        setVideoToken(trailer.key);
        setShowVid(true);

    }


    useEffect(() => {

        fetchData();



    }, []);





    function truncate(string, n) {
        return string?.length > n ? string.substr(0, n - 1) + '...' : string;
    }


    return (
        <>

            {
                showVid && <>
                    <div className='youtube-video'>

                        <div className='youtube-container'>
                            <div className='youtube-video-close'>
                                <p>Close Trailer</p>
                                <div className="icon-close">
                                    <i onClick={() => { setShowVid(!showVid) }} class="fa-solid fa-xmark" ></i>
                                </div>

                            </div>
                            <YouTube videoId={videToken} /></div>
                    </div>

                </>
            }
            <header className="banner" style={{
                backgroundSize: `cover`,

                backgroundImage:  `url('${baserUrl}${ movie?.backdrop_path}')`,
                backgroundPosition: 'center center',

            }}
            >

                <div className="banner_contents">
                    <h1 className="banner_tittle">{movie?.name || movie?.title || movie?.original_name}</h1>
                    <div className="banner_buttons">
                        <button onClick={() => { renderTrailer() }} className='banner_button'>Play Trailer</button>
                        <Link to={'/SingleMovie/' + movie?.id}><button className='banner_button'>More</button></Link>

                    </div>
                    <h1 className="banner_desc">
                        {truncate(movie?.overview, 200)}
                    </h1>
                </div>


                <div className="banner_fade"></div>
                <div className="banner_overlay"></div>

            </header>
        </>
    )
}

export default Banner