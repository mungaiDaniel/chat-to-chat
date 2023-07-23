import Topbar from '../../components/topbar/Topbar'
import ShareComments from '../../components/shareComments/ShareComments'
import OnePost from './OnePost'
import './comments.css'
import React, { useState , useEffect } from 'react'
import axios from 'axios'
import { MoreVert , ThumbUpAlt, ThumbDownAlt } from "@material-ui/icons";


import { useLocation } from 'react-router-dom'

const Comments = () => {

  const location = useLocation();
  const urlParams = new URLSearchParams(location.search)
  const question_id = urlParams.get('id')
  
  const [comments, setComments] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/api/v1/comment/${question_id}`)
    .then((response) =>{
        setComments(response.data.data)
        setIsLoading(false)
    } )
}, [] )

if (isLoading){
  return <h2>Loading....</h2>
}
  return (
    <>
    <Topbar />
    <OnePost question_id={question_id} />
    <ShareComments question_id={question_id} />
    {
      comments.map((comment) =>{

        return <div className="post">
        <div className="postWrapper">
          <div className="postTop">
            <div className="postTopLeft">
              <span className="postUsername">
              </span>
              <span className="postDate">{comment.date_created}</span>
            </div>
            <div className="postTopRight">
              <MoreVert />
            </div>
          </div>
          <div className="postCenter">
            <span className="postText">{comment?.body}</span>
          </div>
        </div>
      </div>

      })
    }
    
    </>
  )
}

export default Comments