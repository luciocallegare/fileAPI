const express = require('express')
const router = express.Router()
const { getFilesList, getFilesListNames, filterFileInfoByName } = require('../utils')

router.get('/data', async (req, res) => {
  let records = await getFilesList()
  if (req?.query?.fileName) {
    records = filterFileInfoByName(records, req.query.fileName)
  }
  res.json(records)
})

router.get('/list', async (req, res) => {
  res.json(await getFilesListNames())
})

module.exports = router
