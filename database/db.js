const { knex } = require('./knex');

const self = module.exports = {

  addTask: (title,description) => {

    return knex('tasks').insert({title,description})
    .then((id)=>knex('tasks').where('id',id).select());

  },
  getTasks:()=>{
    return knex('tasks');
  },
  updateTask: ({id, title, description, user_id, status_code, eta, priority_code, difficulty}) => {
    
    return knex('tasks').where('id', id).update({ title, description, user_id, status_code, eta, priority_code, difficulty})
      .then((id) => knex('tasks').where('id', id).select());



  },
  addBlocker: (task_id, title, description) => {
    return knex('blockers').insert({ task_id, title, description })
      .then((id) => knex('blockers').where('id', id).select());
  },
  getBlockers:(task_id)=>{
    return knex("blockers").where('task_id',task_id);
  },
  updateBlocker: ({id, title, description, task_id, status_code}) => {

    return knex('blockers').where('id', id).update({ title, description, task_id, status_code})
      .then((id) => knex('blockers').where('id', id).select());


  },
  addUser: (username, password) => {
    return knex('users').insert({username,password})
    .then(id=>knex('users').where('id',id).select());
  },
  getUsers:()=>{

    return knex('users').select()
      .then(users => users.map(user=>{
        return {'id':user.id, 'username':user.username}
      }));

  },
  userExists:(username)=>{

    return knex('users').where('username',username).select()
    .then(arr=>arr.length>0);

  },
  userHasPassword:(username,password)=>{
    return knex('users').where({username, password}).select()
    .then(arr=>arr.length!==0);
  },
  updateUser: (username, password) => {
    return knex('users').where('username',username)
    .select()
    .then(id=>knex.update('users').where('id',id).update({username,password}))
    .then(id => knex('users').where('id', id).select());
  }

};