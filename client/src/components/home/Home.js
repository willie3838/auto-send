import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Title, LoginTextField, LoginButton } from "./Materials";
import EmailService from "../../services/EmailService";
import UserProfile from "../../contexts/UserProfile";

const Home = () => {
  const history = useHistory();
  const [profile, setProfile] = useContext(UserProfile);
  const usernameRef = React.createRef();
  const passwordRef = React.createRef();

  function handleClick(){
    const emailService = new EmailService();
    console.log(usernameRef.current.children[1].children[0].value, passwordRef.current.children[1].children[0].value)
    try{
      emailService.authenticateUser(usernameRef.current.children[1].children[0].value, passwordRef.current.children[1].children[0].value);
      // console.log(usernameRef);
      // setProfile(emailService);
    }
    catch(err){
      console.log("Username or password is incorrect");
    }
   
  
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
