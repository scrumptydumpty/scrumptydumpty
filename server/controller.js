const db = require('../database/db');

module.exports = {

  addTask: ({ title, description }) => {
    if (!title || title === '') throw ('No Title');
    if (!description || description === '') throw ('No description');

    return db.addTask(title, description);
  },
  getTasks: () => db.getTasks(),

  updateTask: (newVersion) => {
    if (!newVersion.id) throw ('No Task ID Given');
    // filter out stuff?
    return db.updateTask(newVersion);
  },

  addBlocker: ({ task_id, title, description }) => {
    if (!task_id) throw ('No task_id');
    if (!title || title === '') throw ('No Title');
    if (!description || description === '') throw ('No description');

    return db.addBlocker(task_id, title, description);
  },
  getBlockers: (task_id) => {
    if (!task_id) throw ('No Test Id Given');
    return db.getBlockers(task_id);
  },

  updateBlocker: newVersion => db.updateBlocker(newVersion),

  addUser: ({ username, password }) => {
    if (!password || password === '') throw ('No Password Given');
    if (!username || username === '') throw ('No Username Given');
    return db.userExists(username)
      .then((exists) => {
        if (exists) {
          throw ('User already exists');
        }
        return db.addUser(username, password);
      });
  },
  getUsers: () => db.getUsers(),

  loginCorrect: ({ username, password }) => {
    if (!username || !password) throw ('Invalid Credentials');
    if (username === '' || password === '') throw ('Invalid Credentials');
    return db.userHasPassword(username, password);
  },

  updateUser: ({ username, oldpassword, newpassword }) => db.userExists(username)
    .then((userExists) => {
      if (!userExists) {
        throw ('User does not exist');
      }
      return db.userHasPassword(username, oldpassword);
    })
    .then((hasPassword) => {
      if (!hasPassword) { throw ('Invalid Password'); }
      return db.updateUser(username, newpassword);
    })
  },
  getUserById:(id)=>{
    return db.getUserById(id)
    .then(user=>user!==undefined? user : null)
  },
  getUserByName: (username) => {
    return db.getUserByName(username)
      .then(user =>user !== undefined ? user : null)
  },

  isLoggedIn: (req, res, next) => {
    if (req.session.passport) {
      next();
    } else {
      res.redirect('/login');
    }
  }


};
