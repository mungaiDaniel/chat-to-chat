import "./login.css";
import logo from "./logo.jpg"

export default function Login() {
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
            <input placeholder="Email" className="loginInput" />
            <input placeholder="Password" className="loginInput" />
            <button className="loginButton">Log In</button>
          </div>
        </div>
      </div>
    </div>
  );
}