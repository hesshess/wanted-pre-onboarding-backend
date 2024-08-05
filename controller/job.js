import * as jobRepository from '../data/job.js';

export async function getJobs(req, res) {
  const search = req.query.search;
  const data = await (search
    ? jobRepository.getAllByUsername(search)
    : jobRepository.getAll());
  res.status(200).json(data);
}

export async function getJob(req, res, next) {
  const id = req.params.id;
  const Job = await jobRepository.getById(id);
  if (Job) {
    res.status(200).json(Job);
  } else {
    res.status(404).json({ message: `Job id(${id}) not found` });
  }
}

export async function createJob(req, res, next) {
  const { companyId, position, reward, position_detail, skills } = req.body;
  const Job = await jobRepository.create(companyId, position, reward, position_detail, skills );
  res.status(201).json(Job);
}

export async function updateJob(req, res, next) {
  const id = req.params.id;
  const { position, reward, position_detail, skills } = req.body;
  const Job = await jobRepository.update(position, reward, position_detail, skills);
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
