const graphqlGenerator = require('./graphql')
const capitalizeFirstLetter = require('./utils/string')

module.exports = (plop) => {
    plop.setGenerator('graphql', graphqlGenerator)
    plop.addHelper('pascal', capitalizeFirstLetter)
    plop.addHelper('curly', (object, open) => (open ? '{' : '}'))
    plop.addHelper('capitalize', (name) => name.toUpperCase())
}
