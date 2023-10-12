// importing component from react-router-dom
import { NavLink, Outlet } from "react-router-dom";

// importing css
import styles from "./Navbar.module.css";

// importing icon image
import logo from "../../Assets/Images/logo/b.png";

// importing firebase
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";

// .importing function for notifications
import Notification from "../../utils/Notification";

function Navbar({ isLoggedIn }) {
  const handleClick = () => {
    let element = document.getElementsByClassName(`${styles.nav_right}`)[0];
    element.classList.add(`${styles.active_nav}`);
  };

  const handleClose = () => {
    let element = document.getElementsByClassName(`${styles.nav_right}`)[0];
    element.classList.remove(`${styles.active_nav}`);
  };

  return (
    <>
      <div className={styles.nav}>
        <div className={styles.nav_left}>
          <img src={logo} alt="BuyBusy logo" />
          <h2 className={styles.nav_title}>BuyBusy</h2>
        </div>
        <div id={styles.mobile}>
          <i
            id="bar"
            className="fa-solid fa-bars"
            onClick={handleClick}
            style={{ fontSize: "22px", cursor: "pointer" }}
          ></i>
        </div>
        <div className={`${styles.nav_right} `}>
          <div id={styles.close} onClick={handleClose}>
            <i className="fa-regular fa-circle-xmark"></i>
          </div>
          <NavLink
            onClick={() => handleClose()}
            to="/"
            className={({ isActive }) =>
              `${isActive && `${styles.active_link}`}`
            }
          >
            Home
          </NavLink>
          <NavLink
            onClick={() => handleClose()}
            to="/shop"
            className={({ isActive }) =>
              `${isActive && `${styles.active_link}`}`
            }
          >
            Shop
          </NavLink>
          {isLoggedIn && (
            <NavLink
              onClick={() => handleClose()}
              to="/order"
              className={({ isActive }) =>
                `${isActive && `${styles.active_link}`}`
              }
            >
              My Orders
            </NavLink>
          )}
          {isLoggedIn && (
            <NavLink
              onClick={() => handleClose()}
              to="/addProduct"
              className={({ isActive }) =>
                `${isActive && `${styles.active_link}`}`
              }
            >
              Add Product
            </NavLink>
          )}
          {isLoggedIn ? (
            <NavLink
              onClick={() => {
                handleClose();
                signOut(auth)
                  .then(() => {
                    Notification("Logout Successfully", false);
                  })
                  .catch((error) => {
                    Notification(error, true);
                  });
              }}
            >
              Logout
            </NavLink>
          ) : (
            <NavLink
              onClick={() => handleClose()}
              to="/login"
              className={({ isActive }) =>
                `${isActive && `${styles.active_link}`}`
              }
            >
              Login/Signin
            </NavLink>
          )}
          {isLoggedIn && (
            <NavLink
              onClick={() => handleClose()}
              to="/cart"
              className={({ isActive }) =>
                `${isActive && `${styles.active_link}`}`
              }
            >
              <i className="fa-solid fa-bag-shopping"></i>
            </NavLink>
          )}
        </div>
      </div>
      {/* It render child route elements */}
      <Outlet />
    </>
  );
}

export default Navbar;
