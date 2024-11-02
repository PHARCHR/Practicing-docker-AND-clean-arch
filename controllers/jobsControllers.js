const getAllJobs=async(req,res)=>{
    res.send("THESE ARE ALL THE JOBS")
}
const getJob=async(req,res)=>{
    res.send("SINGLE JOB")
}
const createJob=async(req,res)=>{
    res.send("JOB CREATED ")
}
const updateJob=async(req,res)=>{
    res.send("JOB UPDATED")
}
const deleteJob=async(req,res)=>{
    res.send("JOB DELETED")
}
module.exports={
    getAllJobs,
    getJob,
    createJob,
    deleteJob,
    updateJob
}