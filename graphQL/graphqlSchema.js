const graphql = require('graphql');
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
            type: BlockerType,
            resolve(parent, args) {
                let result 
                blockers.forEach((val)=>{
                    if (parent.id === val.task_id) {
                        result = val;
                    }
                })
                return result;
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
        task_id: {type: GraphQLID},
        status_code: {type: GraphQLInt}
    })
})

//dummy data
var tasks = [
    {id: 1000, title: "This is a task", description: "This is a task description"},
    {id: 1001, title: "This is another task", description: "This is another task description"}
];

var blockers = [
    {id: 1000, title: "This is a blocker", description: "This is a blocker description", task_id: 1000},
    {id: 1001, title: "This is another blocker", description: "This is another blocker description", task_id: 1001}
];

//this is the root query. It is how a user enters the graph
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        tasks: {
            type: TaskType,
            args: {id: {type: GraphQLInt}},
            resolve(parent, args) {
                //code to get data from db/other source
                let result = {};
                tasks.forEach((val)=>{
                    if (val.id === args.id) {
                        result = val;
                    }
                })
                return result;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});