import nodemailer from 'nodemailer'
const nodemail = async(req,res)=>{
    const email =req.body.email
    const to = "ebomber156@gmail.com"
    const name = req.body.name
    const message = req.body.message
   
    const transport =nodemailer.createTransport({
       service:"gmail",
       auth:{
           user:"clownm18@gmail.com",
           pass:"qqpx zpwx ogfv smtr"
       }
   
    })
    const mailoption ={
       email:email,
       to:to,
       name:name,
       message:message
    }
   await transport.sendMail(mailoption,function(err,info){
       if(err){
           console.log(err);
           return res.status(404).json({message:"something wrong"})
       }else{
           console.log(info);
           return res.status(200).json({message:"Message sent"})
       }
    })}
    export default nodemail