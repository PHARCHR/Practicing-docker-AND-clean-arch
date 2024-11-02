const express = require("express");
const router = express.Router();
const {
  getAllJobs,
  getJob,
  createJob,
  deleteJob,
  updateJob,
} = require("../controllers/jobsControllers");

router.get("/", getAllJobs);
router.get("/:id", getJob);
router.post("/", createJob);
router.patch("/", updateJob);
router.delete("/", deleteJob);
module.exports = router;
