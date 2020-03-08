class Project {

init(arr) {
  this.arr = arr;
}

create(id, title, tasks) {
  this.arr.push({
    id,
    title,
    tasks
  });

  return this.get(id);
}

get(id) {
  return this.arr.find(obj => obj.id === id);
}

getAll() {
  return this.arr.sort(this.compare);
}

update(id, title) {
  this.arr.map(obj => { if (obj.id == id) { obj.title = title; } });
}

delete(id) {
  this.arr.splice(this.arr.findIndex(obj => obj.id == id), 1);
}

addTask(id, title) {
  this.arr.map(obj => { if (obj.id == id) { obj.tasks.push(title); } });

  return this.get(id);
}

compare(a, b) {
  if (a.title > b.title) { return 1; }
  if (a.title < b.title) { return -1; }
  return 0;
}
  
}

module.exports = new Project ();
