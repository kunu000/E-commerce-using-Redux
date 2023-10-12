// importing css
import styles from "./ProductDetails.module.css";
// importing hooks from react-router-dom
import { useParams } from "react-router-dom";
// importing Hooks
import { useEffect } from "react";
// importing component from react-loader-spinner package
// it shows loading image
import { Oval } from "react-loader-spinner";
// importing page
import Page404 from "../Page404/Page404";

// importing function from productsReducer
import {
  fetchProduct,
  productsSelector,
  handleAddToCart,
} from "../../redux/reducers/productsReducer";
// importing Hooks from react-redux
import { useDispatch, useSelector } from "react-redux";

function ProductDetails({ userId }) {
  const id = useParams();
    // productsData contain productsReducer state
  const productsData = useSelector(productsSelector);
    // dispatch is used to dispatch action object to reducer function
  const dispatch = useDispatch();

  // this hook fetch data of product from firebase database
  useEffect(() => {
    dispatch(fetchProduct({ id }));
  }, [dispatch, id]);

  return (
    <>
      {/* if isLoading is true then show loading image else show product */}
      {productsData.isLoading ? (
        <div
          style={{
            height: "100vh",
            minHeight: "500px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Oval />
        </div>
      ) : // if product is not present in database then show page404 else show product details
      productsData.product ? (
        <div className={styles.product_details_container}>
          <div className={styles.left}>
            <img
              src={productsData.product.productUrl}
              alt={productsData.product.productName}
              className={styles.product_img}
            />
          </div>
          <div className={styles.right}>
            <h3 className={styles.product_name}>
              {productsData.product.productName}
            </h3>
            <span style={{ fontSize: "13px" }}>price</span>
            <h2 className={styles.product_price}>
              Rs {productsData.product.productPrice}
            </h2>
            <button
              disabled={productsData.disableCartButton}
              className={styles.add_to_cart}
              onClick={(e) =>
                dispatch(
                  handleAddToCart({ e, item: productsData.product, userId })
                )
              }
            >
              Add to cart
            </button>
            <div className={styles.product_description}>
              <h2>Details</h2>
              <ul>
                {productsData.product.productDescription &&
                  productsData.product.productDescription
                    .split(",")
                    .map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <Page404 />
      )}
    </>
  );
}
// exporting ProductDetails Component
export default ProductDetails;
