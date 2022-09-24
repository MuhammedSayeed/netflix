import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.scss'
function Navbar({ isProfile = false }) {

    const [showNav, HandleShowNav] = useState(false);


    const transitionNavbar = () => {
        if (window.scrollY > 100) {
            HandleShowNav(true);
        } else {
            HandleShowNav(false);
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", transitionNavbar);

    }, [])
    return (
        <>

            <nav className={`navbar navbar-expand-lg navbar_customize ${showNav && 'nav-bg'} `}>
                <div className="container-fluid nav-content">

                    <Link className="navbar-brand" to='/'>
                        <img className='netflix_logo'
                            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
                            alt="netflix-logo" />
                    </Link>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="fa-solid fa-bars"></i>
                    </button>


                    {isProfile ? "" :
                        <>

                            <div className="collapse navbar-collapse nav-links" id="navbarSupportedContent">

                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <Link to='/home' className="nav-link" >Home</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to='/movies' className="nav-link" >Movies</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to='/tvshow' className="nav-link" >TV Shows</Link>
                                    </li>

                                    
                                </ul>
                                <ul className="navbar-nav ms-auto mb-2 mb-lg-0  ">


                                    <div className="left-side me-lg-auto">



                                        <li className="avtar-logo">
                                            <Link className="nav-link active" aria-current="page" to='/profile'><img
                                                src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="netflix-avatar" />
                                            </Link>
                                        </li>


                                    </div>





                                </ul>

                            </div>



                        </>}

                </div>
            </nav>



        </>
    )
}

export default Navbar;