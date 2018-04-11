/**
* pageExists
*
* Check whether the given component exist in the page directory
*/

const fs = require('fs')
const pageComponents = fs.readdirSync('src/graphql/resources')

function graphqlExist(comp) {
    return pageComponents.indexOf(comp) >= 0
}

module.exports = graphqlExist
