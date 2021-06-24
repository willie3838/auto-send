import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ErrorDialog, Title, LoginTextField, LoginButton } from "./Materials";
import {
  CircularProgress,
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
        console.log("Incorrect credentials");
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
            Incorrect email or password, please try again
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
          </div>

          <div class="w-96 mt-3 text-right">
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
