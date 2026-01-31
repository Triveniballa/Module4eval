const express = require("express");
const router = express.Router();
const supabase= require("../config/supabase");
router.post("/add",async(req,res)=>{
    const {owner_id,name,registration_number,allowed_passengers,rate_per_km}=req.body;
    const {data:owner}=await supabase
    .from("Users")
    .select("role")
    .eq('id',owner_id)
    .single();

    if (owner.role !=="owner"){
        return res.status(403).json({message:"only owners allowed"});
    }

    const {error}=await
    supabase.from("vehicles").insert([{
        name,
        registration_number,
        allowed_passengers,
        rate_per_km,
        owner_id
    }]);

    if (error) return res.status(400).json({error});
    res.status(201).json({message:"Vehicle added"});
});
module.exports = router;
//vehicle routes
//vehicle routes