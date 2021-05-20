import React, { useRef, useState } from 'react';
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

const Signup = (props:any) => {
  const classes = useStyles();
  const emailSignupInput:any = useRef();
  const userSignupInput:any = useRef();
  const passSignupInput:any = useRef();

  const [modalStyle] = React.useState(getModalStyle);
  const [openSignup, setShow] = React.useState(false);

  const getTextFieldValues = (e:any) => {
    const textFieldObj = {
      emailText : undefined,
      userText : undefined,
      passText : undefined,
    };
    console.log('event: ', e)
    if (e.key === 'Enter' || e.type === 'click') {
      
      textFieldObj.emailText = emailSignupInput.current.value
      textFieldObj.userText = userSignupInput.current.value
      textFieldObj.passText = passSignupInput.current.value
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

    const {emailText, userText, passText} = getTextFieldValues(e);
    
    const requestBody = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        "email": emailText,
        "username": userText,
        "password": passText
      })
    }

    fetch('/signup', requestBody) 
      .then(response => response.json())
      .then(data =>{
        
        if (!data.signupFail) handleClose();

      })
      .catch(err => console.log(err))
  };

  const signupBody = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="signupTitle">Sign Up</h2>
      <form className={classes.root} noValidate autoComplete="off">
      <div>
          <TextField 
            required 
            id="signupEmail" 
            label="E-mail Address" 
            inputRef={emailSignupInput}
          />
        </div>
        <div>
          <TextField 
            required 
            id="signupUser" 
            label="Username" 
            inputRef={userSignupInput}
          />
        </div>
        <div>
          <TextField
            required
            id="signupPass"
            label="Password"
            type="password"
            autoComplete="current-password"
            inputRef={passSignupInput}
          />
        </div>
      </form>
      <div className={classes.root}>
        <Button variant="outlined" color="primary" size="small" onClick={(e)=>completeForm(e)}>SIGN UP</Button>
        <Button variant="outlined" size="small" onClick={handleClose}>CANCEL</Button>
      </div>
    </div>
  );


  return (
    <div>
      <button id="signupButton" onClick={handleOpen}>SIGN UP</button>
      <Modal
        open={openSignup}
        onClose={handleClose}
        // className = {classes.modal}
      >
        {signupBody}
      </Modal>
    </div>
  )
};

export default Signup;