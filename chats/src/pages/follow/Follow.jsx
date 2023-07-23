
import FollowButton from '../../components/followButton/FollowButton'
import React, { useState , useEffect } from 'react'
import axios from 'axios'
import Topbar from '../../components/topbar/Topbar'
import './follow.css'


const Follow = () => {

    const[users, setUser] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        axios.get("https://chat-fs55.onrender.com/api/v1/user")
        .then((response) =>{
        setUser(response.data.data)
        setIsLoading(false)
        })
    }, [])


    if (isLoading){
        return <h2>Loading....</h2>
    }
  return (
     <>
     <Topbar/>
        {
            users.map((user) =>{
                return <div className='postr container' key = {user.id}>
        <div className="postTopr">
          <div className="postTopLeftr">
            <img
              className="postProfileImgr"
              src={user.personPic}
              alt=""
            />
            <span className="postUsernamer">
              {user.name}
            </span>
            <span className="postDater">{user.date_created}</span>
          </div>
          <div className="postTopRightr">
          <FollowButton key={user.id} user={user} />
          </div>
        </div>
        </div>
                
            })
            }
    </>
  )
}

export default Follow