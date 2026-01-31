const express = require("express");
const router =express.Router();
const supabase =require("../config/supabase");

router.post("/create",async(req ,res)=>{
    const{customer_id, vehicle_id, distance_km, passengers}=req.body;
    const {data:vehicle} = await supabase
    .from("vehicles")
    .select("*")
    .eq("id",vehicle_id)
    .single();

    if(!vehicle.isAvailable){
        return res.status(400).json({message:"Too many passengers"});
    }
    await supabase.from("trips").insert([{
        customer_id,
        vehicle_id,
        distance_km,
        passengers
    }]);
    await supabase.from("vehicles")
    .update({isAvailable:false})
    .eq("id",vehicle_id);

    res.status(201).json({message:"Trip created"});

});

module.exports = router;