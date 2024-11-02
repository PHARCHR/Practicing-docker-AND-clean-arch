const Job = require("../models/jobs");
const { StatusCodes } = require("http-status-codes");
const getAllJobs = async (req, res) => {
  res.send("THESE ARE ALL THE JOBS");
};
const getJob = async (req, res) => {
  res.send("SINGLE JOB");
};
const createJob = async (req, res) => {
  req.body.createdBy = req.user.id;
  const job = await Job.create(req.body);
  res.staus(StatusCodes.CREATED).json(job);
};
const updateJob = async (req, res) => {
  res.send("JOB UPDATED");
};
const deleteJob = async (req, res) => {
  res.send("JOB DELETED");
};
module.exports = {
  getAllJobs,
  getJob,
  createJob,
  deleteJob,
  updateJob,
};
