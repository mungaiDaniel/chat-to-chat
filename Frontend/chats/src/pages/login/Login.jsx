import "./login.css";
import logo from "./logo.jpg"
import axios from "axios";
import { Icon } from "@iconify/react";
import {
  IconButton,
  InputAdornment,
  TextField
  
} from "@mui/material";
import { useNavigate} from "react-router-dom"; 
import { useState } from "react";

export default function Login() {

  const [username, setUsername] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const LoginUser = async () => {
    console.log(username, zipcode);
    const data = {username:username, zipcode:zipcode  }

    await fetch("http://127.0.0.1:5000/api/v1/login", {
      method: 'POST',
      headers: new Headers({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Content-Type, Authorization',
        'Access-Control-Allow-Methods': '*',
        "Content-Type": "application/json"
    }),
      body: JSON.stringify(data),
    })
    .then((res) = {
      
       }).then(data => {
      console.log(data)
    })
    .catch((err) =>{
      console.log(err)
      setError("  Wrong zipcode or user credentials")
      setTimeout(() =>{
        setError('')
      }, 2000)

    })
  }
  return (
    <div className="login">
      <div className="loginWrapper container">
        <div className="loginLeft">
        <img src={logo} alt=""  className="logopic"/>
          <h3 className="loginLogo">Chat to Chats</h3>
            
          <span className="loginDesc">
            Chat to chat with your friends
          </span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <TextField placeholder="Username"
                    type="text"
                    className="loginInput"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    />
            <TextField placeholder="Password" 
                  type={showPassword ? "text" : "zipcode"}
                   className="loginInput"
                   value={zipcode}
                   onChange={(e) => setZipcode(e.target.value)}
                   InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword((prev) => !prev)}
                        >
                          {showPassword ? (
                            <Icon icon="eva:eye-fill" />
                          ) : (
                            <Icon icon="eva:eye-off-fill" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}/>
            <button className="loginButton" type="submit" onClick={() => LoginUser()}>Log In</button>
          </div>
        </div>
      </div>
    </div>
  );
}