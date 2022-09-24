import React, { useState } from 'react'
import SignUpScreen from '../SignUpScreen/SignUpScreen';
import './LoginScreen.scss'
function LoginScreen() {

    const [signIn, setSignIn] = useState(false);
    return (

        <div className='loginScreen'>
            <div className="loginScreen_backGround">
                <img className='logoScreen_logo' src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="logo" />
                <button className='loginScreen_button' onClick={() => setSignIn(true)} >
                    Sign In
                </button>

                <div className="loginScreen_gradient">
                </div>

                <div className="loginScreen_body">

                    {signIn ?
                        (
                            <SignUpScreen/>
                        )
                        :
                        <>
                            <h1>Unlimited movies, TV shows, and more.</h1>
                            <h3>Watch anywhere. Cancel anytime.</h3>
                            <h4>Ready to watch? Enter your email to create or restart your membership.</h4>

                            <div className="loginScreen_input">
                                <form >
                                    
                                    <button onClick={() => setSignIn(true)} className='loginScreen_getStarted' >GET STARTED</button>
                                </form>
                            </div>
                        </>}


                </div>

            </div>
        </div>
    )
}

export default LoginScreen