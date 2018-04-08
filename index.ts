import { Application } from 'express'
import schema from './src/graphql'
import * as GraphQLHTTP from 'express-graphql'
import * as Parse from 'parse'
import express = require( 'express' )

const ParseServer = require('parse-server').ParseServer
const path = require('path')
const MASTER_KEY = process.env.MASTER_KEY || 'masterKey'
const CLOUD_CODE_MAIN = process.env.CLOUD_CODE_MAIN || __dirname + '/src/cloud'
const APP_ID = process.env.APP_ID || 'myAppId'
const port = process.env.PORT || 1337
const SERVER_URL = process.env.SERVER_URL || `http://localhost:${port}/parse`  // Don't forget to change to https if needed
let DATABASE_URI = process.env.DATABASE_URI || process.env.MONGODB_URI

if (!DATABASE_URI) {
    DATABASE_URI = 'mongodb://localhost:27017/dev'
    console.log(`DATABASE_URI not specified, falling back to ${DATABASE_URI}`)
}

const api = new ParseServer({
    databaseURI: DATABASE_URI,
    cloud: CLOUD_CODE_MAIN,
    appId: APP_ID,
    masterKey: MASTER_KEY,
    serverURL: SERVER_URL,
    liveQuery: {
        classNames: [
            'Posts',
            'Comments',
        ], // List of classes to support for query subscriptions
    },
})
// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey

const app: Application = express()

// Serve static assets from the /public folder
app.use('/public', express.static(path.join(__dirname, '/public')))

// Serve the Parse API on the /parse URL prefix
const mountPath = process.env.PARSE_MOUNT || '/parse'
app.use(mountPath, api)

// Parse Server plays nicely with the rest of your web routes
app.get('/', (req, res) => res
    .status(200)
    .send('I dream of being a website.  Please star the parse-server repo on GitHub!'))

// There will be a test page available on the /test path of your server url
// Remove this before launching your app
app.get('/test', (req, res) => res.sendFile(path.join(__dirname, '/public/test.html')))

//Initialize Parse
Parse.initialize(process.env.APP_ID || 'myAppId')
Parse.serverURL = process.env.SERVER_URL || 'http://localhost:1337/parse'
Parse.masterKey = process.env.MASTER_KEY

//GraphQL
app.use('/graphql', GraphQLHTTP((request) => {
        return {
            graphiql: true,
            pretty: true,
            schema: schema,
            context: {
                sessionToken: 'r:662feeb261908e475d62233d2080269e' || request.headers[ 'x-parse-session-token' ],
            },
        }
    }),
)


const httpServer = require('http').createServer(app)
httpServer.listen(port, () => console.log(`parse-server-example running on ${SERVER_URL}`))

// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer)
