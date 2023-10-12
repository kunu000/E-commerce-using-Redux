// importing css
import style from "./Page404.module.css";

// importing page404 image
import errorIcon from "../../Assets/Images/icons/error-404.png";

// importing hooks from react-router-dom
import { useLocation, useNavigate } from "react-router-dom";

// importing Hooks
import { useEffect, useState } from "react";

function Page404() {
  const location = useLocation();
  const navigate = useNavigate();
  const [counter, setCounter] = useState(5);

  useEffect(() => {
    console.log(`The page "${location.pathname}" does not exist.`);
  }, [location.pathname]);

  // this hook reduces couter value
  // and if value become 0 then navigate to previous page
  useEffect(() => {
    if (counter === 0) {
      navigate(-1);
    } else {
      setTimeout(() => {
        setCounter(counter - 1);
      }, 1000);
    }
  }, [counter, navigate]);

  return (
    <div className={style.errorPage}>
      <img src={errorIcon} alt="error icon" />
      <h1>Page Not Found</h1>
      <p>The page you're looking for does not seems to exist.</p>
      <p>Redirecting in {counter} seconds...</p>
      {/* on button click it will redirect user to previous bage */}
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Go to Home
      </button>
    </div>
  );
}

// exporting Page404 Component
export default Page404;
