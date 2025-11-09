import mongoose from "mongoose";


const Otschema = new mongoose.Schema({
    id:
    {
        type:String,
        unique:true,
        required:true
    },
    expectations:{
        type:String,
        required:true
    },
    functionality:{
        type:String,
        required:true
    },
    compatibility:{
        type:String,
        required:true
    },
    usability:{
        type:String,
        required:true
    },
    performance:{
        type:String,
        required:true
    },
    bugs:{
        type:String,
        required:true
    }

},{timestamps:true});


const OtModel = mongoose.model("OtModel",Otschema);

export default OtModel;
    