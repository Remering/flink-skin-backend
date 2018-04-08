export const todoType = `
    type Todo {
        id: ID!
        text: String!
        isComplete: Boolean!,
        createdAt: Float!
        updatedAt: Float!
    }
    
    input TodoInput {
        text: String!
        isComplete: Boolean
    }
`

export const todoQueries = `
    Todo(id: ID!): Todo
    Todos(first: Int, offset: Int): [ Todo! ]!
`;

export const todoMutations = `
    TodoCreate(input: TodoInput!): Todo
    TodoUpdate(input: TodoInput!): Todo
    TodoDelete(id: ID!): Boolean
    TodoToggle(id: ID!): Todo
`