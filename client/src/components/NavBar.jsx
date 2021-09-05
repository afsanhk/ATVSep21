import React, { useContext, useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import KanPlanLogo from '../images/KanPlanLogo.png';
import '../styles/NavBar.scss';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';
import AppsIcon from '@material-ui/icons/Apps';
import AlarmIcon from '@material-ui/icons/Alarm';
import ForumIcon from '@material-ui/icons/Forum';
import { Button } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';

import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

import { authContext } from '../providers/AuthProvider';
import { imageContext } from '../providers/ImagePorvider';

//helpers
import avatarBGColor from '../helpers/avatarBG';
import Pomodoro from './Pomodoro';
import FaceDetection from './FaceDetection';

const theme = createTheme({
  overrides: {
    MuiDrawer: {
      paper: {
        'justify-content': 'space-between',
        width: '120px'
      }
    }
  }
});

const useStyles = makeStyles({
  selected: {
    backgroundColor: 'rgba(189, 189, 189, 0.3)'
  },
  navBarButton: {
    'text-align': 'center',
    'margin-top': '10px',
    color: '#545454'
  },
  navBarIcon: {
    fontSize: '45px'
  },
  navBarAvatar: {
    border: 'solid #757575 3px',
    width: '80px',
    height: '80px',
    marginBottom: '20px'
  }
});

function NavBar({ userID }) {
  const { pathname } = useLocation(); //extracts pathname from current url location
  const { logout } = useContext(authContext);
  const { imageSrc } = useContext(imageContext);
  const classes = useStyles();

  const [showPomodoro, setShowPomodoro] = useState(false);
  const [showFaceDetect, setShowFaceDetect] = useState(false);

  const handleShowPomodoro = () => {
    setShowPomodoro(!showPomodoro)
  }

  const handleShowFaceDetect = () => {
    setShowFaceDetect(!showFaceDetect);
  };

  const activePage = function () {
    if (['/'].includes(pathname)) {
      return 'homepage';
    }

    if (['/projects'].includes(pathname)) {
      return 'projects';
    }
  };

  //pomodoro logic
  const [pomodoroTimer, showPomodoroTimer] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState(20); //1500 seconds = 25 mins
  const [timer, setTimer] = useState()
  const [showShortBreakMsg, setShowShortBreakMsg] = useState(false)

  // const timerMinutes = minutesLeft < 10 ? `0${minutesLeft}` : minutesLeft;
  const timerSeconds = secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft;

  const countdown = function (secondsLeft) {
    let timerMinutes = Math.floor(secondsLeft / 60);
    let timerSeconds = (secondsLeft % 60);

    if (timerSeconds < 10) {
      timerSeconds = `0${timerSeconds}`
    }

    return `${timerMinutes}:${timerSeconds}`
  }

  const onTimerStart = (totalSeconds) => {
    showPomodoroTimer(true)
    setSecondsLeft(totalSeconds)

    const minusOneSecond = setInterval(() => {
        setSecondsLeft((secondsLeft) => secondsLeft - 1);
        if (secondsLeft === 0) {
          clearInterval(timer);
        }
    }, 250);

    //creates a loop with the above setInterval, until no seconds are left
    setTimer(minusOneSecond)
  }
  

  useEffect(() => {
    if (secondsLeft === 0) {
      console.log('DONE')
      clearInterval(timer);
    }
  }, [secondsLeft, timer]);

  useEffect(() => {
    return () => clearInterval(timer);
  }, [timer]);




  // useEffect(() => {
  //   let interval = setInterval(() => {
  //     clearInterval(interval);

  //     if (seconds === 0) {
  //       if (minutes !== 0) {
  //         setSeconds(59);
  //         setMinutes(minutes - 1);
  //       } else {
  //         // let minutes = displayMessage ? 24 : 0;
  //         let seconds = 10;

  //         setSeconds(seconds);
  //         setMinutes(minutes);
  //         // setDisplayMessage(!displayMessage);
  //       }
  //     } else {
  //       setSeconds(seconds - 1);
  //     }
  //   }, 1000);
  // }, [onTimerStart === true]);





  let avatarBG = avatarBGColor(userID);

  return (
    <ThemeProvider theme={theme}>
      <Drawer variant="permanent" anchor="left" className="navBar">
        <div className="nav-top">
          <img src={KanPlanLogo} alt="logo" width="100" height="100" />
          <div className="nav-body">
            <List>
              <NavLink to="/" className="navlink">
                <ListItem button className={[activePage() === 'homepage' ? classes.selected : '', classes.navBarButton]} alignItems="center">
                  <ListItemText primary={<HomeIcon className={classes.navBarIcon} />} secondary={<Typography>Home</Typography>} />
                </ListItem>
              </NavLink>
              <NavLink to="/projects" className="navlink">
                <ListItem button className={[activePage() === 'projects' ? classes.selected : '', classes.navBarButton]}>
                  <ListItemText primary={<AppsIcon className={classes.navBarIcon} />} secondary={<Typography>Projects</Typography>} />
                </ListItem>
              </NavLink>
              <ListItem button className={classes.navBarButton}>
                <ListItemText primary={<ForumIcon className={classes.navBarIcon} />} secondary={<Typography>Chat</Typography>} />
              </ListItem>
            </List>
          </div>
        </div>
        <div className="nav-bottom">
          <List className="nav-bottom-list">
            {pomodoroTimer && 
              <ListItem>
                <ListItemText primary={'Work Interval'} secondary={countdown(secondsLeft)} />
              </ListItem>
            }
            <ListItem button className={classes.navBarButton}>
              <ListItemText primary={<AlarmIcon fontSize="large" className={classes.navBarIcon} />} secondary={<Typography>Pomodoro</Typography>} onClick={handleShowPomodoro}/>
            </ListItem>
          </List>
          <Avatar alt="" className={classes.navBarAvatar} src={imageSrc ? imageSrc : `https://robohash.org/${userID}`} style={{ 'background-color': avatarBG }} onClick={handleShowFaceDetect} />
          <Button onClick={() => logout()}>Logout</Button>
        </div>
      </Drawer>
      {showPomodoro && <Pomodoro onTimerStart={onTimerStart}/>}
      {showFaceDetect && <FaceDetection userID={userID} show={showFaceDetect} />}
    </ThemeProvider>
  );
}

export default NavBar;
