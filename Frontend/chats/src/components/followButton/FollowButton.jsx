import React, { useState } from 'react'
import httpClient from '../../httpClient';

const FollowButton = ({user}) => {

    const [isFollowing, setIsFollowing] = useState(false);

    const HandleFollow = async () => {
       const resp =  await httpClient.post(`http://127.0.0.1:5000/api/v1/follow/${user.id}`,
        {
          headers:
        {
            Authorization : `Bearer ${localStorage.getItem("token")}`
        }
          }
      
        ).then((res) => {
            setIsFollowing(true)
        }).catch((err) =>{
            console.log(err)
          })
    }

    const HandleUnFollow = async () => {
        await httpClient
        .post(`http://127.0.0.1:5000/api/v1/unfollow/${user.id}`,{
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
      <button className='btn-primary' onClick={HandleUnFollow} >Unfollow</button>
    ) : (
      <button className='btn-primary' onClick={HandleFollow}>Follow</button>
    )}
  </div>
  )
}

export default FollowButton