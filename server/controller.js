const db = require('../database/db');

module.exports = {

  addTask: ({title,description}) => {

    if(!title || title==='') throw('No Title');
    if(!description || description === '') throw('No description')

    return db.addTask(title,description);

  },
  getTasks:()=>{
    return db.getTasks();
  },
  updateTask: ({newVersion}) => {

    // filter out stuff?
    return db.updateTask(newVersion);
    

  },
  addBlocker: ({task_id, title, description}) => {
    if (!task_id) throw('No task_id')
    if (!title || title === '') throw ('No Title');
    if (!description || description === '') throw ('No description')

    return db.addBlocker(task_id, title, description);
  },
  getBlockers:({task_id})=>{
    return db.getBlockers(task_id);
  },
  updateBlocker: ({newVersion}) => {

    return db.updateBlocker(newVersion);

  },
  addUser: ({username, password}) => {
    if(db.userExists(username)){
      throw('User already exists')
    }
    if(!password || password === '') throw('No Password Given')
    return db.addUser(username, password);
  },
  getUsers:()=>{
    return db.getUsers();
  },
  loginCorrect: ({username,password}) => {
    return db.userHasPassword(username,password);
  },
  updateUser : ({username,oldpassword,newpassword}) =>{
    if(db.userHasPassword(username,oldpassword)){
      
    }
  }

};