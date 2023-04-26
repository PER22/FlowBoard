const Project = require('../models/project');
const User = require('../models/user');

async function indexProject(req, res) {
  const projects = await Project.find({ projectOwner: req.user._id });
  res.render('projects/index', { title: 'Projects Index Template', projects:projects });
}

function newProject(req, res) {
  res.render('projects/new', { title: 'Create Project' });
}

async function createProject(req, res) {
  const project = new Project({
    title: req.body.title,
    description: req.body.description,
    projectOwner: req.user._id,
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
  const project = await Project.findOne({ _id: req.params.id, projectOwner: req.user._id });
  if (!project) return res.status(404).send('Project not found.');
  res.render('projects/show', { title: project.name, project });
}

async function editProject(req, res) {
  const project = await Project.findOne({ _id: req.params.id, projectOwner: req.user._id });
  if (!project) return res.status(404).send('Project not found.');
  res.render('projects/edit', { title: `Edit ${project.name}`, project });
}

async function updateProject(req, res) {
  const project = await Project.findOne({ _id: req.params.id, projectOwner: req.user._id });
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
  const project = await Project.findOne({ _id: req.params.id, projectOwner: req.user._id });
  if (!project) return res.status(404).send('Project not found.');
  await project.deleteOne();
  res.redirect('/projects');
}





async function indexTask(req, res){
  const currentProject = await Project.findOne({ projectOwner: req.user._id, _id: req.params.projectId });
  const currentTask = currentProject.tasks.find((task, index,array)=>{return task._id ===req.params.taskId})
  res.render( 'tasks/index',{title : currentProject.title, project:currentProject, tasks : currentProject.tasks});
}

async function newTask(req, res){
  const currentProject = await Project.findOne({ projectOwner: req.user._id,  _id: req.params.projectId });
  console.log("Logging currentProject from controllers/projects.js newTask().")
  res.render("tasks/new", { title: 'Create Task', project: currentProject });
}

async function createTask(req, res){
  try {

    projectToAddTaskOnto = await Project.findOneAndUpdate(
      { projectOwner: req.user._id,  _id: req.params.projectId},
      { $push: { tasks: {title: req.body.title,
    description: req.body.description,
    priority: req.body.priority,
    due: req.body.due,
    taskOwner: req.user._id} } },
      { new: true }
    );
  
  
    res.redirect(`/projects/${projectToAddTaskOnto._id}/tasks`); //redirect to the task index page for that Project
  } catch (err) {
  console.log(err)
  }
}

async function showTask(req, res){
  const currentProject = await Project.findOne({ _id: req.params.projectId, projectOwner: req.user._id });
  if (!currentProject) return res.status(404).send('Project not found.');
  currentTask = currentProject.tasks.find((task, index,array)=>{return task._id == req.params.taskId})
  console.log(currentTask);
  res.render('tasks/show', { title: currentProject.title, project: currentProject, task: currentTask });
}

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
