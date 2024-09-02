const express = require('express')

const routes = new express.Router()

const userController = require('./controllers/userController')

const productController = require('./controllers/productController')

const wishlistController = require('./controllers/wishlistController')

const jwtMiddleware = require('./middleware/jwtMiddleware')

const cartController = require('./controllers/cartController')
//path to get all rpducts

routes.get('/all-products', productController.getAllProductController)
routes.post(`/register`, userController.registerController)

routes.post('/login',userController.loginController)

routes.post('/add-to-wishlist',jwtMiddleware ,wishlistController.addtoWishlist)

routes.get('/get-wishlistItem',jwtMiddleware,wishlistController.getWisslistController)

routes.delete('/delete-wishlistItem/:id', wishlistController.removeWishlistItem)

routes.get('/view-product/:id', productController.getAProduct)

//cart

routes.post('/cart',jwtMiddleware, cartController.addToCartController)

routes.get('/getCart',jwtMiddleware,cartController.getCartController)

routes.delete('/deletecartitem/:id',cartController.removeItemFromCart)

routes.delete('/emptyCart',jwtMiddleware,cartController.emptyCart)

routes.get('/cart/increment/:id',cartController.incrementController)

routes.get('/cart/decrement/:id',cartController.decrementController)



module.exports = routes
