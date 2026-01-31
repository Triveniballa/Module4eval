const supabase=require("../config/supabase");
const signupUser=async (req , res)=>{
    try{
        const {name,email,role}=req.body;

        if(!name || !email || !role){
            return res.status(400).json ({message:"All fields required"});
        }
        const{error}=await supabase
        .from("users")
        .insert([{name,email,role}]);

        if(error) return res.status(400).json({error:error.message});
        res.status(201).json({message:"User created successfully"});
    }catch(err){
        res.status(500).json({error:err.message});
    }
};

module.exports ={signupUser};
//user controller
//user