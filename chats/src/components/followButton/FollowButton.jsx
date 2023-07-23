import React, { useState } from 'react'
import httpClient from '../../httpClient';
import axios from 'axios';

const FollowButton = ({user}) => {

    const initialFollowState = localStorage.getItem('token')

    const [isFollowing, setIsFollowing] = useState(false);

    const HandleFollow = async () => {
       await axios
       .post(`https://chat-fs55.onrender.com/api/v1/follow/${user.id}`,{},
        {
          headers:
        {
            Authorization : `Bearer ${localStorage.getItem("token")}`
        }
          }
      
        ).then((res) => {

            setIsFollowing()
        }).catch((err) =>{
            console.log(err)
          })
    }

    const HandleUnFollow = async () => {
        await httpClient
        .post(`https://chat-fs55.onrender.com/api/v1/unfollow/${user.id}`,{},{
        headers:
      {
          Authorization : `Bearer ${localStorage.getItem("token")}`
      }
        }).then((res) => {
            setIsFollowing(false)
        }).catch((err) =>{
            console.log(err)
          })
    }
  return (
    <div>
    {isFollowing ? (
      <button className='btn' onClick={HandleUnFollow} >Unfollow</button>
    ) : (
      <button className='btn' onClick={HandleFollow}>Follow</button>
    )}
  </div>
  )
}

export default FollowButton