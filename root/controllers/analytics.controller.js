const supabase=require("../config/supabase");
const getAnalytics=async(req , res)=>{
    try{
        const customers=await supabase
        .from("users")
        .select("*",{count:"exact"})
        .eq("role","customer");
        const owners=await supabase
        .from("users")
        .select("*",{count:"exact"})
        .eq("role","owner");
        const drivers=await supabase
        .from("users")
        .select("*",{count:"exact"})
        .eq("role","driver");
        const vehicles=await supabase
        .from("users")
        .select("*",{count:"exact"})
       
        const trips=await supabase
        .from("users")
        .select("*",{count:"exact"})

        res.status(200).json({
            totalCustomers:customers.count,
            totalOwners:owners.count,
            totalDrivers:drivers.count,
            totaVehicles:vehicles.count,
            totalTrips:"trips.count"
        });


    }catch(err){
        res.status(500).json({error:err.mmessage});
    }
};
module.exports={getAnalytics};
//analytics