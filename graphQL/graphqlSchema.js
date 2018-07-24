const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList
} = require('graphql');

const TaskType = new GraphQLObjectType({
    name : 'Task',
    description: '...',

    fields: () => ({
        title: {
            type: new GraphQLString,
            resolve: (result) => {
                console.log(result);
            }
        }
    })
})

module.exports = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query,',
        description: '...',

        fields: () => ({
            type: TaskType,
            args: {
                id: { type: GraphQLInt }
            }
        })
    })
});