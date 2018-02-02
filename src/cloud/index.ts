import * as Parse from 'parse/node'

Parse.Cloud.define('hello', (req, res) =>
    res.success('Hi')
)
