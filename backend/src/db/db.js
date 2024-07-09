import mongoose from "mongoose";
const database = async()=>{
    try {
        const connect = await mongoose.connect(`${process.env.url}/kashfood`)
        console.log("connected ",connect.connection.host);
    } catch (error) {
        console.log(error);
    }
}
export default database