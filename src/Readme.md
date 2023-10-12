# Buy busy :

It is an E-Commerce that enables individuals to browse available items, add or remove them from their shopping cart, add products to website,view their orders, and complete the purchasing process.

This React app is integrated with Firebase for Create, Read, Update, and Delete (CRUD) functionality of products in the cart as well as for user Authentication.

# Feature

1. firebase authentication to authenticate user, firebase storage for storing product image, firebase database to store product,user cart and user order.
2. routing using react-router-dom for different pages.
3. Redux to manage product and authentication state.
4. third party library like react-toastify for notification and react-loader-spinner for loading SVG.
5. search bar to find product
6. filter to filter the products based on price and product category.

# Pages :

1. Home page - show the home page.
2. Shop page - contain search bar, filter and a product component to show product.
3. Add product page - contain a form that takes product details and add the product to firebase database.
4. Page404 page - to show error page if page is not found.
5. Order page - is to display the products the user has purchased and their order date..
6. Cart page - to show the product add by user in cart, show total price, and total quantity of products.
7. Login page - contain a login form to authenticate user by firebase Authentication.
8. Signup page - contain a signup form to create a new user in database.
9. ProductDetails page - show the product detail opened(clicked) by user and five functionality to add the product to cart.
10. ProductCart page - show each product of cart and give functionality to incrementing, decrementing and deleting products from cart.

# Components :

1. Navbar : contain navigation links to navigate to another page. All pages comes under this component.
2. ProtectedRoute : to protect pages from opening without login or signup.
3. ProtectedRouteLoginAndSignup : to protect Login and Signup pages from opening after the user is login or signup successfully.
4. Products : to show all the products inside Shop page.
5. ContactInformation : to show the contact info. in Home page.
6. App : contain routing for each page.
7. firebase : contain firebase configuration.

# utils :

1. Notification : this function is used by many component to show notifcations.

# Redux reducers :

1. loginReducer : to manage login state.
2. SignupReducer : to manage signup state.
3. productsReducer : to manage products state.

# Assets :

It contain images of icons ,logo, banner etc.

# Third party packages used :

1. react-router-dom : for implemention routing for different pages.
2. react-toastify : for toast notifications.
3. react-loader-spinner : for loading SVG(image).
4. react-redux : for state management.

# Hooks used :

1. useRef()
2. useState()
3. useEffect()
4. useNavigate()
5. useLocation()
6. useDispatch()
7. useSelector()
8. useParams()
