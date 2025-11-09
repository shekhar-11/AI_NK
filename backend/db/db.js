import mongoose from "mongoose";


async function connectDB() {
await mongoose.connect(process.env.URL_TO_CONNECT).then(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log("Error connecting to MongoDB:",err);
});
}

export default connectDB;
// export default mongoose;