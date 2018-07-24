const axios = require('axios');

module.exports = {

  addUserToSprint: ({ username, sprint_id }) => axios.put('/sprints', { username,sprint_id })
    .then(result => result.data)
    .catch(err => { console.log(err); return false }),

  addSprint: (title) => axios.post('/sprints', { title })
  .then(result=>result.data)
  .catch(err=>{console.log(err); return false}),

  addTask: ({
    title, description, difficulty, priority_code, sprint_id
  }) => axios.post('/tasks', { title, description , sprint_id })
    .then(result => result.data)
    .catch((err) => { console.log(err); return false; }),

  getTasks: (sprint_id) => {console.log(sprint_id); return axios.get('/tasks',{
    params:{ sprint_id }
  })
    .then(result => result.data)
    .catch((err) => { console.log(err); return []; })},

  updateTask: (newVersion) => {
    console.log(newVersion);
    return axios.put('/tasks', newVersion)
      .then(result => result.data)
      .catch((err) => { console.log(err); return false; });
  },

  addBlocker: ({ task_id, title, description }) => axios.post('/blockers', { task_id, title, description }),

  getSprints: () => axios.get('/sprints')
  .then(resp =>  resp.data)
  .catch((err)=>{console.log(err); return false}),

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

  logout: () => axios.get('/logout')
    .then((resp) => { console.log(resp); return resp.data; })
    .catch((err) => { console.log(err); return false; }),

  getUsers: () => axios.get('/users'),

  verify: () => axios.get('/verify')
    .then(resp => resp.data)
    .catch((err) => { console.log(err); return false; }),

  deleteBlocker: id => axios.put('/blockers', { id, status_code: 1 })
    .then(resp => resp.data)
    .catch((err) => { console.log(err); return false; }),

  getUsersInSprint: sprint_id => axios.get('/users/sprint', {
    params: { sprint_id }
  })
    .then(result => result.data)
    .catch((err) => { console.log(err); return []; }), 

};
