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
import Topbar from "../../components/topbar/Topbar";

export default function Login() {

  const [username, setUsername] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const LoginUser = async () => {
    console.log(username, zipcode)
    await axios
    .post("https://chat-fs55.onrender.com/api/v1/login",{
      username,
      zipcode
    })
    .then((res) =>{
      localStorage.setItem("user_role", res.data.user_role)
      localStorage.setItem("token", res.data.token)
      alert("successful login")
     navigate('/')
    })
    .catch((err) =>{
      console.log(err)
    })
  }
  return (
    <>
    <Topbar/>
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
                  type={showPassword ? "text" : "password"}
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
 </>
  );
}