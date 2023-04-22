const Project = require('../models/project');
const User = require('../models/user');

module.exports = {
  index,
  show,
  new: newproject,
  create
};

async function index(req, res) {
  const projects = await Project.find({});
  res.render('projects/index', { title: 'All projects', projects: projects });
}

async function show(req, res) {
  // Populate the cast array with performer docs instead of ObjectIds
  const project = await Project.findById(req.params.id).populate('cast');
  // Mongoose query builder approach to retrieve performers not the project:
    // Performer.find({}).where('_id').nin(project.cast)
  // The native MongoDB approach uses a query object to find 
  // performer docs whose _ids are not in the project.cast array like this:
  const performers = await User.find({ _id: { $nin: project.cast } }).sort('name');
  res.render('projects/show', { title: 'project Detail', project, performers });
}

function newproject(req, res) {
  // We'll want to be able to render an  
  // errorMsg if the create action fails
  res.render('projects/new', { title: 'Add project', errorMsg: '' });
}

async function create(req, res) {
  // convert nowShowing's checkbox of nothing or "on" to boolean
  req.body.nowShowing = !!req.body.nowShowing;
  // Remove empty properties so that defaults will be applied
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  try {
    // Update this line because now we need the _id of the new project
    const project = await Project.create(req.body);
    // Redirect to the new project's show functionality 
    res.redirect(`/projects/${project._id}`);
  } catch (err) {
    // Typically some sort of validation error
    console.log(err);
    res.render('projects/new', { errorMsg: err.message });
  }
}