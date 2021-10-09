import * as React from 'react';
import Routes from './routes';
import './App.css';
import history from './routes/history';
import { Router } from "react-router-dom";
import { getUser } from './firebase/functions';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase';
import { UserContext } from './AuthContext';

function App() {
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    var unsubscribe = onAuthStateChanged(auth, function (persistedUser) {
      if (persistedUser && persistedUser.uid) {
        getUser(persistedUser.uid).then(thisUser => {
          if (thisUser) {
            setUser({
              email: persistedUser.email,
              uid: persistedUser.uid,
              fullName: thisUser.fullName,
              whyJoin: thisUser.whyJoin,
              elevatorPitch: thisUser.elevatorPitch,
              powers: thisUser.powers,
              fields: thisUser.fields
            });
          }
        })
          .catch(e => console.log("AuthError: ", e))
      }
      else {
        setUser();
      }
    });
    return () => {
      unsubscribe();
    }
  }, [])


  return (
    <div className="App">
      <Router history={history}>
        <UserContext.Provider value={user}>
          <Routes />
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
