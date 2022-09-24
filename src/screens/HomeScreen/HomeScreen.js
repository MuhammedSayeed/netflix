import React from 'react'
import Banner from '../../Banner/Banner'
import Navbar from '../../Navbar/Navbar'
import Row from '../../Row/Row'
import './HomeScreen.scss'
import requests from '../../requests/Requests'
function HomeScreen() {
  
  return (
    <>
      <Navbar  />
      <Banner  />
      <Row  title='Top Rated' fetchUrl={requests.fetchTopRated} />
      <Row  title='Action Movies' fetchUrl={requests.fetchActionMovies} />
      <Row  title='Comedy Movies' fetchUrl={requests.fetchComedyMovies} />
      <Row  title='Horror Movies' fetchUrl={requests.fetchHorrorMovies} />

    </>
  )
}

export default HomeScreen