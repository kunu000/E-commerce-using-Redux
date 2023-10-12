// importing css
import styles from "./Cart.module.css";

// importing firebase
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../firebase";

// importing Hooks
import { useEffect, useState } from "react";

// importing Component
import ProductCard from "../ProductCard/ProductCard";

// importing Notification function
import Notification from "../../utils/Notification";

// import Hook from react-router-dom library
import { useNavigate } from "react-router-dom";

// importing cart icon
import cartIcon from "../../Assets/Images/icons/emptycart.png";

function Cart({ userId }) {
  // items is used to contain products in cart
  // total contain total price
  // qty contain total quantity

  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [qty, setQty] = useState(0);
  const navigate = useNavigate();

  // this hook fetch data of user's cart from firebase database
  // if data exists then it set the values for items, total, qty.
  useEffect(() => {
    async function fetch() {
      const docRef = doc(db, "usersCarts", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data().products;
        setItems([...data]);

        let itemsTotal = 0;
        let itemsQty = 0;
        for (let x of data) {
          itemsQty += x.qty;
          itemsTotal += Number(x.productPrice) * x.qty;
        }
        setQty(itemsQty);
        setTotal(itemsTotal);
      } else {
        console.log("No such document!");
      }
    }
    fetch();
  }, [userId]);

  // this function take product and delete it from user's cart in database
  const deleteItemFromCart = (pro) => {
    const index = items.findIndex((obj) => obj.productId === pro.productId);
    let temp = [...items];
    temp.splice(index, 1);

    const itemsQty = pro.qty;
    const TotalQtyPrice = pro.productPrice * itemsQty;

    // updating data in firebase
    async function update() {
      const productRef = doc(db, "usersCarts", userId);
      await updateDoc(productRef, {
        products: temp,
      });
      setItems(temp);
      setQty(qty - itemsQty);
      setTotal(total - TotalQtyPrice);
      Notification("Product removed", false);
    }
    update();
  };

  // this function increment the quantity of specific product in database
  const handleIncrement = (productId) => {
    const index = items.findIndex((obj) => obj.productId === productId);
    let temp = [...items];
    const quantity = temp[index].qty;
    const productPrice = Number(temp[index].productPrice);

    temp[index] = { ...temp[index], qty: quantity + 1 };

    // updating value in firebase
    async function update() {
      const productRef = doc(db, "usersCarts", userId);
      await updateDoc(productRef, {
        products: temp,
      });
      setQty(qty + 1);
      setTotal(total + productPrice);
      setItems(temp);
    }
    update();
  };

  // this function decrement the quantity of specific product in database
  const handleDecrement = (productId) => {
    const index = items.findIndex((obj) => obj.productId === productId);
    let temp = [...items];
    let quantity = temp[index].qty;
    let productPrice = Number(temp[index].productPrice);

    // if quantity is greater than 1 then udate value in firebase
    // else delete item from database
    if (quantity > 1) {
      temp[index] = { ...temp[index], qty: quantity - 1 };

      // updating value in firebase
      async function update() {
        const productRef = doc(db, "usersCarts", userId);
        await updateDoc(productRef, {
          products: temp,
        });
        setItems(temp);
        setTotal(total - productPrice);
        setQty(qty - 1);
      }
      update();
    } else {
      deleteItemFromCart(items[index]);
    }
  };

  // this function move data from user's cart to user's order
  const handlePurchase = (products) => {
    // remove data from user'cart in database
    async function removeData() {
      const productRef = doc(db, "usersCarts", userId);
      await updateDoc(productRef, {
        products: [],
      });
    }

    // add data to orders of user
    async function addData() {
      const orderRef = doc(db, "usersOrders", userId);
      let date = new Date();
      await updateDoc(orderRef, {
        orders: arrayUnion({
          orderDate:
            date.toLocaleDateString() + " " + date.toLocaleTimeString(),
          products: products,
          total: total,
        }),
      });
      navigate("/order");
    }
    removeData();
    addData();
  };

  return (
    <div className={styles.cart_container}>
      <h1>Cart</h1>
      <hr />
      <br />
      {items.map((product, i) => (
        <ProductCard
          item={product}
          key={i}
          deleteItemFromCart={deleteItemFromCart}
          handleIncrement={handleIncrement}
          handleDecrement={handleDecrement}
        />
      ))}
      {/* if items.length is 0 then show 'your cart is empty' else show item details */}
      {items.length === 0 ? (
        <div className={styles.empty_cart_container}>
          <img src={cartIcon} alt="" />
          <span>Your Cart is Empty!</span>
          <button onClick={() => navigate("/shop")}>Return To Shop</button>
        </div>
      ) : (
        <div className={styles.cart_summary}>
          <h2>Cart Summary</h2>
          <hr />
          <div className={styles.flex}>
            <h3>Total Price :</h3>
            <h3>₹ {total}</h3>
          </div>
          <div className={styles.flex}>
            <h3>Total Quantity :</h3>
            <h3>{qty}</h3>
          </div>
          <button
            className={styles.purchase_btn}
            onClick={() => handlePurchase(items)}
          >
            Purchase
          </button>
        </div>
      )}
    </div>
  );
}

// exporting Cart component
export default Cart;
