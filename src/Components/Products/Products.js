// importing css
import styles from "./Products.module.css";

// importing Icon image
import sadCartIcon from "../../Assets/Images/icons/sadcart.PNG";

// importing hook from react-router-dom library
import { useNavigate } from "react-router-dom";

// importing Hooks from react-redux
import { useDispatch, useSelector } from "react-redux";
// importing function from productsReducer
import {
  handleAddToCart,
  productsSelector,
} from "../../redux/reducers/productsReducer";

function Products({ userId }) {
  // navigate is used to navigate to different page
  const navigate = useNavigate();
  // dispatch is used to dispatch action object to reducer function
  const dispatch = useDispatch();
  // product contain productsReducer state
  const products = useSelector(productsSelector);

  return (
    <>
      {/* if isLoading is true then return null else return html element */}
      {products.isLoading ? null : (
        <section id={styles.product1} className={styles.section_p1}>
          <div className={styles.pro_container}>
            {/* if productData legth is 0 then show no product found else show products  */}
            {products.searchedProductsData.length !== 0 ? (
              products.searchedProductsData.map((item, i) => (
                <div
                  className={styles.pro}
                  key={i}
                  onClick={() => {
                    if (!products.disableCartButton) {
                      navigate(`/shop/${item.productId}`);
                    }
                  }}
                >
                  <img src={item.productUrl} alt="" />
                  <div className={styles.des}>
                    <h3>{item.productName}</h3>
                    <h4>Rs {item.productPrice}</h4>
                    <button
                      disabled={products.disableCartButton}
                      className={styles.cart}
                      onClick={(e) =>
                        dispatch(handleAddToCart({ e, item, userId }))
                      }
                    >
                      <i className="fa-solid fa-cart-shopping"></i>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.no_product_container}>
                <img src={sadCartIcon} alt="" />
                <span>No Products found!</span>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
}

// exporting Products Component
export default Products;
