const db = require('../database/db');

const self = module.exports = {
  addTask: ({ title, description, sprint_id }) => {
    if (!title || title === "") throw "No Title";
    if (!description || description === "") throw "No description";
    if (!sprint_id ) throw "No sprint id";

    return db.addTask(title, description, sprint_id);
  },
  getTasks: (sprint_id) => db.getTasks( sprint_id),

  updateTask: newVersion => {
    if (!newVersion.id) throw "No Task ID Given";
    // filter out stuff?
    return db.updateTask(newVersion);
  },

  addBlocker: ({ task_id, title, description }) => {
    if (!task_id) throw "No task_id";
    if (!title || title === "") throw "No Title";
    if (!description || description === "") throw "No description";

    return db.addBlocker(task_id, title, description);
  },
  getBlockers: task_id => {
    if (!task_id) throw "No Test Id Given";
    return db.getBlockers(task_id);
  },

  updateBlocker: newVersion => db.updateBlocker(newVersion),

  addUser: ({ username, password }) => {
    if (!password || password === "") throw "No Password Given";
    if (!username || username === "") throw "No Username Given";
    return db.userExists(username).then(exists => {
      if (exists) {
        throw "User already exists";
      }
      return db.addUser(username, password);
    });
  },
  getUsers: () => db.getUsers(),

  loginCorrect: ({ username, password }) => {
    if (!username || !password) throw "Invalid Credentials";
    if (username === "" || password === "") throw "Invalid Credentials";
    return db.userHasPassword(username, password);
  },


  updateUser: ({ username, oldpassword, newpassword }) =>
    db
      .userExists(username)
      .then(userExists => {
        if (!userExists) {
          throw "User does not exist";
        }
        return db.userHasPassword(username, oldpassword);
      })
      .then(hasPassword => {
        if (!hasPassword) {
          throw "Invalid Password";
        }
        return db.updateUser(username, newpassword);
      }),

  getUserById: id => {
    return db.getUserById(id).then(user => (user !== undefined ? user : null));
  },
  getUserByName: username => {
    return db
      .getUserByName(username)
      .then(user => (user !== undefined ? user : null));
  },

  isLoggedIn: (req, res, next) => {
    if (req.session.passport) {
      next();
    } else {
      res.redirect("/login");
    }
  },

  addSprint: ( title, owner_id ) => {
    if (!title || title === "") throw "No Title";
    if (!owner_id ) throw "No owner_id";

    return db.addSprint(title, owner_id)
    .then(sprint=>{
      const user_id = owner_id;
      const sprint_id = sprint.id;
      return self.addUserToSprint(user_id, sprint_id)
    });
  },

  // add user to a sprint, if successful returns the sprint
  addUserToSprint: (user_id, sprint_id) => {
    if(!user_id || user_id ==='') throw "No User Given";
    if(!sprint_id) throw "no sprint id given"

    return db.addUserToSprint(user_id,sprint_id);


  },



  getSprints: ({owner_id}) => db.getSprints(owner_id),

};
