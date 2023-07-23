import React, { useState } from 'react'
import httpClient from '../../httpClient';

const FollowButton = ({user_id}) => {

    const [isFollowing, setIsFolloing] = useState(false);

    const HandleFollow = async () => {
        await httpClient
        .post(`http://127.0.0.1:5000/api/v1/follow/${user_id}`,{
        headers:
      {
          Authorization : `Bearer ${localStorage.getItem("token")}`
      }
        }).then((res) => {
            setIsFolloing(false)
        }).catch((err) =>{
            console.log(err)
          })
    }

    const HandleUnFollow = async () => {
        await httpClient
        .post(`http://127.0.0.1:5000/api/v1/unfollow/${user_id}`,{
        headers:
      {
          Authorization : `Bearer ${localStorage.getItem("token")}`
      }
        }).then((res) => {
            setIsFolloing(false)
        }).catch((err) =>{
            console.log(err)
          })
    }
  return (
    <div>
    {isFollowing ? (
      <button onClick={HandleUnFollow} >Unfollow</button>
    ) : (
      <button onClick={HandleFollow}>Follow</button>
    )}
  </div>
  )
}

export default FollowButton