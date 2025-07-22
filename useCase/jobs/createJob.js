class createJob {
  constructor(jobsRepo) {
    this.jobsRepo = jobsRepo;
  }
  execute = async ({ company, position, status, createdBy }) => {
    if (!company || !position || !status || !createdBy) {
      return null;
    }
    const job = await this.jobsRepo.createJob({
      company,
      position,
      status,
      createdBy,
    });
    return job;
  };
}
module.exports = createJob;
