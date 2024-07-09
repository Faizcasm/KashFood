import mongoose from 'mongoose'
const deliverySchema = new mongoose.Schema({
name:String,
email:String,
address:String,
pincode:String,
phone:String
},{timestamps:true})
export const delivered = mongoose.model('delivery',deliverySchema)