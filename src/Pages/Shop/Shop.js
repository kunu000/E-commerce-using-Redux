// importing Hooks
import { useEffect } from "react";
// importing component from react-loader-spinner package
// it shows loading image
import { Oval } from "react-loader-spinner";
// importing Products Component
import Products from "../../Components/Products/Products";
// importing css
import styles from "./Shop.module.css";

// importing Hooks from react-redux
import { useDispatch, useSelector } from "react-redux";
// importing function from productsReducer
import {
  fetchProductsDataAsync,
  productsSelector,
} from "../../redux/reducers/productsReducer";
import { actions } from "../../redux/reducers/productsReducer";

function Shop({ userId }) {
  const categories = ["electronics", "jewellery", "man", "women"];
  // dispatch is used to dispatch action object to reducer function
  const dispatch = useDispatch();
  // product contain productsReducer state
  const products = useSelector(productsSelector);

  // this hook fetch products data from firebase
  useEffect(() => {
    dispatch(fetchProductsDataAsync());
  }, [dispatch]);

  // it call under handleFilter when category checkbox are clicked
  const handleCategory = (checked, categoryFilter, result) => {
    if (checked) {
      const temp = [...products.categoryFilters];
      temp.push(categoryFilter);
      dispatch(actions.setcategoryFilters(temp));

      dispatch(
        actions.setSearchProductsData(
          result.filter((item) => {
            const temp = [...products.categoryFilters];  
            temp.push(categoryFilter);
            for (let x of temp) {
              if (x === item.productCategory) {
                return true;
              }
            }
            return false;
          })
        )
      );
    } else {
      const temp = [...products.categoryFilters];
      const index = temp.indexOf(categoryFilter);
      temp.splice(index, 1);
      dispatch(actions.setcategoryFilters(temp));

      dispatch(
        actions.setSearchProductsData(
          temp.length === 0
            ? result
            : result.filter((item) => {
                // temp.has(item.productCategory);
                for (let x of temp) {
                  if (x === item.productCategory) {
                    return true;
                  }
                }
                return false;
              })
        )
      );
    }
  };

  const handleSearch = (data) => {
    // filters items based on product name
    const result = data.filter((item) => {
      let temp1 = item.productName.toLowerCase();
      let temp2 = products.searchValue;
      if (temp1.length >= temp2.length) {
        let index = temp1.indexOf(temp2);
        if (index === 0) {
          return item;
        }
      }
      return null;
    });

    return result;
  };

  const handleRange = (value) => {
    dispatch(actions.setPriceValue(value));
  };

  useEffect(() => {
    handleFilter();
  }, [products.priceValue]);

  useEffect(() => {
    handleFilter();
  }, [products.searchValue]);

  // filter product based on price and category
  const handleFilter = (checked, categoryFilter) => {
    // filter based on price
    let result = products.productsData.filter((item) => {
      if (products.priceValue === "100000") {
        return true;
      } else if (item.productPrice <= Number(products.priceValue)) {
        return true;
      }
      return false;
    });

    if (products.searchValue) {
      // filter based on product name
      result = handleSearch(result);
    }
    // console.log(products.categoryFilters)

    if (categoryFilter) {
      // filter based on product category
      handleCategory(checked, categoryFilter, result);
    } else if (products.categoryFilters.length === 0) {
      dispatch(actions.setSearchProductsData(result));
      // setSearchProductsData(result);
    } else {
      dispatch(
        actions.setSearchProductsData(
          result.filter((item) => {
            const temp = [...products.categoryFilters];
            temp.push(categoryFilter);
            for (let x of temp) {
              if (x === item.productCategory) {
                return true;
              }
            }
            return false;
            // new Set(products.categoryFilters).has(item.productCategory);
          })
        )
      );
    }
  };

  return (
    <>
      {/* isLoading is true the show loading image else show html element  */}
      {products.isLoading ? (
        <div className={styles.shop_loading_container}>
          <Oval />
        </div>
      ) : (
        <>
          <div className={styles.filter}>
            <h2 className={styles.filter_title}>Filter</h2>
            <div className={styles.panel}>
              <div style={{ textAlign: "center", marginLeft: "0" }}>
                <label htmlFor="priceRange">
                  Price : {products.priceValue}
                </label>
                <br />
                <input
                  type="range"
                  id="priceRange"
                  value={products.priceValue}
                  min={100}
                  max={100000}
                  // onChange={handleFilter}
                  onChange={(e) => handleRange(e.target.value)}
                />
              </div>
            </div>
            <h2 className={styles.filter_title}>Category</h2>
            <div className={styles.panel}>
              {/* map over categories array */}
              {categories.map((val, i) => (
                <div key={i}>
                  <input
                    type="checkbox"
                    value={val}
                    id={val}
                    onClick={(e) => handleFilter(e.target.checked, val)}
                  />
                  <label htmlFor={val}>{val}</label>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.rightSide}>
            <div className={styles.search_container}>
              <i className="fa-solid fa-magnifying-glass"></i>
              <input
                type="search"
                onChange={(e) =>
                  dispatch(actions.setSearchValue(e.target.value.toLowerCase()))
                }
                placeholder="Search for products"
              />
            </div>
            {/* this Component contain all products  */}
            <Products userId={userId} />
          </div>
        </>
      )}
    </>
  );
}
// exporting Shop Component
export default Shop;
