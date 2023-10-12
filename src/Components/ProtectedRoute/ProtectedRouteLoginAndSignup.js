// importing Hooks
import { useState, useEffect } from "react";

// importing Component from react-router-dom
import { Navigate } from "react-router-dom";

// importing firebase
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";

// importing component from react-loader-spinner package
// it show loading image
import { Oval } from "react-loader-spinner";

function ProtectedRouteForLoginAndSignup({ children }) {
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

  // if isLoggedIn is true then navigate to home page
  // and if isLoggedIn is false then return children
  // else shows loading SVG

  if (isLoggedIn) {
    return <Navigate to="/" />;
  } else if (isLoggedIn === false) {
    return children;
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
// exporting ProtectedRouteForLoginAndSignup Component
export default ProtectedRouteForLoginAndSignup;
