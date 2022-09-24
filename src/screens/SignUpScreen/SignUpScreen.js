import React, { useRef } from 'react'
import { auth } from '../../firebase';
import './SignUpScreen.scss'
function SignUpScreen() {

  const emailRef = useRef(null);
  const passwordRef = useRef(null);


  const register = (e) => {
    e.preventDefault();
    auth.createUserWithEmailAndPassword(
      emailRef.current.value,
      passwordRef.current.value
    ).then((authUser) => {
      console.log(authUser);

    }).catch((error) => {
      alert(error.message);
    })
  }



  const signIn = (e) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(
      emailRef.current.value,
      passwordRef.current.value
    ).then((authUser) => {
      console.log(authUser);
    }).catch((error) => {
      alert(error.message)
    })
  }

  return (
    <div className='signUp_screen'>
      <form >
        <h1>Sign In</h1>
        <input ref={emailRef} placeholder='Email' type='email' />
        <input ref={passwordRef} placeholder='Password' type='Password' />
        <button type='submit' onClick={(e) => { signIn(e) }} >Sign In</button>
        <h4>
          <span className='signUp_screen_gray'>New to Netflix? </span>
          <span className='signUp_screen_link' onClick={(e) => { register(e) }} >Sign Up now.</span>
        </h4>
      </form>
    </div>
  )
}

export default SignUpScreen;