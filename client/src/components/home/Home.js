import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Title, LoginTextField, LoginButton } from "./Materials";
import UserProfile from "../../contexts/UserProfile";
import EmailService from "../../services/EmailService";

const Home = () => {
  const history = useHistory();
  const [profile, setProfile] = useContext(UserProfile);
  const usernameRef = React.createRef();
  const passwordRef = React.createRef();

  function handleClick(){
    let credentials = {
      email: usernameRef.current.children[1].children[0].value,
      password: passwordRef.current.children[1].children[0].value
    };
    setProfile(credentials);

    ;(async () => {
      const authenticated = await EmailService.authenticateEmail(credentials)
      
      if(authenticated.data){
        history.push("/email");
      }
      else{
        console.log("Incorrect credentials");
      }
    })();
  }

  return (
    <div class="h-full">
      <form
        class="h-full flex flex-wrap content-center justify-center flex-col"
        noValidate
        autoComplete="off"
      >
        <div class="text-center">
          <Title variant="h2">
            AutoSend
          </Title>
        </div>
        <div class="w-96 mt-5">
          <LoginTextField ref={usernameRef} label="Email" variant="outlined" fullWidth={true} />
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
          
          <LoginButton onClick={handleClick.bind()} variant="contained">Login</LoginButton>
         
        </div>

      </form>
    </div>
  );
};

export default Home;
