// import css
import styles from "./Login.module.css";

// importing Component from react-router-dom
import { Link } from "react-router-dom";

// importing Hooks from react-redux
import { useDispatch, useSelector } from "react-redux";
// importing function from productsReducer
import {
  handleLoginAsync,
  loginSelector,
  resetPassword,
} from "../../redux/reducers/loginReducer";
import { actions } from "../../redux/reducers/loginReducer";

function Login() {
  // dispatch is used to dispatch action object to reducer function
  const dispatch = useDispatch();
  // loginData contain loginReducer state
  const loginData = useSelector(loginSelector);

  return (
    <>
      <div className={styles.login}>
        <div className={styles.login_container}>
          <h2>Login Here</h2>
          <div>
            <label htmlFor={styles.email}>Email : </label>
            <input
              type="email"
              id={styles.email}
              placeholder="Email"
              onChange={(e) => dispatch(actions.setLoginEmail(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor={styles.password}>Password : </label>
            <input
              type="password"
              id={styles.password}
              placeholder="password"
              onChange={(e) =>
                dispatch(actions.setLoginPassword(e.target.value))
              }
            />
          </div>
          <button
            onClick={() => {
              dispatch(handleLoginAsync(loginData.loginValue));
            }}
            disabled={loginData.loginButtonDisable}
          >
            Log in
          </button>
          <div style={{margin:"30px 20px 10px"}}>
            <strong style={{ color: "white" }}>
              <span className={styles.text}>
                <a
                  href=""
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(resetPassword(loginData.loginValue.email));
                  }}
                >
                  Forgot password?
                </a>
              </span>
            </strong>
          </div>
          <div style={{margin:"20px 20px 10px"}}>
            <strong style={{ color: "white" }}>
              Don't have account?{" "}
              <span className={styles.text}>
                <Link to="/signup">Sign up</Link>
              </span>
            </strong>
          </div>
        </div>
      </div>
    </>
  );
}

// exporting Login Component
export default Login;
