const axios = require('axios');
module.exports = {

  addTask: ({title, description, difficulty, priority_code}) => {
    return axios.post('/tasks', {title, description})
    .then(result=>result.data)
    .catch((err)=>{console.log(err); return false});
  },
  getTasks: () => {

    return axios.get('/tasks')
    .then(result=>result.data)
    .catch((err)=>{console.log(err); return []});
  },
  updateTask: (newVersion) => {
    console.log(newVersion);
    return axios.put('/tasks',newVersion)
    .then(result => result.data)
    .catch((err) => { console.log(err); return false});
    
  },
  addBlocker: ({ task_id, title, description }) => {

    return axios.post('/blockers', { task_id, title, description });

  },
  getBlockers: (task_id) => {

    return axios.get('/blockers')

  },
  updateBlocker: (newVersion) => {

    const id = newVersion.id;

  },
  addUser: (username, password) => {

    return axios.post('/users',{username,password})
    .then(resp=>resp.data)
    .catch(err=>{console.log(err); return false;})

  },
  login: (username, password) => {

    return axios.post('/login', { username, password })
      .then(resp => resp.data)
      .catch(err => { console.log(err); return false; })

  },
  getUsers: () => {
    return axios.get('/users')
  }

}