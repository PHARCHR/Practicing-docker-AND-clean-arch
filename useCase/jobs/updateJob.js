class updateJob {
  constructor(jobsRepo) {
    this.jobsRepo = jobsRepo;
  }
  execute = async ({ company, position, status, createdBy, id }) => {
    if (!company || !position || !status || !createdBy || !id) {
      return null;
    }
    const job = await this.jobsRepo.updateJob({
      company,
      position,
      status,
      createdBy,
      id,
    });
    return job;
  };
}
module.exports = updateJob;
