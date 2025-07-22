class deleteJob{
    constructor(jobsRepo) {
        this.jobsRepo = jobsRepo;
    }
    execute = async ({ id, createdBy }) => {
        if (!id || !createdBy) {
            return null;
        }
        const job = await this.jobsRepo.deleteJob({ id, createdBy });
        return job;
    }   
}
module.exports = deleteJob;