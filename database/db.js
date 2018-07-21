const { knex } = require('./knex');

const self = module.exports = {
  addTask: (title, description, sprint_id) =>
    knex("tasks")
      .insert({ title, description, sprint_id })
      .then(id =>
        knex("tasks")
          .where("id", id)
          .select()
      )
      .then(tasks => tasks[0]),
  // returns all tasks, adding the blockers each task has to the task object

  getTasks: (sprint_id) =>
    knex("tasks").where({sprint_id}).then(tasks => {
      let pchain = Promise.resolve();

      // loop over each task, retrieve the blockers the task has,
      // then add the array of blockers to the task
      tasks.forEach(task => {
        pchain = pchain.then(() =>
          self.getBlockers(task.id).then(blockers => {
            task.blockers = blockers;
          })
        );
      });

      return pchain.then(() => tasks);
    }),

  updateTask: ({
    id,
    title,
    description,
    user_id,
    status_code,
    eta,
    priority_code,
    difficulty
  }) =>
    knex("tasks")
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
      .then(() =>
        knex("tasks")
          .where("id", id)
          .select()
      )
      .then(tasks => tasks[0]),

  addBlocker: (task_id, title, description) =>
    knex("blockers")
      .insert({ task_id, title, description })
      .then(id =>
        knex("blockers")
          .where("id", id)
          .select()
      )
      .then(blockers => blockers[0]),

  getBlockers: task_id =>
    knex("blockers")
      .where("task_id", task_id)
      .then(result => (Array.isArray(result) ? result : [result])),

  updateBlocker: ({ id, title, description, task_id, status_code }) =>
    knex("blockers")
      .where("id", id)
      .update({
        title,
        description,
        task_id,
        status_code
      })
      .then(() =>
        knex("blockers")
          .where("id", id)
          .select()
      )
      .then(blockers => blockers[0]),

  addUser: (username, password) =>
    knex("users")
      .insert({ username, password })
      .then(id =>
        knex("users")
          .where("id", id)
          .select()
      )
      .then(users => users[0]),

  getUsers: () =>
    knex("users")
      .select()
      .then(users =>
        users.map(user => ({ id: user.id, username: user.username }))
      ),

  userExists: username => {
    console.log("username", username);
    return knex("users")
      .where("username", username)
      .select()
      .then(arr => arr.length > 0);
  },
  userHasPassword: (username, password) =>
    knex("users")
      .where({ username, password })
      .select()
      .then(arr => arr.length !== 0),

  updateUser: (username, password) =>
    knex("users")
      .where("username", username)
      .select()
      .then(arr =>
        knex("users")
          .where("id", arr[0].id)
          .update({ username, password })
      )
      .then(() =>
        knex("users")
          .where("username", username)
          .select()
      )
      .then(users => users[0]),

  getUserByName: username =>
    knex("users")
      .where("username", username)
      .select()
      .then(users => users[0]),

  getUserById: id =>
    knex("users")
      .where("id", id)
      .select()
      .then(users => users[0]),

  addSprint: (title, owner_id) =>
    knex("sprints")
      .insert({ title, owner_id })
      .then(id =>
        knex("sprints")
          .where("id", id)
          .select()
      )
      .then(sprints => sprints[0]),
  // returns all tasks, adding the blockers each task has to the task object

  getSprints: owner_id =>
    knex("sprints").where({ owner_id }).then(sprints => sprints.map(sprint=>sprint.id)) ,

}
