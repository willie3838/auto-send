import React, { useState} from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserProfile from "./contexts/UserProfile";
import Home from "./components/home/Home";
import Email from "./components/email/Email";

const App = () => {
  const [profile, setProfile] = useState({});

  return (
    <div class="h-full">
      <UserProfile.Provider value={[profile, setProfile]}>
        <Router>
          <Switch>
            <Route path="/email">
              <Email />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </UserProfile.Provider>
    </div>
  );
};

export default App;
