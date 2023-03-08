/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },
  "/login": "UserController.login",
  "/send-otp": "UserController.sendOtp",
  "/check-otp": "UserController.checkOtp",
  "/send-email": "UserController.sendEmail",
  "/register": "UserController.register",
  
  
  "/check-old-password": "UserController.checkOldPassword",
  "/get-user": "UserController.getUserById",
  "/call-rest-api": "UserController.callRestApi",
  "/change-password": "UserController.changePassword",
  "/check-username-email": "UserController.chekUniqueEmailAndUSerName",
  "/update-profile": "UserController.updateProfile",
  "/add-user": "UserController.createUSer",
  "/update-pro-id": "UserController.updateProfilePicture",
  "/upload-avtar": "DocumentController.uploadAvatar",
  "/load-cart/:userId": "CartController.loadCartDetailByUserid",
  "/Update-cart-qty": "CartController.updateQuntity",
  "/Update-cart-orderid": "CartController.updateCartStatus",
  "/cart-details/:orderId": "CartController.cartDetailBProductId",
  "/all-products": "ProductController.getAllproducts",
  //
  "/product-details/:id": "ProductController.getProductDetailById",
  "/update-qty": "ProductController.updateStock",
  "/product-with-pagination": "ProductController.getAllproductsPagination",
  
  "/change-order-status": "OrderController.orderStatusChange",
  "/get-order-by-status/:status": "OrderController.getOrderByStatus",
  "/get-order-by-id/:id": "OrderController.getorderDetailsbyOrderId",

  
  //






  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
