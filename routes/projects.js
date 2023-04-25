const express = require('express');
const router = express.Router();
const projects = require('../controllers/projects');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// GET /projects
router.get('/', ensureLoggedIn, projects.indexProject);

// GET /projects/new
router.get('/new', ensureLoggedIn, projects.newProject);

// POST /projects
router.post('/', ensureLoggedIn, projects.createProject);

// GET /projects/:id
router.get('/:id', ensureLoggedIn, projects.showProject);

// GET /projects/:id/edit
router.get('/:id/edit', ensureLoggedIn, projects.editProject);

// PUT /projects/:id
router.put('/:id', ensureLoggedIn, projects.updateProject);

// DELETE /projects/:id
router.delete('/:id', ensureLoggedIn, projects.destroyProject);

//////////TASK Routes
// GET /projects/:projectId/tasks
//all tasks that are in one project
router.get('/:projectId/tasks', ensureLoggedIn, projects.indexTask);


router.get('/:projectId/tasks/new', ensureLoggedIn, projects.newTask);

// POST /projects/:projectId/tasks
// Create Task as part of one project
router.post('/:projectId/tasks', ensureLoggedIn, projects.createTask);

// GET /projects/:projectId/tasks/:taskId
//Show specific task
router.get('/:projectId/tasks/:taskId', ensureLoggedIn, projects.showTask);

// GET /projects/:projectId/tasks/:taskId/edit
//Edit task form
router.get('/:projectId/tasks/:taskId/edit', ensureLoggedIn, projects.editTask);

// PUT /projects/:projectId/tasks/:taskId
//Update specific task
router.put('/:projectId/tasks/:taskId', ensureLoggedIn, projects.updateTask);

// DELETE /projects/:projectId/tasks/:taskId
//delete specific task
router.delete('/:projectId/tasks/:taskId', ensureLoggedIn, projects.destroyTask);

module.exports = router;