MVP SPEC

Datadabase MYSQL

Server EXPRESS

#post tasks
Expects:
* title
* description

Automatically adds created_at and updated_at

Returns:
On Success - 201 - Entire task object from table
On Failure - send correct error code and "false" as the data body

#get tasks
Expects:
no query params

Returns:
On Success - 200 - Array of all task objects
On Failure - send correct error code and "false" as the data body

#put tasks
Expects:
* A task object with key:val pairs which will be updated
use the "id" to find the task in our db

Returns:
On Success - 200 - Entire task object from table
On Failure - send correct error code and "false" as the data body

#post blockers
Expects:
* task_id
* title
* desription
* (optional) status_code

Returns:
On Success - 201 - Entire blocker object from table
On Failure - send correct error code and "false" as the data body

#get blockers
Expects:
* task_id

Returns:
On Success - 200 - Array of the blocker objects a given task has
On Failure - send correct error code and "false" as the data body

#put blockers
Expects:
* A blocker object with key:val pairs which will be updated
 use the "id" to find the blocker in our db

Returns:
On Success - 200 - Entire blocker object from table
On Failure - send correct error code and "false" as the data body

#post users
Expects:
* username
* password

Returns:
On Success - 201 - Entire user object from table
On Failure - send correct error code and "false" as the data body

#get users
Expects: nothing

Returns:
On Success - Array of all users with their id and username (no passwords!)
On Failure - send correct error code and "false" as the data body




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

