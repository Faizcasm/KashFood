import mongoose from "mongoose";
const orderschema = new mongoose.Schema({
data:Array,
})
export const orders = mongoose.model('orders',orderschema)