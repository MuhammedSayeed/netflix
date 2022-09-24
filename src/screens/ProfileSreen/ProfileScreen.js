import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/userSlice'
import { auth } from '../../firebase';
import Navbar from '../../Navbar/Navbar';
import './ProfileScreen.scss'

function ProfileScreen() {

    const user = useSelector(selectUser);
  return (
    <div className='profileScreen'>
        <Navbar isProfile />
        <div className="profilScreenBody">
            <h1>Edit Profile</h1>
            <div className="profileScreen_info">
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="" />
                <div className="profileScreen_details">
                    <h2>{user.email}</h2>
                    <div className="profileScreen_plans">
                        <h3>Plans</h3>
                        <p></p>
                        <button onClick={()=> auth.signOut()} className='profileScreen_signout'>Sign Out</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProfileScreen;