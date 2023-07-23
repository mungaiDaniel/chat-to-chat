import "./topbar.css"
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link, useNavigate } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useState, useEffect } from "react";
import { makeStyles, ThemeProvider, createTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  links: {
    textDecoration: "none",
    color:"black"
  },
}));

const Topbar = () => {

  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    // Check if the token exists in localStorage
    const token = localStorage.getItem('token');
    setHasToken(token !== null);
  }, []);
  const classes = useStyles();

  const navigate = useNavigate();
    const token = ''
    const logout = () =>{
      window.localStorage.removeItem('token')
      window.localStorage.removeItem('user_role')
      navigate('/login')
    }
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

  return (
    <div className="topbarContainer">
    <div className="topbarLeft">
      <Link to="/" >
      <span className="logo">Chats</span>
      </Link>
      <Toolbar>
      <IconButton 
        edge='start'
        aria-label='menu'
        data-bs-toggle="collapse"
        data-bs-target="#navmenu"
        className='navbar-toggler'
        style={{
          color: 'black'
        }}
      >
        <MenuIcon/>
      </IconButton>
      </Toolbar>
        
    </div>
    <div className="topbarCenter">
      <div className="searchbar">
        <Search className="searchIcon" />
        <input
          placeholder="Search for friend, post or video"
          className="searchInput"
        />
      </div>
    </div>
    <div className="topbarRight">
      <div className="topbarLinks">
        
      <Link to="/">
        <span className="topbarLink">Feeds</span>
        </Link>
        {
          hasToken &&
          <Link to="/profile">
          <span className="topbarLink">Profile</span>
          </Link>
        }
        {
          hasToken && (<Link to="/posts">
          <span className="topbarLink">Posts</span>
          </Link>)
        }
        
        
        
        {
          window.localStorage.getItem('token')?
          (<span onClick={logout} className="topbarLink">logout</span>)
          :
          (<Link to="/login">
            <span className="topbarLink">login</span>
            </Link>)
        }
        {
          window.localStorage.getItem('token')
        }
        
        

      </div>
      <div className="topbarIcons">
        <div className="topbarIconItem">
          <Person />
          <span className="topbarIconBadge">1</span>
        </div>
        <div className="topbarIconItem">
          <Chat />
          <span className="topbarIconBadge">2</span>
        </div>
        <div className="topbarIconItem">
          <Notifications />
          <span className="topbarIconBadge">1</span>
        </div>
      </div>
      <img onClick={handleClick} src="https://randomuser.me/api/portraits/men/42.jpg" alt="" className="topbarImg"/>
    </div>
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
      autoFocus
      className='m-2 simple_menu'
    >
      {
          window.localStorage.getItem('token')?
          (<MenuItem onClick={handleClose} className={classes.links}><span onClick={logout} className="menuLink">logout</span></MenuItem>)
          :
          (<MenuItem onClick={handleClose}><Link to="/login" className={classes.links}>
            <span className="menuLink">login</span>
            </Link></MenuItem>)
        }


    </Menu>
  </div>
  )
}

export default Topbar