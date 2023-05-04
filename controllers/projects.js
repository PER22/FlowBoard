const Project = require('../models/project');
const User = require('../models/user');

async function indexProject(req, res) {
  const projects = await Project.find({ projectOwner: req.user._id });
  res.render('projects/index', { title: 'My Projects', projects: projects });
}

function newProject(req, res) {
  res.render('projects/new', { title: 'Create A Project' });
}

async function createProject(req, res) {
  const project = new Project({
    title: req.body.title,
    description: req.body.description,
    projectOwner: req.user._id,
    priority: req.body.priority,
    startDate: req.body.startDate,
    dueDate: req.body.dueDate
  });
  try {
    await project.save();
    res.redirect('/projects');
  } catch (err) {
    res.render('projects/new', { title: 'Create Project', error: err });
  }
}

async function showProject(req, res) {
  const currentProject = await Project.findOne({ _id: req.params.id, projectOwner: req.user._id });
  if (!currentProject) return res.status(404).send('Project not found. From showProject');
  const completedTasks = currentProject.tasks.filter((task) => { return task.status === "completed" });
  const todoTasks = currentProject.tasks.filter((task) => { return task.status === "to-do" });
  const inProgressTasks = currentProject.tasks.filter((task) => { return task.status === "in-progress" });
  res.render('projects/show', { title: currentProject.title, project: currentProject, completed: completedTasks, todo: todoTasks, inprogress: inProgressTasks });
}

async function editProject(req, res) {
  const project = await Project.findOne({ _id: req.params.id, projectOwner: req.user._id });
  if (!project) return res.status(404).send('Project not found.');
  res.render('projects/edit', { title: `Edit ${project.title}`, project });
}

async function updateProject(req, res) {
  const project = await Project.findOne({ _id: req.params.id, projectOwner: req.user._id });
  if (!project) return res.status(404).send('Project not found.');
  project.title = req.body.title;
  project.description = req.body.description;
  project.priority = req.body.priority;
  project.startDate = req.body.startDate;
  project.dueDate = req.body.dueDate;
  project.projectOwner = req.user._id;
  try {
    await project.save();
    res.redirect(`/projects/${project._id}`);
  } catch (err) {
    res.render('projects/edit', { title: `Edit ${project.title}`, project, error: err });
  }
}

async function destroyProject(req, res) {
  const project = await Project.findOne({ _id: req.params.id, projectOwner: req.user._id });
  if (!project) return res.status(404).send('Project not found.');
  await project.deleteOne();
  res.redirect('/projects');
}





async function indexTask(req, res) {
  const currentProject = await Project.findOne({ projectOwner: req.user._id, _id: req.params.projectId });
  if (!currentProject) return res.status(404).send('Project not found. From indexTask()');
  res.render('tasks/index', { title: currentProject.title, project: currentProject, tasks: currentProject.tasks });
}

async function newTask(req, res) {
  const currentProject = await Project.findOne({ projectOwner: req.user._id, _id: req.params.projectId });
  res.render("tasks/new", { title: 'Create Task', project: currentProject });
}

async function createTask(req, res) {
  try {

    projectToAddTaskOnto = await Project.findOneAndUpdate(
      { projectOwner: req.user._id, _id: req.params.projectId },
      {
        $push: {
          tasks: {
            title: req.body.title,
            description: req.body.description,
            priority: req.body.priority,
            startDate: req.body.startDate,
            dueDate: req.body.dueDate,
            status: "to-do",
            taskOwner: req.user._id
          }
        }
      },
      { new: true }
    );
    res.redirect(`/projects/${projectToAddTaskOnto._id}/`); //redirect to the project's show page
  } catch (err) {
    console.log(err)
  }
}

async function showTask(req, res) {
  const currentProject = await Project.findOne({ _id: req.params.projectId, projectOwner: req.user._id });
  if (!currentProject) return res.status(404).send('Project not found. From showTask()');
  const currentTask = currentProject.tasks.find((task, index, array) => { return task._id == req.params.taskId })
  res.render('tasks/show', { title: currentTask.title, project: currentProject, task: currentTask });
}

async function editTask(req, res) {
  const currentProject = await Project.findOne({ _id: req.params.projectId, projectOwner: req.user._id });
  const taskToEdit = currentProject.tasks.find((task) => { return task._id == req.params.taskId })
  res.render('tasks/edit', { title: `Edit "${taskToEdit.title}" in ${currentProject.title}`, project: currentProject, task: taskToEdit });
}

async function updateTask(req, res) {
  const project = await Project.findOne({ _id: req.params.projectId, projectOwner: req.user._id });
  const taskToUpdate = project.tasks.find((task) => { return task._id == req.params.taskId });
  taskToUpdate.status = req.body.status;
  taskToUpdate.title = req.body.title;
  taskToUpdate.description = req.body.description;
  taskToUpdate.priority = req.body.priority;
  taskToUpdate.startDate = req.body.startDate;
  taskToUpdate.dueDate = req.body.dueDate;
  taskToUpdate.projectOwner = req.user._id;
  try {
    await project.save();
    res.redirect(`/projects/${project._id}`);
  } catch (err) {
    return res.status(404).send('Updating task failed)');
  }
}

async function destroyTask(req, res) {
  const currentProject = await Project.findOne({ _id: req.params.projectId, projectOwner: req.user._id });
  const indexToDelete = currentProject.tasks.findIndex((task) => { return task._id == req.params.taskId });
  currentProject.tasks.splice(indexToDelete, 1);
  try {
    await currentProject.save();
    res.redirect("/projects/");
  } catch (err) {
    return res.status(404).send('Deleting task failed');
  }
}


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