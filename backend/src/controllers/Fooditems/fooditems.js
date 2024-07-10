
//starts admin 
import { uploadOnCloudinary } from "../../middlewares/cloudinary.js";
import { FoodItems } from "../../models/fooditemsmodel/fooditemsmodel.js";
import mongoose from "mongoose";
import { User } from "../../models/usermodel/usermodel.js";

const check =async(req,res)=>{
 return res.status(200).json({message:"It is working"});
}


const AddFood = async(req,res)=>{
    const {foodName,foodDescription,foodCategory,foodPrice} = req.body
    if(!foodCategory||!foodName||!foodDescription||!foodPrice){
        console.log("Please add data");
        return res.status(404).json({message:"Please enter data"})
    }
    const foodImgpath = req.files?.foodImg[0]?.path
    console.log(foodImgpath);
    if(!foodImgpath){
        console.log("path missing");
        return res.status(301)
    }
    const foodImg = await uploadOnCloudinary(foodImgpath)
    if(!foodImg){
        console.log("foodImg required");
        return res.status(301)
    }
    const foodData = await FoodItems.create({
        foodName,
        foodImg:foodImg.url,
        foodCategory,
        foodDescription,
        foodPrice
    })
    if(!foodData){
        console.log("cannot save data");
        return res.status(400)
    }
    else{
        console.log("food data saved");
        return res.status(200).json(foodData)
    }
}

//getfood
const getFood = async(req,res)=>{
    const food = await FoodItems.find()
    return res.status(200).json(food)
}



const removeFood = async (req, res) => {
  try {
    
    console.log('Request params:', req.params); // Debug log to see the request parameters
    console.log('Request params.id:', req.params.id); // Log the specific id parameter

    const foodId = req.params.id; // Accessing the route parameter
    console.log(JSON.stringify(foodId));
    console.log('Food ID:', foodId); // Log the extracted foodId

    // Validate if the foodId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(foodId)) {
      return res.status(400).json({ message: 'Invalid ID parameter' });
    }

    const food = await FoodItems.findById(foodId);
    if (!food) {
      return res.status(404).json({ message: 'Food item not found' });
    }

    await FoodItems.deleteOne(food)
    res.status(200).json({ message: 'Food item removed successfully' });
  } catch (err) {
    console.error('Error in removeFood controller:', err); // Detailed error log
    res.status(500).json({ message: 'Server error' });
  }
};

const getallorders=async(req,res)=>{
  const user = await User.find()
 return res.status(200).json(user)
}


//starts cart user
const addToCart = async (req,res) => {
  try {
    const userId = req?.user?._id
    console.log(userId);
    const {item} =req.body
    console.log(item);
      const user = await User.findById(req?.user?._id);
      if (!user) {
          console.log('User not found');
          return res.status(404);
      }
     
      const existingItemIndex = user.cart.findIndex(cartItem => cartItem._id.toString() === item._id);
    
      if (existingItemIndex !== -1) {
        // Item already exists in the cart, increment the quantity
        user.cart[existingItemIndex].quantity +=1;
        console.log('Item quantity incremented in cart');
        return res.status(200).json({message:"already available"})
      }// else {
      //   // Item does not exist in the cart, add it with quantity 1
      //   user.cart.push({ ...item, quantity: 1 });
      //   console.log('Item added to cart');
        
      // }


      user.cart.push(item);
      await user.save();
      console.log('Item added to cart');
      return res.status(200).json({message:"Item addedd"})
  } catch (error) {
      console.error('Error adding item to cart:', error);
      return res.status(400)
  }
};

const getcartdata=async(req,res)=>{
  const user = await User.findById(req?.user?._id);
  const data =user.cart
 return res.status(200).json(data)
}


const removefoodfromCart = async (req, res) => {
  
  try {
    const  itemId  = req.params.id;
    console.log('Food ID:', itemId);

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: 'Invalid item ID' });
    }

    const user = await User.findById(req?.user?._id);
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    user.cart = user.cart.filter(cartItem => cartItem._id.toString() !== itemId);
    await user.save();

    console.log("Removed item:", itemId);
    res.status(200).json({ message: 'Food item removed successfully' });
  } catch (err) {
    console.error('Error in removeFood controller:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


//starts details user
const addAddressDetails = async (req,res) => {
  try {
    const userId = req?.user?._id
    console.log(userId);
    const {name,email,address,pincode,phone} =req.body
    if(!name||!email||!address||!pincode||!phone){
      console.log("All fields required");
      return res.status(404)
    }
      const user = await User.findById(req?.user?._id);
      if (!user) {
          console.log('User not found');
          return res.status(404);
      }
      user.details.push(name,email,address,pincode,phone);
      await user.save();
      console.log('Address saved');
      return res.status(200).json({message:"Address saved"})
  } catch (error) {
      console.error('Error adding item to cart:', error);
      return res.status(400)
  }
};
const getAddress=async(req,res)=>{
  const user = await User.findById(req?.user?._id);
  const data =user.details
 return res.status(200).json(data)
}


//starts orders user
const AddOrders = async (req,res) => {
  try {
    const userId = req?.user?._id
    console.log(userId);
    const {cart} =req.body
    if(!cart){
      console.log("cart is required");
      return res.status(404)
    }
      const user = await User.findById(req?.user?._id);
      if (!user) {
          console.log('User not found');
          return res.status(404);
      }
      
      user.orders.push(cart);
      await user.save();
      console.log('Item ordered success');
      return res.status(200).json({message:"Ordered"})
  } catch (error) {
      console.error('Error adding item to cart:', error);
      return res.status(400)
  }
};
const getorders=async(req,res)=>{
  const user = await User.findById(req?.user?._id);
  const data =user.orders
  
 return res.status(200).json(data)
}
export {AddFood,getFood,removeFood,addToCart,
  getAddress,getcartdata,removefoodfromCart,addAddressDetails,AddOrders,getorders,getallorders,check}
