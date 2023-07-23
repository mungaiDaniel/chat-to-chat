import React, { useState , useEffect } from 'react'
import axios from 'axios'
import { MoreVert , ThumbUpAlt, ThumbDownAlt } from "@material-ui/icons";

import './comments.css'

const OnePost = ({question_id}) => {

    const [posts, setPost] = useState([])
    const[users, setUser] = useState([])
    const [isLoading, setIsLoading] = useState(true)
  
    useEffect(() => {
      axios.get("http://127.0.0.1:5000/api/v1/user")
      .then((response) =>{
        setUser(response.data.data)
        setIsLoading(false)
      })
    }, [])

    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/api/v1/post/${question_id}`)
        .then((response) =>{
            setPost(response.data.data)
            setIsLoading(false)
        } )
    }, [] )
    if (isLoading){
        return <h2>Loading....</h2>
    }
  return (
    
    <div className="post">
        {posts.map((post, key) =>{
            return <div className="postWrapper">
            <div className="postTop">
              <div className="postTopLeft">
                <img
                  className="postProfileImg"
                  src={users.filter((u) => u.id === post?.user_id)[0].personPic}
                  alt=""
                />
                <span className="postUsername">
                  {users.filter((u) => u.id === post?.user_id)[0].name}
                </span>
                <span className="postDate">{post.date_created}</span>
              </div>
              <div className="postTopRight">
                <MoreVert />
              </div>
            </div>
            <div className="postCenter">
              <span className="postText">{post.comments.length}</span>
            </div>
          </div>
    })}
    
  </div>
  )
}

export default OnePost