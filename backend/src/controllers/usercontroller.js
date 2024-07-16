import { User } from '../models/usermodel/usermodel.js';
import {uploadOnCloudinary} from '../middlewares/cloudinary.js'
import nodemailer from 'nodemailer'
import path from 'path'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const generateTokens =async(userId)=>{
   try {
    const user = await User.findById(userId)
    const accessToken = user.generateAccessToken()
    user.accessToken=accessToken
    await user.save({validateBeforeSave:false});
    return {accessToken}
   } catch (error) {
    console.log("Something went wrong generatinmg tokens");
   }
}

const register =async(req,res)=>{
   try{
    const {username,email,password} = req.body
    if(!username||!email){
        console.log("All fields required");
        return res.status(301)
    }
    if(!password){
        console.log("Password is required");
        return res.status(301)
    }
    const user = await User.findOne({email:email})
    if(user){
        console.log("User already exists");
        return res.status(301)
    }
    console.log(username,password,email);
    const cretedUser=await User.create({
        email,
        username,
        password
    })
    if(!cretedUser){
        console.log("register failed");
        return res.status(301)
    }
    else{
        console.log("Register success");
        return res.status(200).json(cretedUser)
    }
   }
   catch{
    console.error('Error registering user:');
    return res.status(500).json({ message: "Internal server error" });
   }
}


//login

const login =async(req,res)=>{
   try{
    const {email,password} = req.body
    if(!email){
        console.log("All fields required");
        return res.status(301)
    }
    if(!password){
        console.log("Password is required");
        return res.status(301)
    }
    const user = await User.findOne({email:email})
    console.log(user);
    if(!user){
        console.log("User not exists");
        return res.status(401).json({message:"User does not exits"})
    }

    const isPASSok =  await user.isPasswordCorrected(password)
    if(!isPASSok){
        try {
        console.log("Password did not match :",isPASSok);
        return res.status(401).json({message:"Invalid Password"})

        } catch (error) {
            console.log("Ispasswordcorrected have issues",error);
            return res.status(401).json({message:"Issues"})
        }
    }
    else{
        const {accessToken} = await generateTokens(user._id)
        console.log("login success");
        return res.status(200).cookie('accessToken',accessToken,{secure:true,httpOnly:true,path:'https://kashfood.netlify.app',sameSite: 'None'})
       .json({user:user,accessToken})
    }
   }
   catch{
      return res.status(505).json({message:"This is controller fault"})
}
}
const logout = async(req,res)=>{
    const token = req?.cookies?.accessToken
    console.log(token);
const user =await User.findById(req?.user?.id)
console.log(user);
    return res.status(200)
    .clearCookie('accessToken',{secure:true,httpOnly:true,path:'https://kashfood.netlify.app',sameSite: 'None'}).json({message:"Logout success",user})
}
const getUser = async(req,res)=>{
    const user = await req.user
    console.log(user);
    return res.status(200).json(user)
}
const changePassword =async(req,res)=>{
    const {oldPassword,newPassword} = req.body
    const user = await User.findById(req.user?._id)
    const isPasswordCorrect = await user.isPasswordCorrected(oldPassword)

    if (!isPasswordCorrect) {
        console.log("invalid old password");
        return res.status(301)
    }

    user.password = newPassword
    await user.save({validateBeforeSave: false})

    return res
    .status(200)
    .json((200, {}, "Password changed successfully"))
}
const updateAccountDetails =async(req, res) => {
    const {newusername, newemail} = req.body

    if (!newusername || !newemail) {
        console.log("All fielda are required");
        return res.status(301)
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                username:newusername,
                email: newemail
            }
        },
        {new: true}
        
    ).select("-password")

    return res
    .status(200)
    .json((200, user, "Account details updated successfully"))
};


//nodemailer
const mailer = async(req,res)=>{
    const {from,subject,message} =req.body
    const to = "ebomber156@gmail.com"
    const transport = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:"clownm18@gmail.com",
            pass:"qqpx zpwx ogfv smtr"
        }
    })
    const mailoptions = {
        from:from,
        to:to,
        subject:subject,
        text:message
    }
    transport.sendMail(mailoptions,function(err,info){
        if(err){
            console.log("Something went wrong",err);
            return res.status(401)
        }
        console.log("Mail sended  :",info);
        return res.status(200).json(info)
    })
}
const forgotpassword = async(req,res)=>{
    const { email } = req.body;

    try {
        const user = await User.findOne({ email :email});
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user:"clownm18@gmail.com",
                pass:"qqpx zpwx ogfv smtr"
            }
        });
        const mailOptions = {
            from: 'clownm18@gmail.com',
            to: email,
            subject: 'Password Reset',
            text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
                    Please click on the following link, or paste this into your browser to complete the process:\n\n
                    http://localhost:5173/\n\n
                    Your password is ${user.password}
                    If you did not request this, please ignore this email and your password will remain unchanged.\n`
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error('Error sending email:', err);
                return res.status(500).json({ message: 'Error sending email' });
            }
            console.log('Email sent:', info.response);
            res.status(200).json({ message: 'Email sent successfully' });
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


const updateprofile = async (req, res) => {
    try {
        const userId = req.user?._id;
      
        if (!userId) {
            console.log("User ID not found in request");
            return res.status(400).json({ error: "User ID not found" });
        }

        const user = await User.findById(userId);
        if (!user) {
            console.log("No user found");
            return res.status(400).json({ error: "User not found" });
        }

        // Handle profile image upload
        const profileFile = req.files?.profile[0]?.path;
        console.log("profile file ",profileFile);
        if (!profileFile) {
            console.log("No profile file uploaded");
            return res.status(400).json({ error: "Profile file not uploaded" });
        }
console.log(profileFile);
        // Upload profile image to Cloudinary
        const profile = await uploadOnCloudinary(profileFile);
        if (!profile|| profile.error) {
            return res.status(400).json({ error: "Profile upload to Cloudinary failed" });
        }
        // Update user profile with Cloudinary URL
        user.profile = profile.url;

        const updatedUser = await user.save();
        if (!updatedUser) {
            console.log("Failed to update user profile");
            return res.status(400).json({ error: "Failed to update user profile" });
        }

        console.log("Profile updated successfully");
        return res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error updating profile:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};



export {register,login,logout,getUser,updateprofile,changePassword,updateAccountDetails,mailer,forgotpassword}
