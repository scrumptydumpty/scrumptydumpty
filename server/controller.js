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
  updateTask: (newVersion) => {
    if(!newVersion.id) throw ('No Task ID Given')
    // filter out stuff?
    return db.updateTask(newVersion);
    

  },
  addBlocker: ({task_id, title, description}) => {
    if (!task_id) throw('No task_id')
    if (!title || title === '') throw ('No Title');
    if (!description || description === '') throw ('No description')

    return db.addBlocker(task_id, title, description);
  },
  getBlockers:(task_id)=>{
    if(!task_id) throw ('No Test Id Given')
    return db.getBlockers(task_id);
  },
  updateBlocker: (newVersion) => {

    return db.updateBlocker(newVersion);

  },
  addUser: ({username, password}) => {
    if (!password || password === '') throw ('No Password Given')
    if (!username || username === '') throw ('No Username Given')
    return db.userExists(username)
    .then(exists=>{
      if(exists){
        throw ('User already exists')
      }
      return db.addUser(username, password);
    });
  },
  getUsers:()=>{
    return db.getUsers();
  },
  loginCorrect: ({username,password}) => {
    return db.userHasPassword(username,password);
  },
  updateUser : ({username,oldpassword,newpassword}) =>{
    return db.userExists(username)
    .then(userExists=>{
      if(!userExists){
        throw('User does not exist')
      }
      return db.userHasPassword(username, oldpassword);
    })
    .then(hasPassword=>{
      if(!hasPassword)
      {throw('Invalid Password')} 
      return db.updateUser(username, newpassword);
    })
  }

};