import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import firebase
import {
  onSnapshot,
  query,
  collection,
  updateDoc,
  arrayUnion,
  getDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase";
import Notification from "../../utils/Notification";

export const fetchProductsDataAsync = createAsyncThunk(
  "product/fetchProductsData",
  async (_, thunkAPI) => {
    const q = query(collection(db, "products"));
    onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ productId: doc.id, ...doc.data() });
      });
      thunkAPI.dispatch(actions.setIsLoading(false));
      thunkAPI.dispatch(actions.setSearchProductsData(data));
      thunkAPI.dispatch(actions.setProductsData(data));
    });
  }
);

export const handleAddToCart = createAsyncThunk(
  "products/addToCart",
  async (args, thunkAPI) => {
    const { e, item, userId } = args;
    e.stopPropagation();
    thunkAPI.dispatch(actions.setDisableCartButton(true));
    // setDisableCartButton(true);
    if (userId) {
      async function addproduct() {
        const docRef = doc(db, "usersCarts", userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          // product exist
          // find index of product in cart
          let index = docSnap
            .data()
            .products.findIndex((obj) => obj.productId === item.productId);
          if (index === -1) {
            // update product to cart
            async function updateDocs() {
              await updateDoc(doc(db, "usersCarts", userId), {
                products: arrayUnion({ ...item, qty: 1 }),
              });
              Notification("Item added to cart", false);
              thunkAPI.dispatch(actions.setDisableCartButton(false));
              //   setDisableCartButton(false);
            }
            updateDocs();
          } else {
            Notification("Item is already in cart", true);
            thunkAPI.dispatch(actions.setDisableCartButton(false));
            // setDisableCartButton(false);
          }
        } else {
          console.log("No such document exist!");
          thunkAPI.dispatch(actions.setDisableCartButton(false));
        }
      }
      addproduct();
    } else {
      Notification("please Login before adding items to cart", true);
      thunkAPI.dispatch(actions.setDisableCartButton(false));
      //   setDisableCartButton(false);
    }
  }
);

export const fetchProduct = createAsyncThunk(
  "products/fetchProduct",
  async ({ id }, thunkAPI) => {
    onSnapshot(doc(db, "products", id.productId), (doc) => {
      const data = doc.data();
      if (data) {
        thunkAPI.dispatch(actions.setProduct({ ...data, productId: doc.id }));
        thunkAPI.dispatch(actions.setIsLoading(false));
      } else {
        thunkAPI.dispatch(actions.setProduct(undefined));
        thunkAPI.dispatch(actions.setIsLoading(false));
      }
    });
  }
);

const initialState = {
  isLoading: true,
  searchedProductsData: [],
  productsData: [],
  searchValue: "",
  priceValue: "100000",
  categoryFilters: [],
  disableCartButton: false,
  product: {},
};

const productsSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setSearchProductsData(state, action) {
      state.searchedProductsData = action.payload;
    },
    setProductsData(state, action) {
      state.productsData = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setPriceValue(state, action) {
      state.priceValue = action.payload;
    },
    setcategoryFilters(state, action) {
      state.categoryFilters = action.payload;
    },
    setDisableCartButton(state, action) {
      state.disableCartButton = action.payload;
    },
    setProduct(state, action) {
      state.product = action.payload;
    },
  },
});

export const productsReducer = productsSlice.reducer;
export const actions = productsSlice.actions;
export const productsSelector = (state) => state.productsReducer;
