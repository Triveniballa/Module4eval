const supabase = require("../config/supabase");
const addVehicle = async(req ,res)=>{
    try{
        const{
            owner_id,
            name,
            registration_number,
            allowed_passengers,
            rate_per_km,
        }=req.body;
        const{data:owner}=await supabase
        .from("users")
        .select("role")
        .eq("id",owner_id)
        .single();

        if(!owner || owner.role !=="owner"){
            return res.status(403).json({message:"Only owners can add vehicles"});
        }
        const{error} =await
        supabase.from("vehicles").insert([{
            name,registration_number,allowed_passengers,rate_per_km,owner_id
        }]);
        if(error) return res.status(400).json({error:error.message});
        res.status(201).json({message:"Vehicle added"});
    } catch(err){
        res.status(500).json({error:err.message});
    }
};
module.exports={addVehicle};
//vehiclecontroller