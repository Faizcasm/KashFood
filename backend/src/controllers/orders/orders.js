import { orders } from "../../models/ordermodel/ordermode.js";
import { User } from "../../models/usermodel/usermodel.js";
const order = async(req,res)=>{
    const {data} =req.body
    if(!data){
        console.log("no data");
        return res.status(404)
    }
    const orderdata = await User.findOne(cart)
    await orderdata.save({validateBeforeSave:false})
    if(!orderdata){
        console.log("data not saved");
        return res.status(402)
    }
    else{
        console.log("data saved");
        return res.status(200).json(orderdata)
    }
    
}
const getorderdata =async(req,res)=>{
    const data = await orders.find()
    console.log(data);
    return res.status(200).json(data)
}
export {order,getorderdata}
