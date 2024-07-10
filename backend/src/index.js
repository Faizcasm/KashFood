import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import cookieParser from 'cookie-parser';
import database from './db/db.js'
dotenv.config({path:'./.env'})
const app = express()
const port = process.env.PORT ||8000
const options={
    origin:['https://tiny-gelato-acf3fe.netlify.app'],
    credentials:true,
     methods: ["GET", "POST","PUT","DELETE"],
    optionsSuccessStatus: 200,
    allowedHeaders: ['Content-Type'],
    exposedHeaders: ['Content-Type']
}


app.use(express.json());
app.use(cors(options));
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Request-Headers', '*');
  if (req.method === "OPTIONS") {
    res.header('Access-Control-Allow-Methods', '*');
    return res.status(200).json({});
  }
  next();
});
//
//database
database()
.then(listen=>{
    app.listen(port,()=>{
        console.log("listening at http://localhost:8000");
    })
})
.catch(err=>{
    console.log(err);
})
//routes

app.get("/",(req,res)=>{
    res.send("it works faizan")
})

import router from './routes/router.js';

app.use('/',router)
//listen
