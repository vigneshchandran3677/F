const routes = require('express').Router()
const create = require('./create')
const read = require('./read')
const del = require('./delete')

routes.use(create)
routes.use(read)
routes.use(del)

module.exports = routes