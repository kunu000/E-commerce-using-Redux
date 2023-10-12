// importing Hooks
import { useEffect, useState } from "react";

// importing css
import styles from "./Order.module.css";

// importing firebase
import { db } from "../../firebase";
import { getDoc, doc } from "firebase/firestore";

import React from "react";

// importing Component from react-router-dom
import { Link } from "react-router-dom";

function Order({ userId }) {
  // orders is used to contain user's orders
  const [orders, setOrders] = useState([]);

  // this hook fetch data of user's orders from database
  useEffect(() => {
    async function fetch() {
      const docRef = doc(db, "usersOrders", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        let data = docSnap.data().orders;
        setOrders(sortOrders(data, data.length));
      } else {
        console.log("No such document!");
      }
    }
    fetch();
  }, [userId]);

  const sortOrders = (arr, n) => {
    // bubble sort technique
    // sorting user's orders according to dates
    // resent orders come first

    var i, j, temp;
    var swapped;
    for (i = 0; i < n - 1; i++) {
      swapped = false;
      for (j = 0; j < n - i - 1; j++) {
        if (new Date(arr[j].orderDate) < new Date(arr[j + 1].orderDate)) {
          // Swap arr[j] and arr[j+1]
          temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          swapped = true;
        }
      }

      // IF no two elements were
      // swapped by inner loop, then break
      if (swapped === false) break;
    }
    return arr;
  };

  return (
    <>
      <div className={styles.myOrder_container}>
        <h1>My Orders</h1>
        <hr />
        {/* if orders have nothing then show 'no orders found' else show orders  */}
        {orders.length === 0 ? (
          <div className={styles.no_orders}>
            <span>No Orders Found!</span>
          </div>
        ) : (
          <div className={styles.order_outer_container}>
            {orders.map((item, i) => (
              <React.Fragment key={i}>
                <h2 className={styles.order_date}>
                  Order date : {item.orderDate}
                </h2>
                <div className={styles.outer_order_table}>
                  <table className={styles.order_table}>
                    <thead>
                      <tr>
                        <th style={{ width: "270px" }}>Product name</th>
                        <th>Product Price</th>
                        <th>Product quantity</th>
                        <th>Total Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {item.products.map((prod, i) => (
                        <tr key={i}>
                          <td>
                            <Link to={`/shop/${prod.productId}`}>
                              {prod.productName}
                            </Link>
                          </td>
                          <td>₹ {prod.productPrice}</td>
                          <td>{prod.qty}</td>
                          <td>₹ {prod.productPrice * prod.qty}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan={3}></td>
                        <td>₹ {item.total}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
// exporting Order Component
export default Order;
