#Welcome to our docs. Sit down, stay a while

#Stack: mysql, express w/ passport, react router

#Misc Schema Information
STATUS CODES
0 - Not Done
1 - In Progress
2 - Complete
3 - Deleted

PRIORITY CODES
0 - low
1 - medium
2 - high
3 - critical

DIFFICULTY CODES
0 - low
1 - medium
2 - high
3 - critical

#API ENDPIONTS:

# USER ENDPOINTS

#get /verify
Expects: nothing

Used to allow users who refresh page, return from navigation, etc to not have to log in again. Returns a users object {id,username} if they are currently logged in. Returns false if the request does not have a session with a logged in user.

#post /login
Expects: username, password

Authenticates using local strategy. Returns user's object {id, username} on success, returns false on failure.

#get /logout
Expects: nothing
Logs out a user, destroying their passport session. Returns true on success, returns false on failure.

#post /users
Expects: username,password
Creates a new user. Username must be unique, and username and password cannot be blank. Returns user's object {id,username} on success, returns false on failure.

#put /users
Expects: username, password, newpassword
Should update a user's password. Returns a user object on success {id, username}. Should return false on failure.

#get /users/sprint
Expects: sprint_id
Returns all of the users who have access to a given sprint_id. Returns false on failure.

# SPRINT ENDPOINTS

#post /sprints
Expects: title
Creates a new sprint, with the post-er as the owner of the sprint. Then adds the user to the list of sprint-user tupules in the database (table 'sprintusers'). Fails if the person who posts is not logged in. Returns the sprint object on success. Returns false on failure.

#get /sprints
Expects: nothing
Returns a list of the sprints a user has access to. User must be logged in. Returns false on failure.

#get /sprints/isOwner
Expects: sprint_id
Returns true if the user is the owner of a given sprint. Returns false otherwise. Returns false on failure. User must be logged in for this endpoint to function.

#put /sprints/addUser
Expects: username, sprint_id
Adds the specified user to the specified sprint. Only the owner of the sprint can add new users to the sprint. Returns the sprint object on success. Returns false on failure

#put /sprints/removeUser
Expects: user_id, sprint_id
Removes the specified user from the specified sprint. Only the owner of the sprint can remove new users from the sprint. Returns the sprint object on success. Returns false on failure. The owner cannot remove themselves from the sprint.

# TASK ENDPOINTS


#post /tasks
Expects: task object {title,description,sprint_id}
Adds a task to the specified sprint. should require a user to be included in the given sprint under the table 'sprintusers'.

#get /tasks
Expects: sprint_id
Returns all of the tasks a given sprint has. Each task object contains a list of the blockers associated with the task.

#put /tasks
Expects: task object {
    [required key] id, 
    [optional keys] title,
    description,
    user_id,
    status_code,
    eta,
    priority_code,
    difficulty }
Updates the specified task with any of the other fields given. Only specify the fields you want updated, the others will be left unchanged. Returns the new task object on success, returns false on failure..

# BLOCKER ENDPOINTS

#post /blockers
Expects: blocker object {task_id, title, description}
Adds a new blocker to the specified task. Returns the new blocker object on success, returns false on failure.

#put /blockers
Expects: blocker object {
  [required key] id,
  [optional keys] title,
  description,
  task_id,
  status_code
}
Updates a specified blocker object. Returns the new object on success, returns false on failure.


# MISC ENDPOINTS

#get /test
General testing endpoint. do with it what you will




