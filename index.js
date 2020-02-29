const express = require('express');

const server = express();

server.use(express.json());

const tasksList = [];

function checkExistFields(req, res, next) {
  const { id, title } = req.body;

  if (req.method == 'PUT' && !title) {
    return res.status(400).json({ 
      error: 'Fields required' });
  }

  if (req.method == 'POST' && req.url.includes('tasks') && !title) {
    return res.status(400).json({ 
      error: 'Fields required' });
  }

  if (req.method == 'POST' && !req.url.includes('tasks') && !id || !title) {
    return res.status(400).json({ 
      error: 'Fields required' });
  }

  return next();
}

function checkExistId(req, res, next) {
  if(tasksList.find(obj => obj.id == req.body.id)) {
    return res.status(400).json({ error: 'id already exists' });
  }

  return next();
}

function checkExistInArray(req, res, next) {
  const project = tasksList.find(obj => obj.id == req.params.id);

  if(!project) {
    return res.status(400).json({ error: 'id not exists' });
  }

  req.project = project;

  return next();
}


server.post('/projects', checkExistFields, checkExistId, (req, res) => {
  const { id, title } = req.body;
  const tasks = [];

  tasksList.push({
    id,
    title,
    tasks
  });

  return res.json(
    tasksList[tasksList.length-1]
  );
});

server.get('/projects', (req, res) => {
  return res.json(tasksList);
});

server.get('/projects/:id', checkExistInArray, (req, res) => {
  return res.json(tasksList[tasksList.findIndex(obj => obj.id == req.params.id)]);
});

server.put('/projects/:id', checkExistFields, checkExistInArray, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  tasksList.map(obj => {
    if (obj.id == id) {
      obj.title = title;
    }

    return obj;
  });

  return res.send();
});

server.delete('/projects/:id', checkExistInArray, (req, res) => {

  tasksList.splice(tasksList.findIndex(obj => obj.id == req.params.id), 1);

  return res.send();
});

server.post('/projects/:id/tasks', checkExistFields, checkExistInArray, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  let index;

  tasksList.map((obj, i) => {
    if (obj.id == id) {
      obj.tasks.push(title);
      index = i;
    }

    return obj;
  });

  return res.json(tasksList[index]);
});

server.listen(3000);