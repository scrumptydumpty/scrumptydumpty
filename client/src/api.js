const axios = require('axios');

module.exports = {
  addUserToSprint: ({ username, sprint_id }) => axios
    .put('/sprints/addUser', { username, sprint_id })
    .then(result => result.data)
    .catch((err) => {
      console.log(err);
      return false;
    }),

  removeUserFromSprint: ({ user_id, sprint_id }) => axios
    .put('/sprints/removeUser', { user_id, sprint_id })
    .then(result => result.data)
    .catch((err) => {
      console.log(err);
      return false;
    }),

  addSprint: title => axios
    .post('/sprints', { title })
    .then(result => result.data)
    .catch((err) => {
      console.log(err);
      return false;
    }),

  addTask: ({
    title, description, difficulty, priority_code, sprint_id, user_id
  }) => axios
    .post('/tasks', { title, description, sprint_id, user_id })
    .then(result => result.data)
    .catch((err) => {
      console.log(err);
      return false;
    }),

  getTasks: sprint_id => axios
    .get('/tasks', {
      params: { sprint_id },
    })
    .then(result => result.data)
    .catch((err) => {
      console.log(err);
      return [];
    }),

  updateTask: newVersion => axios
    .put('/tasks', newVersion)
    .then(result => result.data)
    .catch((err) => {
      console.log(err);
      return false;
    }),

  addBlocker: ({ task_id, title, description }) => axios.post('/blockers', { task_id, title, description }),

  getSprints: () => axios
    .get('/sprints')
    .then(resp => resp.data)
    .catch((err) => {
      console.log(err);
      return false;
    }),

  getBlockers: task_id => axios.get('/blockers'),

  // updateBlocker: (newVersion) => {
  //   const id = newVersion.id;
  // },

  updateUser: (username, newUsername, description, newdesc) => {
    axios.put('/users', { newUsername, username })
      .then(resp => resp.data)
      .catch((err) => {
        console.log(err);
        return false;
      });
  },

  updateUserName: (newUsername, username) =>
    axios.put('/users/name', { newUsername, username })
      .then(resp => resp.data)
      .catch((err) => {
        console.log(err);
        return false;
      }),

  updateUserDesc: (description, username) =>
    axios.put('/users/desc', { description, username })
      .then(resp => resp.data)
      .catch((err) => {
        console.log(err);
        return false;
      }),
  
  updateUserPassword: (password, newpassword, username) => axios
    .put('/users/pw', { password, newpassword, username })
    .then(resp => resp.data)
    .catch((err) => {
      console.log(err);
      return false;
    }),

  addUser: (username, password, description) => axios
    .post('/users', { username, password, description })
    .then(resp => resp.data)
    .catch((err) => {
      console.log(err);
      return false;
    }),

  login: (username, password) => axios
    .post('/login', { username, password })
    .then(resp => resp.data)
    .catch((err) => {
      console.log(err);
      return false;
    }),

  logout: () => axios
    .get('/logout')
    .then(resp => resp.data)
    .catch((err) => {
      console.log(err);
      return false;
    }),

  getUsers: () => axios.get('/users'),

  verify: () => axios
    .get('/verify')
    .then(resp => resp.data)
    .catch((err) => {
      console.log(err);
      return false;
    }),

  deleteBlocker: ({ id, task_id }) => axios
    .put('/blockers', { id, task_id, status_code: 1 })
    .then(resp => resp.data)
    .catch((err) => {
      console.log(err);
      return false;
    }),

  getUsersInSprint: sprint_id => axios
    .get('/users/sprint', {
      params: { sprint_id },
    })
    .then(result => result.data)
    .catch((err) => {
      console.log(err);
      return [];
    }),

  isOwner: sprint_id => axios
    .get('/sprints/isowner', { params: { sprint_id } })
    .then(result => result.data)
    .catch((err) => {
      console.log(err);
      return false;
    }),

  rejectUser: ({ user_id, sprint_id }) => axios
    .post('/sprints/reject', { user_id, sprint_id })
    .then(resp => resp.data)
    .catch((err) => {
      console.log(err);
      return false;
    }),

  getNoShowList: (sprint_id) => axios
    .get('/sprints/reject', { params: { sprint_id } })
    .then(resp => resp.data)
    .catch((err) => {
      console.log(err);
      return false;
    })
};
