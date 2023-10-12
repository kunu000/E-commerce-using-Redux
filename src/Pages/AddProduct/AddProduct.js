// importing Hook
import { useState } from "react";
// importing css
import styles from "./AddProduct.module.css";
// importing function for notification
import Notification from "../../utils/Notification";
// importing firebase
import { storage, db } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

function AddProduct() {
  const [productDetails, setProductDetails] = useState({
    productName: "",
    productPrice: 0,
    productImg: null,
    productCategory: "",
    productDescription: "",
  });

  const [showUploading, setShowUploading] = useState(false);
  // percentage is used to contain how much percent of image dzgis uploaded to database
  const [percentage, setPercentage] = useState(0);

  // this function check whether the uploaded file is image or not
  // and if it is image then set productImg to image file inside setProductDetails
  const handleProductImg = (e) => {
    const types = ["image/jpg", "image/png", "image/jpeg"];
    const selectedFile = e.target.files[0];

    if (selectedFile && types.includes(selectedFile.type)) {
      setProductDetails((prev) => {
        return { ...prev, productImg: selectedFile };
      });
    } else {
      setProductDetails((prev) => {
        return { ...prev, productImg: null };
      });
      document.getElementById("ProductImg").value = null;
      Notification("Please select a valid image type jpeg or png", true);
    }
  };

  // this function add product to firebase database
  const handleAddProduct = (e) => {
    e.preventDefault();
    let {
      productName,
      productPrice,
      productImg,
      productCategory,
      productDescription,
    } = productDetails;

    if (
      productName &&
      productPrice &&
      productImg &&
      productCategory &&
      productDescription
    ) {
      // code from firebase
      const storageRef = ref(storage, `product-images/${productName}`);
      const uploadTask = uploadBytesResumable(storageRef, productImg);
      setShowUploading(true);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setPercentage(Math.trunc(progress));
        },
        (error) => {
          Notification("Product is not uploaded, something went wrong!", true);
          setShowUploading(false);
        },
        () => {
          // Handle successful uploads on complete
          // Fetching URL of uploaded image
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // Adding uploaded image url and other image details to firebase database
            const addDataToDatabase = async () => {
              await addDoc(collection(db, "products"), {
                productName,
                productPrice,
                productCategory,
                productDescription,
                productUrl: downloadURL,
              });
              Notification("Product uploaded successfully", false);

              // set value to "" or null of input's
              document.getElementById("productName").value = "";
              document.getElementById("productPrice").value = "";
              document.getElementById("productImg").value = null;
              document.getElementById("productCategory").value = "";
              document.getElementById("productDescription").value = "";
            };
            addDataToDatabase();
            setShowUploading(false);
          });
        }
      );
    } else {
      Notification("Please fill all the fields", true);
    }
  };

  return (
    <>
      <div className={styles.add_Product}>
        <h2>Add Product</h2>
        <hr />
        <form onSubmit={handleAddProduct}>
          <div>
            <label htmlFor="productName">Product Name : </label>
            <input
              type="text"
              id="productName"
              maxLength={100}
              onChange={(e) => {
                productDetails.productName = e.target.value;
              }}
            />
          </div>
          <div>
            <label htmlFor="productPrice">Product Price : </label>
            <input
              type="number"
              id="productPrice"
              min={1}
              onChange={(e) => {
                productDetails.productPrice = e.target.value;
              }}
            />
          </div>
          <div>
            <label htmlFor="productCategory">Choose Product Category : </label>
            <select
              id="productCategory"
              required
              onChange={(e) => {
                productDetails.productCategory = e.target.value;
              }}
            >
              <option value="">--select an option--</option>
              <option value="man">Man</option>
              <option value="women">Women</option>
              <option value="electronics">Electronics</option>
              <option value="jewellery">Jewellery</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="productDescription"
              style={{ verticalAlign: "top" }}
            >
              Product Description :{" "}
            </label>
            <textarea
              id="productDescription"
              cols="40"
              rows="10"
              placeholder="every line should be seperated by ','"
              onChange={(e) => {
                productDetails.productDescription = e.target.value;
              }}
            ></textarea>
          </div>
          <div>
            <label htmlFor="productImg">Product Image : </label>
            <input
              type="file"
              id="productImg"
              style={{ border: "none" }}
              onChange={handleProductImg}
            />
          </div>
          {showUploading && (
            <div className={styles.loading_container}>
              <span>{percentage}%</span>
              <div
                style={{
                  backgroundColor: "#50c950",
                  height: "100%",
                  width: `${percentage * 2}px`,
                }}
              ></div>
            </div>
          )}
          <div>
            <button>Submit</button>
          </div>
        </form>
      </div>
    </>
  );
}
// exporting AddProduct Component
export default AddProduct;
