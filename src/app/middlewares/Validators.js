class Validators {
  
  checkExistFields(req, res, next) {
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
  
  checkExistId(req, res, next) {
    if(req.arr.find(obj => obj.id == req.body.id)) {
      return res.status(400).json({ error: 'id already exists' });
    }
  
    return next();
  }
  
  checkExistInArray(req, res, next) {
    const project = req.arr.find(obj => obj.id == req.params.id);
  
    if(!project) {
      return res.status(400).json({ error: 'id not exists' });
    }
  
    req.project = project;
  
    return next();
  }
}

module.exports = new Validators (new Array());
