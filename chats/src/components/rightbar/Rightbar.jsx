import "./rightbar.css";
import { Users } from "../../helperData";
import Online from "../online/Online";
import { Cake } from "@material-ui/icons";
import React, { useState , useEffect } from 'react'
import axios from 'axios'

export default function Rightbar({ profile }) {

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
  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <Cake className="birthdayImg" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src="assets/ad.png" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">New York</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">Madrid</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">Single</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {
            users.map((user) =>{
              return  <div className="rightbarFollowing">
              <img
                src={user.personPic}
                alt=""
                className="rightbarFollowingImg"
              />
              <span className="rightbarFollowingName">{user.name}</span>
            </div>
          
            })
          }
          </div>
         
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {profile ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}