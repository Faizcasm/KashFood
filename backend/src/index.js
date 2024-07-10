import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import cookieParser from 'cookie-parser';
import database from './db/db.js'
dotenv.config({path:'./.env'})
const app = express()
const port = process.env.PORT ||8000
const options={
    origin:'*',
    credentials:true,
     methods: ["GET", "POST","PUT","DELETE"],
    optionsSuccessStatus: 200,
    exposedHeaders: ['Content-Type'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
}


app.use(express.json());
app.use(cors(options));
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin': 'http://localhost:5174')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
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
