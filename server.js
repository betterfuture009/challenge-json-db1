const express = require('express')
const bodyParser = require('body-parser')

const api = require('./api')
const middleware = require('./middleware')

const PORT = process.env.PORT || 1337

const app = express()

app.use(bodyParser.json())

app.get('/health', api.getHealth)

// Retrieves property name by student id
app.get('/:id', api.getFile)

// Retrieves property name by student id
app.get('/:id/*', api.queryFilter, api.getProperty)

// Put or Create property name by student id
app.put('/:id/*', api.queryFilter, api.update)

// Delete property name by student id
app.delete('/:id', api.removeById)

// Delete property name by student id
app.delete('/:id/*', api.removeProperty)

app.use(middleware.handleError) 
app.use(middleware.notFound)

const server = app.listen(PORT, () =>
  console.log(`Server listening on port ${PORT}`)
)

if (require.main !== module) {
  module.exports = server
}
