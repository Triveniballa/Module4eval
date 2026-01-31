const express =require("express");
const router = express.Router();
const supabse=require("../config/supabase");
const { SupabaseClient } = require("@supabase/supabase-js");

router.post("/signup",async (req,res)=>{
    const {name,email,role}= req.body;
    if (!name || !email|| !role){
        return res.status(400).json({message:"Missing fields"});
    }
    const{data,error}=await Supabase
    .from("users")
    .insert([{name,email,role}]);

    if (error) return res.status(400).json({error});
    res.status(201).json({message: "User created"});
});
module.exports = router;