// importing css
import styles from "./ProductCard.module.css";

// This ProductCard function is used to shop product in Cart
function ProductCard({
  item,
  deleteItemFromCart,
  handleIncrement,
  handleDecrement,
}) {
  return (
    <>
      <div className={styles.outer}>
        <div className={styles.product_card_container}>
          <div className={styles.product_cart_img}>
            <img src={item.productUrl} alt="" />
          </div>
          <div className={styles.product_cart_name}>
            <p>{item.productName}</p>
          </div>
          <div className={styles.product_cart_price}>
            <p>₹ {item.productPrice}</p>
          </div>
          <div className={styles.product_cart_qty}>
            <span onClick={() => handleIncrement(item.productId)}>+</span>
            <p>{item.qty}</p>
            <span onClick={() => handleDecrement(item.productId)}>-</span>
          </div>
          <div className={styles.product_cart_del}>
            <i
              className="fa-solid fa-trash"
              onClick={() => deleteItemFromCart(item)}
            ></i>
          </div>
        </div>
      </div>
    </>
  );
}
// exporting ProductCard Component
export default ProductCard;
