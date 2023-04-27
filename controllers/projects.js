const Project = require('../models/project');
const User = require('../models/user');

async function indexProject(req, res) {
  const projects = await Project.find({ owner: req.user._id });
  res.render('projects/index', { title: 'Your Projects', projects:projects });
}

async function newProject(req, res) {
  res.render('projects/new', { title: 'Create Project' });
}

async function createProject(req, res) {
  const project = new Project({
    title: req.body.title,
    description: req.body.description,
    owner: req.user._id,
    priority: req.body.priority,
    due: req.body.due
  });
  try {
    await project.save();
    res.redirect('/projects');
  } catch (err) {
    res.render('projects/new', { title: 'Create Project', error: err });
  }
}

async function showProject(req, res) {
  console.log(`Show function called: _id: ${req.params.id}, owner: ${req.user._id}`)
  const project = await Project.findOne({ _id: req.params.id, owner: req.user._id });
  if (!project) return res.status(404).send('Project not found.');
  res.render('projects/show', { title: project.name, project });
}

async function editProject(req, res) {
  const project = await Project.findOne({ _id: req.params.id, owner: req.user._id });
  if (!project) return res.status(404).send('Project not found.');
  res.render('projects/edit', { title: `Edit ${project.name}`, project });
}

async function updateProject(req, res) {
  const project = await Project.findOne({ _id: req.params.id, owner: req.user._id });
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

async function destroyProject(req, res) {
  const project = await Project.findOne({ _id: req.params.id, owner: req.user._id });
  if (!project) return res.status(404).send('Project not found.');
  await project.deleteOne();
  res.redirect('/projects');
}


async function indexTask(req, res){}
async function newTask(req, res){}
async function createTask(req, res){}
async function showTask(req, res){}
async function editTask(req, res){}
async function updateTask(req, res){}
async function destroyTask(req, res){}


module.exports = {
  indexProject,
  newProject,
  createProject,
  showProject,
  editProject,
  updateProject,
  destroyProject,

  indexTask,
  newTask,
  createTask,
  showTask,
  editTask,
  updateTask,
  destroyTask
};
