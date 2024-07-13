import { User } from '../models/usermodel/usermodel.js';
import {uploadOnCloudinary} from '../middlewares/cloudinary.js'
import nodemailer from 'nodemailer'
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
    console.log(req.files?.profile);
    const avatarfilepath = req.files?.profile[0]?.path
    console.log(avatarfilepath);
    if(!avatarfilepath){
        console.log("path missing");
        return res.status(301)
    }
    const profile = await uploadOnCloudinary(avatarfilepath)
    if(!profile){
        console.log("Avatar required");
        return res.status(301)
    }
    // const hashedpass = await bcrypt.hash(password,10)
    const cretedUser=await User.create({
        email,
        username,
        password,
        profile:profile.url
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
   return res.status(404).json({message:"Something wrong in multer"})
      
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

export {register,login,logout,getUser,changePassword,updateAccountDetails,mailer,forgotpassword}
