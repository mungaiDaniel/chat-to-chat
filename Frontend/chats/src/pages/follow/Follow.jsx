
import FollowButton from '../../components/followButton/FollowButton'
import React, { useState , useEffect } from 'react'
import axios from 'axios'


const Follow = () => {

    const[users, setUser] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        axios.get("http://127.0.0.1:5000/api/v1/user")
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
        {
            users.map((user) =>{
                return <div className='post'>
        <div className="postTop">
          <div className="postTopLeft">
            <img
              className="postProfileImg"
              src={user.personPic}
              alt=""
            />
            <span className="postUsername">
              {user.name}
            </span>
            <span className="postDate">{user.date_created}</span>
          </div>
          <div className="postTopRight">
          <FollowButton key={user.id} user_id={user.id} user={user} />
          </div>
        </div>
        </div>
                
            })
            }
    </>
  )
}

export default Follow