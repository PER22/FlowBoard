const express = require('express');
const router = express.Router();
const projects = require('../controllers/projects');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// GET /projects
router.get('/', ensureLoggedIn, projects.index);

// GET /projects/new
router.get('/new', ensureLoggedIn, projects.new);

// POST /projects
router.post('/', ensureLoggedIn, projects.create);

// GET /projects/:id
router.get('/:id', ensureLoggedIn, projects.show);

// GET /projects/:id/edit
router.get('/:id/edit', ensureLoggedIn, projects.edit);

// PUT /projects/:id
router.put('/:id', ensureLoggedIn, projects.update);

// DELETE /projects/:id
router.delete('/:id', ensureLoggedIn, projects.destroy);

module.exports = router;