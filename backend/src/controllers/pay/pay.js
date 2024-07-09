import Stripe from "stripe";
import {v4 as uuid} from 'uuid'
const stripe = Stripe("sk_test_51OgMFHSIQTzOyhReSrWxTCxaBX0jezGzv91trSZh6NjEG70IwbQxhp9WYl40vaAakvTShtyWBDDs7LOXnojkIe7400iGKdenj8")
const payment = async(req,res)=>{
   
    const {product,token}=req.body
    console.log("product :",product);
    console.log("product price :",product.price);
    const idempotencyKey =uuid()

    return stripe.customers.create({
        email: token.email,
        source : token.id,
    }).then(customer=>{
        stripe.paymentIntents.create({
            amount :product.price*100,
            currency :'usd',
            customer:customer.id,
            receipt_email:token.email,
            description :"purchase of product.name"
        },{idempotencyKey})
    }).then(result=>{
        console.log("Payment success");
       return res.status(200).json(result)
    }).catch(err=>{
        console.log("error",err);
        return res.status(404).json({message:"Payment failed"})
    })
}
export default payment
