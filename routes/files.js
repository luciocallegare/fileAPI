const express = require('express')
const router = express.Router()
const { getFilesList } = require('../utils')

router.get('/data', async (req, res) => {
  const records = await getFilesList()
  res.json(records)
})

module.exports = router
