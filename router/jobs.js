import express from 'express';
import * as jobController from '../controller/job.js'

const router = express.Router();

// GET   /jobs
// GET   /jobs?search=:term
router.get('/', jobController.getJobs);

// GET   /jobs/:id
router.get('/:id', jobController.getJob);

// POST  /jobs
router.post('/', jobController.createJob);

// PUT   /job/:id
router.put('/:id', jobController.updateJob);

// DEL   /job/:id 
router.delete('/:id', jobController.deleteJob);


//추가구현 채용공고에 지원
// router.post('/:id/apply', jobController.applyJob)


export default router;