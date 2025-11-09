import express from "express";
import OtModel from "../db/Schema/Ot.model.js";



const router = express.Router();


router.post("/addData",async (req,res)=>{

    try{
        const otData = req.body;

        const newOt = new OtModel(otData);
        await newOt.save();

        res.status(201).json({message:"OT data saved successfully", data:newOt});
    }
    catch(err){
        console.error("Error saving OT data:", err);
        res.status(500).json({message:"Error saving OT data", error:err.message});
    }

});


router.get("/fetchData",async (req,res)=>{

    try {
        const ots = await OtModel.find();
        res.status(200).json({ message: "OT data retrieved successfully", data: ots });
    } catch (err) {
        console.error("Error retrieving OT data:", err);
        res.status(500).json({ message: "Error retrieving OT data", error: err.message });
    }
});
export default router;