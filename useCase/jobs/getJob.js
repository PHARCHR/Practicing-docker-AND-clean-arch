class getJob {
  constructor(jobsRepo) {
    this.jobsRepo = jobsRepo;
  }
  execute = async ({ id, createdBy }) => {
    if (!id || !createdBy) {
      return null;
    }
    const job = await this.jobsRepo.getJob({ id, createdBy });
    return job;
  };
}
module.exports = getJob;
