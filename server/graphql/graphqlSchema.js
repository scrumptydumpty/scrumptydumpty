const { knex } = require('../../database/knex')
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLID
} = require('graphql');

const TaskType = new GraphQLObjectType({
    name : 'Task',
    description: 'This is a task object',

    fields: () => ({
        id: {type: GraphQLID},
        created_at: {type: GraphQLString},
        updated_at: {type: GraphQLString},
        sprint_id: {type: GraphQLInt},
        title: {type: GraphQLString},
        description: {type: GraphQLString},
        user_id: {type: GraphQLInt},
        status_code: {type: GraphQLInt},
        eta: {type: GraphQLString},
        priority_code: {type: GraphQLInt},
        difficulty: {type: GraphQLInt},
        blockers: {
            type: new GraphQLList(BlockerType),
            resolve(parent, args) {
                return knex("blockers")
                    .select()
                    .where({"task_id": parent.id});
            }
        }
    })
});

const BlockerType = new GraphQLObjectType({
    name: 'Blocker',
    description: 'This is a blocker object',
    
    fields: () => ({
        id: {type: GraphQLID},
        created_at: {type: GraphQLString},
        updated_at: {type: GraphQLString},
        title: {type: GraphQLString},
        description: {type: GraphQLString},
        task_id: {type: GraphQLInt},
        status_code: {type: GraphQLInt}
    })
})

const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'This is a user object',

    fields: () => ({
        id: {type: GraphQLID},
        created_at: {type: GraphQLString},
        updated_at: {type: GraphQLString},
        username: {type: GraphQLString},
        password: {type: GraphQLString},
        sprintsIOwn: {
            type: new GraphQLList(SprintType),
            resolve(parent, args) {
                return knex("sprints")
                    .select()
                    .where({"owner_id": parent.id})
            }
        },
        sprints: {
            type: new GraphQLList(SprintUsersType),
            resolve(parent, args) {
                return knex("sprintusers")
                    .select()
                    .where({"user_id": parent.id})
            }
        }
    })
})

const SprintType = new GraphQLObjectType({
    name: 'Sprint',
    description: 'This is a sprint object',

    fields: () => ({
        id: {type: GraphQLID},
        created_at: {type: GraphQLString},
        updated_at: {type: GraphQLString},
        title: {type: GraphQLString},
        owner_id: {type: GraphQLInt}
    })
})

const SprintTasksType = new GraphQLObjectType({
    name: 'SprintTask',
    description: 'This is a sprint task object',

    fields: () => ({
        id: {type: GraphQLID},
        created_at: {type: GraphQLString},
        updated_at: {type: GraphQLString},
        task_id: {type: GraphQLInt},
        sprint_id: {type: GraphQLInt}
    })
})

const SprintUsersType = new GraphQLObjectType({
    name: 'SprintUser',
    description: 'This is a sprint user object',

    fields: () => ({
        id: {type: GraphQLID},
        created_at: {type: GraphQLString},
        updated_at: {type: GraphQLString},
        user_id: {type: GraphQLInt},
        sprint_id: {type: GraphQLInt},
        sprint: {
            type: SprintType,
            resolve(parent, args) {
                return knex("sprints")
                    .select()
                    .where({"id": parent.sprint_id})
                    .then((result)=> {
                        return result[0];
                    })
            }
        }
    })
})

//this is the root query. It is how a user enters the graph
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        task: {
            type: TaskType,
            args: {id: {type: GraphQLString}},
            resolve(parent, args) {
                if (args.spring_id)
                return knex("tasks").select()
                    .where({'id': args.id})
                    .then((result)=>{return result[0]});
            }
        },
        tasks: {
            type: new GraphQLList(TaskType),
            args: {sprint_id: {type: GraphQLString}},
            resolve(parent, args) {
                // return tasks
                if (args.sprint_id) {
                    return knex("tasks")
                        .select()
                        .where({"sprint_id": args.sprint_id});
                }
                return knex("tasks").select();
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                //return users
                return knex("users").select();
            }
        },
        sprints: {
            type: new GraphQLList(SprintType),
            args: {owner_id: {type: GraphQLString}},
            resolve(parent, args) {
                if (args.owner_id) {
                    return knex("sprints")
                        .select()
                        .where({"owner_id": args.owner_id});
                }
                return knex("sprints").select();
            }
        },
        blockers: {
            type: new GraphQLList(BlockerType),
            args: {task_id: {type: GraphQLInt}},
            resolve(parent, args) {
                if(args.task_id) {
                    return knex("blockers")
                        .select()
                        .where({"task_id": args.task_id});
                }
                return knex("blockers").select();
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addTask: {
            type: TaskType,
            args: {
                title: {type: GraphQLString},
                description: {type: GraphQLString}
            },
            resolve(parent, args) {
                //add args to database
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});