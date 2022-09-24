import axios from 'axios'
import React, { useEffect, useState  } from 'react';

import Navbar from '../../Navbar/Navbar'
import YouTube from 'react-youtube';
import './Movies.scss';
import { Link } from 'react-router-dom';


function Movies() {



    const [movies, setMovies] = useState([]);
    const [show, setShow] = useState(false);
    const [selectedmovie, setSelectedMovie] = useState();
    const [videToken, setVideoToken] = useState();
    const [showVid, setShowVid] = useState(false);
    const [activeList, setActiveList] = useState([1]);
    const [genreClick, setGenreClick] = useState(false);
    const [currentGenre, setCurrentGenre] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchKey, setSearchKey] = useState("");
    const [searchresult, setSearchSult] = useState([]);
  

    let nums = new Array(15).fill(1).map((elem, index) => index + 1);


    async function getMovies(pageNumber, genre) {
        const { data } = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=e2c7e2bffd34a508df0d5cb1690b0e45&language=en-US&region=US&sort_by=popularity.desc&with_genres=${genre}&include_adult=false&include_video=true&page=${pageNumber}`);
        setMovies(data.results);


    }

    async function searchMovie() {
        const { data } = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=e2c7e2bffd34a508df0d5cb1690b0e45&language=en-US&region=US&language=en-US&page=1&include_adult=false&query=${searchKey}`);
        setSearchSult(data.results);
    }


    const fetchMovie = async (id) => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=e2c7e2bffd34a508df0d5cb1690b0e45&language=en-US&append_to_response=videos`);
        return data;
    }

    const selectMovie = async (id) => {
        const movie = await fetchMovie(id);
        setSelectedMovie(movie);
        console.log(movie)
    }

    const showHeroBannerDetails = async (id) => {
        await selectMovie(id);
        setShow(true);

    }

    const renderTrailer = () => {

        const trailer = selectedmovie.videos.results.find(vid => vid.name === 'Official Trailer');
        setVideoToken(trailer.key);
        setShowVid(true);

    }

    

    const setActive = (index) => {

        activeList.length = 0;
        activeList.push(index);

    }
    const handleGenrePagenation = async (page, genre) => {
        await getMovies(page, genre);
        setCurrentGenre(genre);
        setGenreClick(true);
        console.log(currentGenre);
    }
    const handlePaginate = async (index) => {
        if (genreClick) {
            await getMovies(index, currentGenre);
            setActive(index);
            setCurrentPage(index);
        }
        else {
            await getMovies(index);
            setActive(index);
            setCurrentPage(index);


        }
    }

    const paginateNext = async () => {

        if (genreClick) {
            setActive(currentPage + 1);
            await getMovies(currentPage + 1, currentGenre);

            setCurrentPage(currentPage + 1);
        }
        else {
            setActive(currentPage + 1);
            await getMovies(currentPage + 1);
            setCurrentPage(currentPage + 1);


        }

    }

    const paginatePrev = async () => {

        if (genreClick) {
            setActive(currentPage - 1);
            await getMovies(currentPage - 1, currentGenre);

            setCurrentPage(currentPage - 1);
        }
        else {
            setActive(currentPage - 1);
            await getMovies(currentPage - 1);
            setCurrentPage(currentPage - 1);


        }

    }



    useEffect(() => {
        getMovies(1);

    }, []);

     useEffect (  ()  =>  {

        searchMovie();

    }, [searchKey])


    return <>

        <Navbar />

        <div className='container pt-5 ' >

            <div className="search_and_genres">

                <div className="genres-select ">
                    <div onClick={() => handleGenrePagenation(1, 28)} className="genre"><p>Action</p></div>
                    <div onClick={() => handleGenrePagenation(1, 12)} className="genre"><p>Adventure</p></div>
                    <div onClick={() => handleGenrePagenation(1, 16)} className="genre"><p>Animation</p></div>
                    <div onClick={() => handleGenrePagenation(1, 35)} className="genre"><p>Comedy</p></div>
                    <div onClick={() => handleGenrePagenation(1, 80)} className="genre"><p>Crime</p></div>
                    <div onClick={() => handleGenrePagenation(1, 18)} className="genre"><p>Drama</p></div>
                    <div onClick={() => handleGenrePagenation(1, 10751)} className="genre"><p>Family</p></div>
                    <div onClick={() => handleGenrePagenation(1, 14)} className="genre"><p>Fantasy</p></div>
                    <div onClick={() => handleGenrePagenation(1, 36)} className="genre"><p>History</p></div>
                    <div onClick={() => handleGenrePagenation(1, 27)} className="genre"><p>Horror</p></div>
                    <div onClick={() => handleGenrePagenation(1, 10402)} className="genre"><p>Music</p></div>
                    <div onClick={() => handleGenrePagenation(1, 10749)} className="genre"><p>Romance</p></div>
                    <div onClick={() => handleGenrePagenation(1, 10752)} className="genre"><p>War</p></div>
                </div>

                <div className="search-container">
                    <div className="search-element ">
                        <div className="seachBar-container">
                            <input type="text" placeholder={`What's in your mind?`} onChange={(e) => setSearchKey(e.target.value)} />
                            <button><i className="fa-solid fa-magnifying-glass"></i></button>
                        </div>

                        <div className="searchList">
                            {
                                searchresult ?
                                    <>
                                        {
                                            searchresult.map((search, i) => {
                                                return (

                                                    <Link  key={i} to={'/SingleMovie/'+search.id}>

                                                        <div className="search-list-item">
                                                            <div className="search-item-thumbnail">
                                                                <img src={`https://image.tmdb.org/t/p/original${search.backdrop_path}`} />
                                                            </div>
                                                            <div className="search-item-info">
                                                                <h3>{search.title}</h3>
                                                            </div>
                                                        </div>
                                                    </Link>

                                                )
                                            })
                                        }
                                    </>
                                    :
                                    ""
                            }

                        </div>
                    </div>

                </div>



            </div>



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



            {/* Banner of movie */}

            {
                show &&
                <div className='overlay-bigBanner'>
                    <div className="BigBanner"
                        style={{
                            backgroundImage: `url('https://image.tmdb.org/t/p/original${selectedmovie.backdrop_path}')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center center'

                        }}>

                        <div className='Movie-window-close'>
                            <p>Close Movie</p>
                            <div className="icon-close-window">
                                <i onClick={() => { setShow(!show) }} className="fa-solid fa-xmark" ></i>
                            </div>
                        </div>

                        <div className="banner_fade"></div>
                        <div className="movieInfo ">
                            <h2>{selectedmovie.title}</h2>
                            <p>{selectedmovie.tagline}</p>
                            <div className="genres">
                                {selectedmovie.genres?.map((genre, idx) => {
                                    return (
                                        <span key={idx}> {genre.name}</span>
                                    )
                                })}

                            </div>
                            <div className="rating">
                                <p>Rate : {Math.round(selectedmovie.vote_average * 10) / 10}</p>
                            </div>
                            <div className="overview">
                                <p>{selectedmovie.overview}</p>
                            </div>
                            <div className="btns">
                                <button onClick={renderTrailer} className='trailer'>trailer <i className="fa-solid fa-play"></i></button>
                                <button  className='fav'>Add to favourite <i className="fa-regular fa-heart"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            }


            {/* rows of movies */}

            {
                movies ?
                    <>

                        <div className="row   ">
                            {
                                movies.slice(0, 18).map((movie, i) => {
                                    return (
                                        <div className="col-md-4 col-lg-2 my-3 " key={i}>
                                            <div>
                                                <div className='movie-poster ' onClick={() => { showHeroBannerDetails(movie.id) }}>
                                                    <img className='w-100' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="movie_img" />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>

                    </>
                    :
                    <div className='w-100 vh-100 d-flex justify-content-center align-items-center'><i className='fas fa-spin fa-spinner text-bg-danger '></i></div>
            }

            {/* pagination */}

            <nav aria-label="...">
                <ul className="pagination paginationwrap justify-content-center my-2  ">
                    <li className="page-button" onClick={() => { paginatePrev() }}>
                        <a className="page-link-button">Previous</a>
                    </li>

                    {nums.map((elem, index) => {
                        return (
                            <li key={index} className={activeList.includes(elem) ? "page-item active " : "page-item "} onClick={() => { handlePaginate(elem) }}>
                                <span className="page-link">
                                    {index + 1}
                                </span>
                            </li>
                        )
                    })}

                    <li className="page-button" onClick={() => { paginateNext() }} >
                        <a className="page-link-button">Next</a>
                    </li>
                </ul>
            </nav>



        </div>
    </>
}

export default Movies