import axios from '../Axios/axios';
import React, { useRef, useEffect, useState } from 'react'
import './Row.scss'
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper";
import "swiper/css/navigation";
import { Link } from 'react-router-dom';

function Row({ title, fetchUrl}) {

    const baserUrl = "https://image.tmdb.org/t/p/original";
    const [movies, setMovies] = useState([]);



   


    function truncate(string, n) {
        return string?.length > n ? string.substr(0, n - 1) + '...' : string;
    }



    useEffect(() => {

        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);



            return request;
        }
        fetchData();
    }, [fetchUrl]);





    return (
        <>

            <div className="container-fluid ">
                <h2>{title}</h2>
                <Swiper
                    slidesPerView={5}
                    spaceBetween={70}
                    navigation={true} modules={[Navigation]} className="mySwiper"
                    loop={true}
                    loopFillGroupWithBlank={true}

                    breakpoints={{
                        // when window width is >= 400
                        400: {
                            width: 320,
                            slidesPerView: 1,
                        },
                        // when window width is >= 500
                        500: {
                            width: 320,
                            slidesPerView: 1,
                        },
                        // when window width is >= 768px
                        768: {
                            width: 700,
                            slidesPerView: 2,
                        },
                        875: {
                            width: 1100,
                            slidesPerView: 3,
                        },
                    }}
                >

                    {movies.map((movie, i) => {
                        return <>

                            <SwiperSlide key={i}  >

                                <Link   to={'/SingleMovie/' + movie.id}>

                                    <div className="posterOfMovie" >
                                        <img src={`${baserUrl}${movie.backdrop_path}`} alt={`movie${movie.id}`} />
                                        <div className="overlay-black">
                                            <div className="content-name">
                                                <h5>{movie.title || movie.name}</h5>
                                                <p>{truncate(movie.overview, 35)}</p>
                                            </div>
                                        </div>
                                    </div>

                                </Link>

                            </SwiperSlide>


                        </>
                    })}

                </Swiper>

            </div>

        </>




    )
}

export default Row;