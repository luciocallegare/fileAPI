const express = require('express')
const app = express()
const port = 3000
const files = require('./routes/files')

app.listen(port, () => console.log(`App running on port ${3000}!`))

app.get('/health', (req, res) => {
  res.send('App running succesfully')
})

app.use('/files', files)
app.use((err, req, res, next) => {
  const errBody = err.response.data
  res.status(errBody.status).send(errBody)
})

module.exports = { app }
