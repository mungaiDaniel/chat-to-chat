import "./online.css";

export default function Online({user}) {
  return (
    <li className="rightbarFriend">
      <div className="rightbarProfileImgContainer">
        <img className="rightbarProfileImg" src={user.personPic} alt="" />
        <span className="rightbarOnline"></span>
      </div>
      <span className="rightbarUsername">{user.name}</span>
    </li>
  );
}