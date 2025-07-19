const Job = require("../models/jobs");
const { StatusCodes } = require("http-status-codes");
const getAllJobs = async (req, res) => {
  const job = await Job.find({ createdBy: req.user.id }).sort("createdAt");
  res.status(StatusCodes.OK).json({ job });
};
const getJob = async (req, res) => {
  const { id } = req.params;
  const { id: _id } = req.user;
  const job = await Job.findOne({ _id: id, createdBy: _id });
  if (!job) {
    res.status(StatusCodes.NOT_FOUND).json({ msg: "NO SUCH JOB" });
  } else {
    res.status(StatusCodes.OK).json({ job });
  }
};
const createJob = async (req, res) => {
  req.body.createdBy = req.user.id;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json(job);
};
const updateJob = async (req, res) => {
  const { id } = req.params;
  const { id: _id } = req.user;
  const { company, position } = req.body;
  if (company === "" || position === "") {
    throw new console.error("Both company and postion fields must be filled");
  }
  const job = await Job.findByIdAndUpdate(
    { _id: id, createdBy: _id },
    { company, position },
    { new: true, runValidators: true }
  );
  if (!job) {
    res.status(StatusCodes.NOT_FOUND).json({ msg: "NO SUCH JOB" });
  } else {
    res.status(StatusCodes.OK).json({ job });
  }
};
const deleteJob = async (req, res) => {
  const { id } = req.params;
  const { id: _id } = req.user;
  const job = await Job.findByIdAndDelete({ _id: id, createdBy: _id });
  if (!job) {
    res.status(StatusCodes.NOT_FOUND).json({ msg: "NO SUCH JOB" });
  } else {
    res.status(StatusCodes.OK).json({ msg: "Job deleted" });
  }
};
module.exports = {
  getAllJobs,
  getJob,
  createJob,
  deleteJob,
  updateJob,
};
