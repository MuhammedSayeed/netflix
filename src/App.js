
import './App.css';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import {
  Routes,
  Route,
  HashRouter,
  BrowserRouter
} from "react-router-dom";
import LoginScreen from './screens/Login/LoginScreen';
import { useEffect, useState } from 'react';
import { auth } from './firebase';
import {useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import ProfileScreen from './screens/ProfileSreen/ProfileScreen';
import Movies from './screens/Movies/Movies';
import TvShow from './screens/TvShow/TvShow';
import SingleMovie from './screens/SingleMovie/SingleMovie';
import SingleTvShow from './screens/SingleTvShow/SingleTvShow';



function App() {

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {

    const unSubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
       
        dispatch(login(
          {
            uid: userAuth.uid,
            email: userAuth.email
          }
        ))
      } else {

        dispatch(logout());

      }
    });

    return unSubscribe;
  }, [dispatch])





  return (
    <>
      <BrowserRouter >
        {!user ?
          <LoginScreen />
          :
        
          <Routes>
            <Route path='/profile'  element={<ProfileScreen />} />
            <Route path="/" element={<HomeScreen />} />
            <Route path="/home" element={<HomeScreen />} />
            <Route path="/movies" element={<Movies />}   />
            <Route path="/tvshow" element={<TvShow />} />
            <Route path='singleTv/:tvId/' element={<SingleTvShow/>}  />


            <Route path='singlemovie/:movieId' element={<SingleMovie />} />
          </Routes>
          
        }

      </BrowserRouter>
    </>
  );
}

export default App;
