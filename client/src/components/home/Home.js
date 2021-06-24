import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ErrorDialog, Title, LoginTextField, LoginButton } from "./Materials";
import {
  CircularProgress,
  Link,
  Typography,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import UserProfile from "../../contexts/UserProfile";
import EmailService from "../../services/EmailService";

const Home = () => {
  const history = useHistory();
  const [profile, setProfile] = useContext(UserProfile);
  const [loading, setLoading] = useState(true);
  const [openError, setOpenError] = useState(false);
  const usernameRef = React.createRef();
  const passwordRef = React.createRef();

  useEffect(() => {
    setTimeout(() => setLoading(false), 700);
  },[])

  function handleClick() {
    let credentials = {
      email: usernameRef.current.children[1].children[0].value,
      password: passwordRef.current.children[1].children[0].value,
    };
    setProfile(credentials);

    (async () => {
      setLoading(true)
      const authenticated = await EmailService.authenticateEmail(credentials);

      if (authenticated.data) {
        history.push("/email");
      } else {
        setLoading(false)
        openErrorDialog();
      }
    })();
  }

  function openErrorDialog() {
    setOpenError(!openError);
  }

  return (
    <div class="h-full">
      <ErrorDialog open={openError}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            To ensure your login in succeeds, make sure you click both links under password to enable this 
            app to access your account. Otherwise, you input an incorrect email or password, please try again.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={openErrorDialog.bind(this)}>
            Close
          </Button>
        </DialogActions>
      </ErrorDialog>
      {loading === false ? (
        <form
          class="h-full flex flex-wrap content-center justify-center flex-col"
          noValidate
          autoComplete="off"
        >
          <div class="text-center">
            <Title variant="h2">AutoSend</Title>
          </div>
          <div class="w-96 mt-5">
            <LoginTextField
              ref={usernameRef}
              label="Email"
              variant="outlined"
              fullWidth={true}
            />
          </div>
          <div class="w-96 mt-3">
            <LoginTextField
              ref={passwordRef}
              type="password"
              label="Password"
              variant="outlined"
              fullWidth={true}
            />
            <div>
              <div class="mt-2">
                
           
                <Link href="https://myaccount.google.com/lesssecureapps?pli=1&rapt=AEjHL4MIyWKmQ1ug7ushrtZw2yrOZlFb1dJpsRFiPQGG_W1gjS8piN8qOxuKwJ8qObblHI3UfsVSQ9hPjxX27hFq9zHbM64Lfg" display="block" target="_blank" rel="noopener">Turn on Less Secure Apps</Link>
    
                <Link href="https://accounts.google.com/b/0/DisplayUnlockCaptcha" display="block" target="_blank" rel="noopener">Unlock Captcha</Link>
            
               
  
              </div>
            </div>
          </div>
          <div class="w-96 relative text-right bottom-10">
            <LoginButton onClick={handleClick.bind()} variant="contained">
              Login
            </LoginButton>
          </div>
        </form>
      ) : (
        <div class="h-full flex flex-wrap content-center justify-center">
          <CircularProgress size={100} />
        </div>
        
      )}
    </div>
  );
};

export default Home;
