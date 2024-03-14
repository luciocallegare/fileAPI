const express = require('express')
const app = express()
const port = 3000
const files = require('./routes/files')
const cors = require('cors')

app.listen(port, () => console.log(`App running on port ${3000}!`))
app.use(cors())


app.use((err,req,res,next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
})

app.get('/health', (req, res) => {
  res.send('App running succesfully')
})

app.use('/files', files)
app.use((err, req, res, next) => {
  const errBody = err.response.data
  res.status(errBody.status).send(errBody)
})

module.exports = { app }
