// const Job = require("../models/jobs");
const {jobsRepo} = require("../inerfaces/repositories/jobsRepo");  
const getAllJobsUseCase = require("../useCase/jobs/getAllJobs");
const getJobUseCase = require("../useCase/jobs/getJob");
const { StatusCodes } = require("http-status-codes");
const createJObUseCase = require("../useCase/jobs/createJob");
const updateJobUseCase = require("../useCase/jobs/updateJob");
const deleteJobUseCase = require("../useCase/jobs/deleteJob");

const jobsRepoInstance = new jobsRepo();
const updateJobUseCaseInstance = new updateJobUseCase(jobsRepoInstance);
const deleteJobUseCaseInstance = new deleteJobUseCase(jobsRepoInstance);
const createJobUseCase = require("../useCase/jobs/createJob");
const createJobUseCaseInstance = new createJObUseCase(jobsRepoInstance);
const getJobInstance = new getJobUseCase(jobsRepo);
const getAllJobsUseCaseInstance = new getAllJobsUseCase(jobsRepoInstance);
const getAllJobs = async (req, res) => {
  const job= await getAllJobsUseCaseInstance.execute(req.user.id);
  // const job = await Job.find({ createdBy: req.user.id }).sort("createdAt");
  res.status(StatusCodes.OK).json({ job });
};
const getJob = async (req, res) => {
  const { id } = req.params;
  const { id: _id } = req.user;
  // const job = await Job.findOne({ _id: id, createdBy: _id });
  const job = await getJobInstance.execute({id, createdBy: _id});
  if (!job) {
    res.status(StatusCodes.NOT_FOUND).json({ msg: "NO SUCH JOB" });
  } else {
    res.status(StatusCodes.OK).json({ job });
  }
};
const createJob = async (req, res) => {
  req.body.createdBy = req.user.id;
  // const job = await Job.create(req.body);
  const job= await createJobUseCaseInstance.execute(req.body);
  res.status(StatusCodes.CREATED).json(job);
};
const updateJob = async (req, res) => {
  const { id } = req.params;
  const { id: _id } = req.user;
  const { company, position } = req.body;
  if (company === "" || position === "") {
    throw new console.error("Both company and postion fields must be filled");
  }
  const job = await updateJobUseCaseInstance.execute({
    company,
    position,
    createdBy: _id,
    _id:id,
  })
  // const job = await Job.findByIdAndUpdate(
  //   { _id: id, createdBy: _id },
  //   { company, position },
  //   { new: true, runValidators: true }
  // );

  
  if (!job) {
    res.status(StatusCodes.NOT_FOUND).json({ msg: "NO SUCH JOB" });
  } else {
    res.status(StatusCodes.OK).json({ job });
  }
};
const deleteJob = async (req, res) => {
  const { id } = req.params;
  const { id: _id } = req.user;
  // const job = await Job.findByIdAndDelete({ _id: id, createdBy: _id });
  const job = await deleteJobUseCaseInstance.execute({id, createdBy: _id});
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
