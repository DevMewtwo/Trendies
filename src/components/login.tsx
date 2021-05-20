import React, { useRef, useState }  from 'react';
import '../App.css';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
};

const useStyles = makeStyles((theme:Theme) => createStyles({
  
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    // modal: {
    //   display: 'flex',
    //   alignItems: 'center',
    //   justifyContent: 'center',
    // },
    
    paper: {
      position: 'absolute',
      width: 250,
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ffffff',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }),
);

const Login = (props:any) => {

  const classes = useStyles();
  const userLoginInput:any = useRef();
  const passLoginInput:any = useRef();

  const [modalStyle] = React.useState(getModalStyle);
  const [openLogin, setShow] = React.useState(false);

  const getTextFieldValues = (e:any) => {
    const textFieldObj = {
      userText : undefined,
      passText : undefined,
    };
    console.log('event: ', e)
    if (e.key === 'Enter' || e.type === 'click') {
      
      textFieldObj.userText = userLoginInput.current.value
      textFieldObj.passText = passLoginInput.current.value
    }
    return textFieldObj
  };

  const onSuccess = (response:any):void => {
    console.log(response);
    
    handleClose();
  };

  const onFailure = (response:any):void => {
    console.error(response);
  }
  const handleOpen = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const completeForm = (e:any) => {

    const {userText, passText} = getTextFieldValues(e);
    console.log(userText);
    console.log(passText);
    
    const requestBody = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        "username": userText,
        "password": passText
      })
    }

    fetch('http://localhost:8080/login', requestBody) 
      .then(response => response.json())
      .then(data =>{
       
        console.log(data)
        if(data.status === 'success'){
          handleClose();
        } 
        if(data.status === 'fail'){
          window.alert('no');
        } 

      })
      .catch(err => console.log(err))
  };

  const loginBody = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="loginTitle">Log In</h2>
      <form className={classes.root} noValidate autoComplete="off">
        <div>
          <TextField 
            required 
            id="loginUser" 
            label="Username" 
            inputRef={userLoginInput}
          />
        </div>
        <div>
          <TextField
            required
            id="loginPass"
            label="Password"
            type="password"
            autoComplete="current-password"
            inputRef={passLoginInput}
          />
        </div>
      </form>
      <div className={classes.root}>
        <Button variant="outlined" color="primary" size="small" onClick={(e)=>completeForm(e)}>LOG IN</Button>
        <Button variant="outlined" size="small" onClick={handleClose}>CANCEL</Button>
      </div>
    </div>
  );
  return (
    <div>
      <button id="loginButton" onClick={handleOpen}>LOG IN</button>
      <Modal
        open={openLogin}
        onClose={handleClose}
        // className = {classes.modal}
      >
        {loginBody}
      </Modal>
    </div>
  )
};

export default Login;