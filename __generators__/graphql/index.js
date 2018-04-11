/**
 * Component Generator
 */

const folderExist = require('../utils/graphqlExist')
module.exports = {
    description: 'Add an Grapqhl Resource',
    prompts: [
        {
            type: 'input',
            name: 'name',
            message: 'Graphql Resource name',
            validate: (value) => {
                if ((/.+/).test(value)) {
                    return folderExist(value, 'resources')
                        ? 'A resource name already exists'
                        : true
                }
                return 'The name is required'
            },
        },
    ],
    actions: () => ([
        {
            type: 'add',
            path: `../src/graphql/resources/{{properCase name}}/{{properCase name}}.resolver.ts`,
            templateFile: './graphql/templates/resource.resolver.hbs',
            abortOnFail: true,
        },
        {
            type: 'add',
            path: `../src/graphql/resources/{{properCase name}}/{{properCase name}}.schema.ts`,
            templateFile: './graphql/templates/resource.schema.hbs',
            abortOnFail: true,
        },
        {
            type: 'modify',
            path: `../src/graphql/index.ts`,
            pattern: /\/\/ insert import\n/g,
            templateFile: './graphql/templates/import.hbs',
        },
        {
            type: 'modify',
            path: `../src/graphql/index.ts`,
            pattern: /\/\/ insert resolver\n/g,
            templateFile: './graphql/templates/importResolver.hbs',
        },
        {
            type: 'modify',
            path: `../src/graphql/index.ts`,
            pattern: /\/\/ insert type\n/g,
            templateFile: './graphql/templates/importType.hbs',
        },
        {
            type: 'modify',
            path: `../src/graphql/index.ts`,
            pattern: /type Mutation {\n/g,
            templateFile: './graphql/templates/importMutation.hbs',
        },
        {
            type: 'modify',
            path: `../src/graphql/index.ts`,
            pattern: /type Query {\n/g,
            templateFile: './graphql/templates/importQuery.hbs',
        },
    ])
}
