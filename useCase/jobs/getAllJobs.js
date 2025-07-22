class getAllJobs {
  constructor(jobsRepo) {
    this.jobsRepo = jobsRepo;
  }
  async execute(createdBy) {
    if (!createdBy) {
      return null;
    }
    const jobs = await this.jobsRepo.getAllJobs(createdBy);
    return jobs;
  }
}
module.exports = getAllJobs;
