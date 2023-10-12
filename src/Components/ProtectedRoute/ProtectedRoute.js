// importing Hooks
import { useState, useEffect } from "react";

// importing Component from react-router-dom
import { Navigate } from "react-router-dom";

// importing firebase
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";

// importing component from react-loader-spinner package
// it shows loading image
import { Oval } from "react-loader-spinner";

function ProtectedRoute({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  // this hook check whether user is loggedin or not
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  // if isLoggedIn is true the return children
  // and if isLoggedIn if false then navigate to home page
  // else show loading SVG

  if (isLoggedIn) {
    return children;
  } else if (isLoggedIn === false) {
    return <Navigate to="/" />;
  } else {
    return (
      <div
        style={{
          minHeight: "400px",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Oval />
      </div>
    );
  }
}

// exporting ProtectedRoute Component
export default ProtectedRoute;
