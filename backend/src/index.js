import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import cookieParser from 'cookie-parser';
import path from 'path'
import { fileURLToPath } from 'url';
import fs from 'fs'
import database from './db/db.js'
dotenv.config({path:'./.env'})
const app = express()
const port = process.env.PORT ||8000
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const options={
    origin: 'https://kashfood.netlify.app',
    credentials:true,
     methods: ["GET", "POST","PUT","DELETE"],
    optionsSuccessStatus: 200,
    exposedHeaders: ['Content-Type'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
}

const dir = path.join(__dirname, 'public');

const filePath = path.join(__dirname, 'public');
fs.access(filePath, fs.constants.F_OK, (err) => {
  console.log(`${filePath} ${err ? 'does not exist' : 'exists'}`);
  
});

app.use(express.static(dir));
app.use(express.json());
app.use(cors(options));
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', 'https://kashfood.netlify.app')
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
