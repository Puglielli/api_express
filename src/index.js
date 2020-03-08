const express = require('express');
const {checkExistId, checkExistFields, checkExistInArray} = require('./app/middlewares/Validators');
const Project = require('./app/models/Project');

const server = express();

server.use(express.json());

Project.init(new Array());

function init(req, res, next) {
  req.arr = Project.getAll();

  next();
}

server.post('/projects', init, checkExistFields, checkExistId, (req, res) => {
  const { id, title } = req.body;

  return res.json(Project.create(id, title, []));
});

server.get('/projects', (req, res) => {
  return res.json(Project.getAll());
});

server.get('/projects/:id', init, checkExistInArray, (req, res) => {
  return res.json(Project.get(req.params.id));
});

server.put('/projects/:id', init, checkExistFields, checkExistInArray, (req, res) => {
  Project.update(req.params.id, req.body.title);

  return res.send();
});

server.delete('/projects/:id', init, checkExistInArray, (req, res) => {
  Project.delete(req.params.id);

  return res.send();
});

server.post('/projects/:id/tasks', init, checkExistFields, checkExistInArray, (req, res) => {
  return res.json(Project.addTask(req.params.id, req.body.title));
});

server.listen(3000);