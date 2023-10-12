// importing css 
import styles from "./Home.module.css";

// importing images
import fe1 from "../../Assets/Images/features/f1.png";
import fe2 from "../../Assets/Images/features/f2.png";
import fe3 from "../../Assets/Images/features/f3.png";
import fe4 from "../../Assets/Images/features/f4.png";
import fe5 from "../../Assets/Images/features/f5.png";
import fe6 from "../../Assets/Images/features/f6.png";

// importing Component from react-router-dom 
import { Link } from "react-router-dom";

// importing Component 
import ContactInformation from "../../Components/Information/ContactInformation";

function Home() {
  return (
    <>
      <section className={styles.hero}>
        <h2>Trade-in-offer</h2>
        <h1>Super value deals</h1>
        <h1 style={{ color: "#0c9a90" }}>On all products</h1>
        <p>Save more with coupons & up to 70% off! </p>
        <button>
          <Link to="/shop" style={{ textDecoration: "none", color: "#0c9a90" }}>
            Shop Now
          </Link>
        </button>
      </section>

      <section id={styles.feature} className={styles.section_p1}>
        <div className={styles.fe_box}>
          <img src={fe1} alt="Free shipping" />
          <h6>Free Shipping</h6>
        </div>
        <div className={styles.fe_box}>
          <img src={fe2} alt="Online order" />
          <h6>Online order</h6>
        </div>
        <div className={styles.fe_box}>
          <img src={fe3} alt="Save Money" />
          <h6>Save Money</h6>
        </div>
        <div className={styles.fe_box}>
          <img src={fe4} alt="Promotions" />
          <h6>Promotions</h6>
        </div>
        <div className={styles.fe_box}>
          <img src={fe5} alt="Happy sell" />
          <h6>Happy Sell</h6>
        </div>
        <div className={styles.fe_box}>
          <img src={fe6} alt="24/7 support" />
          <h6>24/7 Support</h6>
        </div>
      </section>

      <section id={styles.banner} className={styles.section_m1}>
        <h4>Repair Services</h4>
        <h2>
          Up to <span>70% off</span> - All t-shirts & Accessories
        </h2>
        <button>
          <Link to="shop">Explore more</Link>
        </button>
      </section>
      <ContactInformation />
    </>
  );
}

// exporting Home Component 
export default Home;
