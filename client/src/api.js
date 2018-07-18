const axios = require('axios');
module.exports = {

  addTask: (title, description) => {
    return axios.post('/task', {title, description})
    .then(result=>result.data)
    .catch((err)=>{console.log(err); return false});
  },
  getTasks: () => {

    return axios.get('/tasks')
    .then(result=>result.data)
    .catch((err)=>{console.log(err); return []});
  },
  updateTask: (newVersion) => {

    const id = newVersion.id;
    
  },
  addBlocker: ({ task_id, title, description }) => {

    return axios.post('/blocker', { task_id, title, description });

  },
  getBlockers: (task_id) => {

    return axios.get('/blockers')

  },
  updateBlocker: (newVersion) => {

    const id = newVersion.id;

  },
  addUser: (username, password) => {

    return axios.post('/user',{username,password})
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