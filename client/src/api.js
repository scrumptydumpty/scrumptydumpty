const axios = require('axios');

module.exports = {

  addTask: ({
    title, description, difficulty, priority_code,
  }) => axios.post('/tasks', { title, description })
    .then(result => result.data)
    .catch((err) => { console.log(err); return false; }),

  getTasks: () => axios.get('/tasks')
    .then(result => result.data)
    .catch((err) => { console.log(err); return []; }),

  updateTask: (newVersion) => {
    console.log(newVersion);
    return axios.put('/tasks', newVersion)
      .then(result => result.data)
      .catch((err) => { console.log(err); return false; });
  },

  addBlocker: ({ task_id, title, description }) => axios.post('/blockers', { task_id, title, description }),

  getBlockers: task_id => axios.get('/blockers'),

  updateBlocker: (newVersion) => {
    const id = newVersion.id;
  },

  addUser: (username, password) => axios.post('/users', { username, password })
    .then(resp => resp.data)
    .catch((err) => { console.log(err); return false; }),

  login: (username, password) => axios.post('/login', { username, password })
    .then((resp) => { console.log(resp); return resp.data; })
    .catch((err) => { console.log(err); return false; }),

  getUsers: () => axios.get('/users'),

  verify: () => axios.get('/verify')
    .then(resp => resp.data)
    .catch((err) => { console.log(err); return false; }),

};
