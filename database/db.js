const { knex } = require('./knex');

const self = module.exports = {

  addTask: (title,description) => {

  },
  getTasks:()=>{

  },
  updateTask: (newVersion) => {

    const id = newVersion.id;


  },
  addBlocker: ({task_id, title, description}) => {

  },
  getBlockers:(task_id)=>{

  },
  updateBlocker: (newVersion) => {

    const id = newVersion.id;

  },
  addUser: (username, password) => {

  },
  getUsers:()=>{

  },
  loginCorrect: (username,password) => {

  }

};