import {delivered} from '../../models/ordermodel/deliverymodel.js'
const delivery = async(req,res)=>{
    const {name,email,address,pincode,phone} =req.body
    if(!name||!email||!address||!pincode||!phone){
        console.log("All fields are required");
        return res.status(404)
    }
    const deliverybase = await delivered.create({
        name,
        email,
        address,
        pincode,
        phone
    })
    if(!deliverybase){
        console.log("Failed");
        return res.status(404)
    }
    else{
        console.log("Done");
        return res.status(200).json(deliverybase)
    }
}
const getaddress=async(req,res)=>{
    const address = await delivered.findOneAndReplace()
    return res.status(200).json(address)
}
export {delivery,getaddress}