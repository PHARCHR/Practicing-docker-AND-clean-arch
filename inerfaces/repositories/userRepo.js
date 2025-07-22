const User=require("../../models/user");

const register=async ({name,email,passoword})=>{
    const user=await User.create({name,email,passoword});
}

const findOne=async({email})=>{
    const user=await User.findOne({email})
}

module.exports={register,findOne};