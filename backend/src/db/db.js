import mongoose from "mongoose";
const database = async()=>{
    try {
        const connect = await mongoose.connect(`mongodb+srv://faizanhameed690:faizan123@cluster0.hm1jull.mongodb.net/kashfood`)
        console.log("connected ",connect.connection.host);
    } catch (error) {
        console.log(error);
    }
}
export default database
