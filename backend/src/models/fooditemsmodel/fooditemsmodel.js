import mongoose from 'mongoose'

const foodSchema =new mongoose.Schema({
    foodImg:String,
    foodName:String,
    foodDescription:String,
    foodCategory:String,
    foodPrice:Number,
},{timestamps:true})
export const FoodItems = mongoose.model('fooditems',foodSchema)