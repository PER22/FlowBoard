const Project = require('../models/project');
const User = require('../models/user');

async function index(req, res) {
  const projects = await Project.find({ user: req.user._id });
  res.render('projects/index', { title: 'Projects Index Template', projects:projects });
}

async function newProject(req, res) {
  res.render('projects/new', { title: 'Add Project' });
}

async function create(req, res) {
  const project = new Project({
    name: req.body.name,
    description: req.body.description,
    user: req.user._id
  });
  try {
    await project.save();
    res.redirect('/projects');
  } catch (err) {
    res.render('projects/new', { title: 'Add Project', error: err });
  }
}

async function show(req, res) {
  const project = await Project.findOne({ _id: req.params.id, user: req.user._id });
  if (!project) return res.status(404).send('Project not found.');
  res.render('projects/show', { title: project.name, project });
}

async function edit(req, res) {
  const project = await Project.findOne({ _id: req.params.id, user: req.user._id });
  if (!project) return res.status(404).send('Project not found.');
  res.render('projects/edit', { title: `Edit ${project.name}`, project });
}

async function update(req, res) {
  const project = await Project.findOne({ _id: req.params.id, user: req.user._id });
  if (!project) return res.status(404).send('Project not found.');
  project.name = req.body.name;
  project.description = req.body.description;
  try {
    await project.save();
    res.redirect(`/projects/${project._id}`);
  } catch (err) {
    res.render('projects/edit', { title: `Edit ${project.name}`, project, error: err });
  }
}

async function destroy(req, res) {
  const project = await Project.findOne({ _id: req.params.id, user: req.user._id });
  if (!project) return res.status(404).send('Project not found.');
  await project.remove();
  res.redirect('/projects');
}

module.exports = {
  index,
  new: newProject,
  create,
  show,
  edit,
  update,
  destroy
};
