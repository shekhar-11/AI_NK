import mongoose from "mongoose";


const Otschema = new mongoose.Schema({
    bug_id:
    {
        type:String,
        unique:true,
        required:true
    },
    note_to_reviewers:{
        type:String,
        required:true
    },
    root_cause_analysis:{
        type:String,
        required:true
    },
    testing:{
        type:String,
        required:true
    },
    impacted_hw:{
        type:String,
        required:true
    },
    performance:{
        type:String,
        required:true
    },
    comments:{
        type:String,
        required:true
    }

},{timestamps:true});


const OtModel = mongoose.model("OtModel",Otschema);

export default OtModel;
    