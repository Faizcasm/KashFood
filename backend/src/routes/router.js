import { Router } from "express";
import payment from '../controllers/pay/pay.js'
import {order, getorderdata } from "../controllers/orders/orders.js";
import {delivery, getaddress} from "../controllers/orders/delivery.js";
import nodemail from "../controllers/mail/mailer.js";
import { getUser, login, logout, register ,updateprofile} from "../controllers/usercontroller.js";
import {upload} from '../middlewares/multer.js'
import { VerifyToken} from "../middlewares/Auth.js";
import { check,addAddressDetails, AddFood, AddOrders, addToCart, getAddress, getallorders, getcartdata, getFood, getorders, removeFood, removefoodfromCart } from "../controllers/Fooditems/fooditems.js";
const router = Router()
router.route('/check').post(check)
router.route('/register').post(register)
router.route('/updateprofile').post(upload.fields([
    {
        name:"profile",
        maxCount:1
    }
]),updateprofile)
router.route('/login').post(login)
router.route('/user').get(VerifyToken,getUser)
router.route('/logout').post(logout)
router.route('/payment').post(payment)
router.route('/order').post(VerifyToken,order)
router.route('/getorderdata').get(VerifyToken,getorderdata)
router.route('/getaddress').get(VerifyToken,getaddress)
router.route('/deliveryinfo').post(VerifyToken,delivery)
router.route('/mailing').post(VerifyToken,nodemail)
//addaddress
router.route('/address').post(VerifyToken,addAddressDetails)
router.route('/getaddresses').get(VerifyToken,getAddress)

//addOrders
router.route('/orders').post(VerifyToken,AddOrders)
router.route('/getorders').get(VerifyToken,getorders)
//addtocart-food
router.route('/addtocart').post(VerifyToken,addToCart)
router.route('/getcartdata').get(VerifyToken,getcartdata)
router.route('/removecartfood/:id').delete(VerifyToken,removefoodfromCart)
//menu-food admin 
router.route('/addfood').post(upload.fields([
    {
        name:"foodImg",
        maxCount:1
    }
]),AddFood)
router.route('/getfood').get(getFood)
router.route('/removefood/:id').delete(removeFood)
router.route('/getallorders').get(getallorders)
export default router
