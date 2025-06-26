const Project = require('../models/Project');

const createProject = async (req, res) => {
  try {
    const project = await Project.create({
      title: req.body.title,
      description: req.body.description,
      owner: req.userId,
    });
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getProjects = async (req, res) => {
  const projects = await Project.find({
    $or: [{ owner: req.userId }, { collaborators: req.userId }],
  });
  res.json(projects);
};

const getProject = async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project || (project.owner.toString() !== req.userId && !project.collaborators.includes(req.userId))) {
    return res.status(403).json({ error: 'Access denied' });
  }
  res.json(project);
};

const updateProject = async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project || project.owner.toString() !== req.userId) {
    return res.status(403).json({ error: 'Only the owner can update the project' });
  }

  project.title = req.body.title || project.title;
  project.description = req.body.description || project.description;
  await project.save();

  res.json(project);
};

const deleteProject = async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project || project.owner.toString() !== req.userId) {
    return res.status(403).json({ error: 'Only the owner can delete the project' });
  }

  await project.deleteOne();
  res.json({ message: 'Project deleted' });
};

module.exports = {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
};
