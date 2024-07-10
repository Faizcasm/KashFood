import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import cookieParser from 'cookie-parser';
import database from './db/db.js'
dotenv.config({path:'./.env'})
const app = express()
const port = process.env.PORT ||8000
const options={
    origin:['http://localhost:5173'],
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
    res.set('Access-Control-Allow-Origin', ['http://localhost:5173']);
    res.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
   res.set('Access-Control-Request-Headers', '*');
      res.append('Access-Control-Allow-Origin', ['http://localhost:5173']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
   res.append('Access-Control-Request-Headers', '*');
        res.header('Access-Control-Allow-Origin', ['http://localhost:5173']);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
   res.header('Access-Control-Request-Headers', '*');
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
