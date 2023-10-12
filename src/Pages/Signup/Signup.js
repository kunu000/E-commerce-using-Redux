// importing css
import styles from "./Signup.module.css";
// importing component from react-router-dom package
import { Link } from "react-router-dom";
// importing Hooks from react-redux
import { useDispatch, useSelector } from "react-redux";
// importing function from productsReducer
import {
  signupSelector,
  handleSignupAsync,
} from "../../redux/reducers/signupReducer";
import { actions } from "../../redux/reducers/signupReducer";

function Signup() {
  // dispatch is used to dispatch action object to reducer function
  const dispatch = useDispatch();
  // signup contain signupReducer state
  const signup = useSelector(signupSelector);

  const handleClick = () => {
    dispatch(handleSignupAsync(signup.signupValue));
  };

  return (
    <>
      <div className={styles.signup}>
        <div className={styles.signup_container}>
          <h2>Signup Here</h2>
          <div>
            <label htmlFor={styles.name}>Name : </label>
            <input
              type="text"
              id={styles.name}
              placeholder="Name"
              onChange={(e) => dispatch(actions.setSignupName(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor={styles.email}>Email : </label>
            <input
              type="email"
              id={styles.email}
              placeholder="Email"
              onChange={(e) => dispatch(actions.setSignupEmail(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor={styles.password}>Password : </label>
            <input
              type="password"
              id={styles.password}
              placeholder="Password"
              onChange={(e) =>
                dispatch(actions.setSignupPassword(e.target.value))
              }
            />
          </div>
          <button onClick={handleClick} disabled={signup.signinButtonDisable}>
            Sign up
          </button>
          <div>
            <strong style={{ color: "white" }}>
              Already have an account?{" "}
              <span className={styles.text}>
                <Link to="/login">Login</Link>
              </span>
            </strong>
          </div>
        </div>
      </div>
    </>
  );
}
// exporting Signup Component
export default Signup;
