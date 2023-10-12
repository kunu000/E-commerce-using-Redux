// importing css
import styles from "./ContactInformation.module.css";

// importing images
import logo from "../../Assets/Images/logo/b.png";
import pay from "../../Assets/Images/pay/pay.png";
import play from "../../Assets/Images/pay/play.jpg";
import app from "../../Assets/Images/pay/app.jpg";

function ContactInformation() {
  const handleClick = (e) => {
    e.preventDefault();
  };

  return (
    <footer className={styles.section_p1}>
      <div className={styles.col}>
        <img className={styles.logo} src={logo} alt="BuyBusy" />
        <h4>Contact</h4>
        <p>
          <strong>Address: </strong>Pilikothi, Haldwani, Uttarakhand 263139
        </p>
        <p>
          <strong>Phone: </strong>+919945994567 / +918708861440
        </p>
        <p>
          <strong>Hours: </strong>10:00 - 18:00, Mon - Sat
        </p>

        <div className={styles.follow}>
          <h4>Follow us</h4>
          <div className={styles.icon}>
            <i className="fa-brands fa-facebook-f"></i>
            <i className="fa-brands fa-twitter"></i>
            <i className="fa-brands fa-instagram"></i>
            <i className="fa-brands fa-pinterest"></i>
            <i className="fa-brands fa-youtube"></i>
          </div>
        </div>
      </div>

      <div className={styles.col}>
        <h4>About</h4>
        <a href="/" onClick={handleClick}>
          About us
        </a>
        <a href="/" onClick={handleClick}>
          Delivery Information
        </a>
        <a href="/" onClick={handleClick}>
          Privacy Policy
        </a>
        <a href="/" onClick={handleClick}>
          Terms & Conditions
        </a>
        <a href="/" onClick={handleClick}>
          Contact Us
        </a>
      </div>

      <div className={styles.col}>
        <h4>My Account</h4>
        <a href="/" onClick={handleClick}>
          Sign In
        </a>
        <a href="/" onClick={handleClick}>
          View Cart
        </a>
        <a href="/" onClick={handleClick}>
          My Wishlist
        </a>
        <a href="/" onClick={handleClick}>
          Track My Order
        </a>
        <a href="/" onClick={handleClick}>
          Help
        </a>
      </div>

      <div className={`${styles.col} ${styles.install}`}>
        <h4>Install App</h4>
        <p>From App Store or Google Play</p>
        <div className={styles.row}>
          <img src={app} alt="apple store" />
          <img src={play} alt="google store" />
        </div>
        <p>Secured Payment Gateways</p>
        <img src={pay} alt="Payment Gateways" />
      </div>

      <div className={styles.copyright}>
        <p>&#169; 2023, Ecommerce Website</p>
      </div>
    </footer>
  );
}

export default ContactInformation;
