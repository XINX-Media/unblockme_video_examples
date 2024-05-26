const gql = require('graphql-tag')

//primitive types include String, Int, Float, Boolean, and ID 

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        posts: [Post]!
    }
    type Post {
        _id: ID!
        title: String!
        body: String!
        userId: ID!
        comments: [Comment]
    }
    type Comment {
        postId: ID!
        body: String!
    }

    type Query {
        users: [User]
        posts: [Post]
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): User

        addPost(title: String!, body: String!, userId: ID!): Post

        updatePost(_id: ID!, title: String, body: String): Post

        deleteUser(_id: ID!): User

        deletePost(_id: ID!): Post

        addComment(postId: ID!, body: String!): Comment
    }

    

`

module.exports = typeDefs