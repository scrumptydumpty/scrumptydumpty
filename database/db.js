const { knex } = require('./knex');

const self = module.exports = {

  addTask: (title,description) => {

    return knex('tasks').insert({title,description})
      .then((id) => knex('tasks').where('id', id).select())
      .then(tasks => tasks[0]);

  },
  getTasks:()=>{
    return knex('tasks');
  },
  updateTask: ({id, title, description, user_id, status_code, eta, priority_code, difficulty}) => {
    
    return knex("tasks")
      .where("id", id)
      .update({
        title,
        description,
        user_id,
        status_code,
        eta,
        priority_code,
        difficulty
      })
      .then(()=>knex('tasks').where('id',id).select())
      .then(tasks => tasks[0]);



  },
  addBlocker: (task_id, title, description) => {
    return knex("blockers")
      .insert({ task_id, title, description })
      .then(id => knex("blockers")
          .where("id", id)
          .select())
      .then(blockers => blockers[0]);
  },
  getBlockers:(task_id)=>{
    return knex("blockers").where('task_id',task_id)
    .then(result=>Array.isArray(result)?result:[result]);
  },
  updateBlocker: ({id, title, description, task_id, status_code}) => {

    return knex("blockers")
      .where("id", id)
      .update({ title, description, task_id, status_code })
      .then(()=>knex("blockers")
          .where("id", id)
          .select())
      .then(blockers => blockers[0]);


  },
  addUser: (username, password) => {
    return knex('users').insert({username,password})
      .then(id => knex('users').where('id', id).select())
      .then(users => users[0]);
  },
  getUsers:()=>{

    return knex('users').select()
      .then(users => users.map(user=>{
        return {'id':user.id, 'username':user.username}
      }));

  },
  userExists:(username)=>{
    console.log('username',username)
    return knex('users').where('username',username).select()
    .then(arr=>arr.length>0);

  },
  userHasPassword:(username,password)=>{
    return knex('users').where({username, password}).select()
    .then(arr=>arr.length!==0);
  },
  updateUser: (username, password) => {
    return knex('users').where('username',username).select()
    .then(arr=>knex('users').where('id',arr[0].id).update({username,password}))
      .then(()=>knex('users').where('username', username).select())
      .then(users=>users[0]); 
  }

};