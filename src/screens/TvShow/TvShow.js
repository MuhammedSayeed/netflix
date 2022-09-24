
import './TvShow.scss';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from '../../Navbar/Navbar'
import YouTube from 'react-youtube';
import { Link } from 'react-router-dom';


function TvShow() {

    const [series, setSeries] = useState([]);
    const [show, setShow] = useState(false);
    const [selectedserie, setSelectedSerie] = useState();
    const [videToken, setVideoToken] = useState();
    const [showVid, setShowVid] = useState(false);
    const [activeList, setActiveList] = useState([1]);
    const [favList, setfavList] = useState([]);
    const [genreClick, setGenreClick] = useState(false);
    const [currentGenre, setCurrentGenre] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchKey, setSearchKey] = useState("");
    const [searchresult, setSearchSult] = useState([]);

    let nums = new Array(15).fill(1).map((elem, index) => index + 1);


    async function getSeries(pageNumber, genre) {
        const { data } = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=e2c7e2bffd34a508df0d5cb1690b0e45&language=en-US&region=US&sort_by=popularity.desc&with_genres=${genre}&include_adult=false&include_video=true&page=${pageNumber}`);
        setSeries(data.results);
    }

    async function searchSerie() {


        const { data } = await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=e2c7e2bffd34a508df0d5cb1690b0e45&language=en-US&page=1&include_adult=false&region=US&query=${searchKey}`);
        setSearchSult(data.results);


    }


    const fetchMovie = async (id) => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=e2c7e2bffd34a508df0d5cb1690b0e45&language=en-US&append_to_response=videos`);
        return data;
    }

    const selectMovie = async (id) => {
        const movie = await fetchMovie(id);
        setSelectedSerie(movie);
        console.log(movie)
    }

    const showHeroBannerDetails = async (id) => {
        await selectMovie(id);
        setShow(true);

    }

    const renderTrailer = () => {

        const trailer = selectedserie.videos.results.find(vid => vid.name === 'Official Trailer');
        setVideoToken(trailer.key);
        setShowVid(true);

    }


    const setActive = (index) => {

        activeList.length = 0;
        activeList.push(index);

    }
    const handleGenrePagenation = async (page, genre) => {
        await getSeries(page, genre);
        setCurrentGenre(genre);
        setGenreClick(true);
        console.log(currentGenre);
    }
    const handlePaginate = async (index) => {
        if (genreClick) {
            await getSeries(index, currentGenre);
            setActive(index);
            setCurrentPage(index);
        }
        else {
            await getSeries(index);
            setActive(index);
            setCurrentPage(index);


        }
    }

    const paginateNext = async () => {

        if (genreClick) {
            setActive(currentPage + 1);
            await getSeries(currentPage + 1, currentGenre);

            setCurrentPage(currentPage + 1);
        }
        else {
            setActive(currentPage + 1);
            await getSeries(currentPage + 1);
            setCurrentPage(currentPage + 1);


        }

    }

    const paginatePrev = async () => {

        if (genreClick) {
            setActive(currentPage - 1);
            await getSeries(currentPage - 1, currentGenre);

            setCurrentPage(currentPage - 1);
        }
        else {
            setActive(currentPage - 1);
            await getSeries(currentPage - 1);
            setCurrentPage(currentPage - 1);


        }

    }

    useEffect(() => {
        getSeries(1);

    }, []);

    useEffect(() => {

        searchSerie();

    }, [searchKey])


    return <>

        <Navbar />

        <div className='container pt-5 ' >

            <div className="search_and_genres">

                <div className="genres-select ">
                    <div onClick={() => handleGenrePagenation(1, 10759)} className="genre"><p>Action & Adventure</p></div>
                    <div onClick={() => handleGenrePagenation(1, 16)} className="genre"><p>Animation</p></div>
                    <div onClick={() => handleGenrePagenation(1, 35)} className="genre"><p>Comedy</p></div>
                    <div onClick={() => handleGenrePagenation(1, 80)} className="genre"><p>Crime</p></div>
                    <div onClick={() => handleGenrePagenation(1, 99)} className="genre"><p>Documentary</p></div>
                    <div onClick={() => handleGenrePagenation(1, 18)} className="genre"><p>Drama</p></div>
                    <div onClick={() => handleGenrePagenation(1, 10751)} className="genre"><p>Family</p></div>
                    <div onClick={() => handleGenrePagenation(1, 10765)} className="genre"><p> Fantasy</p></div>
                    <div onClick={() => handleGenrePagenation(1, 10762)} className="genre"><p>Kids</p></div>
                    <div onClick={() => handleGenrePagenation(1, 10768)} className="genre"><p>War</p></div>
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

                                                    <Link to={'/SingleMovie/'+search.id}>

                                                    <div className="search-list-item" key={i}>
                                                        <div className="search-item-thumbnail">
                                                            <img src={`https://image.tmdb.org/t/p/original${search.backdrop_path}`} />
                                                        </div>
                                                        <div className="search-item-info">
                                                            <h3 >{search.original_name}</h3>
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
                            backgroundImage: `url('https://image.tmdb.org/t/p/original${selectedserie.backdrop_path}')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center center'

                        }}>

                        <div className='Movie-window-close'>
                            <p>Close serie</p>
                            <div className="icon-close-window">
                                <i onClick={() => { setShow(!show) }} className="fa-solid fa-xmark" ></i>
                            </div>
                        </div>

                        <div className="banner_fade"></div>
                        <div className="movieInfo ">
                            <h2>{selectedserie.title}</h2>
                            <p>{selectedserie.tagline}</p>
                            <div className="genres">
                                {selectedserie.genres?.map((genre, idx) => {
                                    return (
                                        <span key={idx}> {genre.name}</span>
                                    )
                                })}

                            </div>
                            <div className="rating">
                                <p>Rate : {Math.round(selectedserie.vote_average * 10) / 10}</p>
                            </div>
                            <div className="overview">
                                <p>{selectedserie.overview}</p>
                            </div>
                            <div className="btns">
                                <button onClick={renderTrailer} className='trailer'>trailer <i className="fa-solid fa-play"></i></button>

                            </div>
                        </div>
                    </div>
                </div>
            }


            {/* rows of serie */}

            {
                series ?
                    <>

                        <div className="row   ">
                            {
                                series.slice(0, 18).map((serie, i) => {
                                    return (
                                        <div className="col-md-4 col-lg-2 my-3 " key={i}>
                                            <div>
                                                <div className='movie-poster ' onClick={() => { showHeroBannerDetails(serie.id) }}>
                                                    <img className='w-100' src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`} alt="movie_img" />
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

export default TvShow