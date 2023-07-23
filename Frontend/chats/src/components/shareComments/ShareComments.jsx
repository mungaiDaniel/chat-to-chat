import React from 'react'
import httpClient from '../../httpClient';
import { useState } from 'react';

const ShareComments = ({question_id}) => {

    const [success, setSuccess] = useState('')
    const[body, setBody] = useState("")

    const AddComment = async () =>{
        const resp = await httpClient.post(`http://127.0.0.1:5000/api/v1/comment/${question_id}`,{
          body,
        },
        {
          headers:
            {
                Authorization : `Bearer ${localStorage.getItem("token")}`
            }
        }
        ).then((res) =>{
          setSuccess("successfully commented")
          setTimeout(() =>{
            setSuccess('')
          }, 4000)
      
        }).catch((err) =>{
          
          console.log(err)
          setSuccess('NOT ADMIN')
          setTimeout(() =>{
            setSuccess('')
          }, 4000)
        })
        };


  return (
    <div className="share">
    <div className="shareWrapper">
      <div className="shareTop">
        <input
          placeholder="Add a comment"
          className="shareInput"
          type='text'
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>
      <hr className="shareHr"/>
      <span className="successfull">{success}</span>
      <div className="shareBottom">
          <button type="submit" className="shareButton" onClick={() => AddComment()}>Share</button>
      </div>
      
    </div>
  </div>
  )
}

export default ShareComments