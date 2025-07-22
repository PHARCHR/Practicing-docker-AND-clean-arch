const Job = require("../../models/jobs");
class jobsRepo {
  getAllJobs = async (createdBy) => {
    const jobs = await Job.find({ createdBy }).sort("createdAt");
    return jobs;
  };

  getJob = async ({ createdBy, id }) => {
    const jobs = await Job.findOne({ createdBy, _id: id });
    return jobs;
  };
  createJob = async ({ company, position, status, createdBy }) => {
    const jobs = await Job.create({ company, position, status, createdBy });
    return jobs;
  };
  updateJob = async ({ company, position, status, createdBy, id }) => {
    const jobs = await Job.findByIdAndUpdate(
      { _id: id, createdBy },
      { company, position, status },
      { new: true, runValidators: true }
    );
    return jobs;
  };

  deleteJob = async ({ createdBy, id }) => {
    const jobs = await Job.findByIdAndDelete({ _id: id, createdBy });
    return jobs;
  };
}
module.exports = {
  jobsRepo,
};
