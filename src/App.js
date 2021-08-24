import "./App.css";
import firebase from "firebase/app";
import "firebase/auth";

import firebaseConfig from "./firebaseConfig";
import { useState } from "react";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

function App() {
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    photoURL: "",
  });

  const provider = new firebase.auth.GoogleAuthProvider();

  const handleGoogleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const { displayName, email } = result.user;
        const userInfo = {
          isSignedIn: true,
          name: displayName,
          email: email,
        };

        setUser(userInfo);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  // Facebook ============= >>>>>>>>>>>>>>>> ===============

  const FbProvider = new firebase.auth.FacebookAuthProvider();

  const handleFbSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(FbProvider)
      .then((result) => {
        const { displayName, email, photoURL } = result.user;
        const userInfo = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photoURL: photoURL,
        };
        setUser(userInfo);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  // Github ================ >>>>>>>>>>> ===================

  const ghProvider = new firebase.auth.GithubAuthProvider();

  const handleGhSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(ghProvider)
      .then((result) => {
        const { displayName, email, photoURL } = result.user;
        const userInfo = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photoURL: photoURL
        }

        setUser(userInfo);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        const userInfo = {
          isSignedIn: false,
          name: "",
          email: "",
          photoURL: "",
        };
        setUser(userInfo);
      })
      .catch((error) => {
        console.log(error.code, error.message);
      });
  };

  return (
    <div className="App">
      {user.isSignedIn && (
        <div>
          <h3>Welcome, {user.name}</h3>
          <p>Email: {user.email}</p>
          <img style={{width:"80px"}} src={user.photoURL} alt={user.photoURL} />
        </div>
      )}
      {user.isSignedIn ? (
        <button onClick={handleLogout}>Log out</button>
      ) : (
        <div>
          <button onClick={handleGoogleSignIn}>Login with google</button>
          <br />
          <button onClick={handleFbSignIn}>Log In with Facebook</button>
          <br />
          <button onClick={handleGhSignIn}>Log In with Github</button>
        </div>
      )}
    </div>
  );
}

export default App;
