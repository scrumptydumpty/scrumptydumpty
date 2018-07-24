//in server file
const express = require('express')
const graphqlHTTP = require('express-graphql')
const app = express()

const schema = require('./schema')
const port = process.env.PORT || 4000;

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(port, () => console.log(`Listening on port ${port}`))
console.log('Listening ...')

//in schema file
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList
} = require('graphql')

const BookType = new GraphQLObjectType({
    name: 'Book',
    description: '...',

    fields: () => ({
        title: {
            type: GraphQLString
        },
        isbn: {
            type: GraphQLString
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    description: '...',

    fields: () => ({
        name: {
            type: GraphQLString
        },
        books: {
            type: new GraphQLList(BookType),
            resolve: xml =>
                xml.GoodReadsResponse.author[0].books[0].book
        }
    })
})

module.exports = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        description: '...',

        fields: () => ({
            author: {
                type: AuthorType,
                args: {
                    id: {
                        type: GraphQLInt
                    }
                },
                resolve: (root, args) => fetch(`https://somewebsite`)
                .then(response => response.text())
            }
        })
    })
})