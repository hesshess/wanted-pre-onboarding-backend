import * as jobRepository from '../model/job.js';

export async function createJob(req, res, next) {
  const body = req.body;
  const Job = await jobRepository.create(body);
  res.status(201).json(Job);
}



export async function getJobs(req, res) {
  const search = req.query.search;
  const data = await (search
    ? jobRepository.getAllBySearch(search)
    : jobRepository.getAll());
  res.status(200).json(data);
}

export async function getJob(req, res, next) {
  const id = req.params.id;
  let Job = await jobRepository.getById(id);
  const otherJobs = await jobRepository.getByCompany(Job.companyId, Job.id);
  const otherJob_arr = otherJobs.map((obj)=>obj.id);
  Job.otherJobs = otherJob_arr;
  if (Job) {
    res.status(200).json(Job);
  } else {
    res.status(404).json({ message: `Job id(${id}) not found` });
  }
}


export async function updateJob(req, res, next) {

  const id = req.params.id;
  const body = req.body;
  const {position, reward, content, skills} = body

  const Job = await jobRepository.update(id, body);
  if (Job) {
    res.status(200).json(Job);
  } else {
    res.status(404).json({ message: `Job id(${id}) not found` });
  }
}

export async function deleteJob(req, res, next) {
  const id = req.params.id;
  await jobRepository.remove(id);
  res.sendStatus(204);
}



// export async function applyJob (req, res, next){
//   const jobId = req.params.id;
//   const {userId} = req.body;
//   const apply = await jobRepository.checkApply(jobId, userId);
//   res.status(201).json(apply);
// }