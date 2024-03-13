const express = require('express')
const router = express.Router()
const { getOneFileInfo, getFilesList, getFilesListNames } = require('../utils/fileAux')

router.get('/data', async (req, res, next) => {
  let records
  try {
    if (req?.query?.fileName) {
      records = await getOneFileInfo(req?.query?.fileName)
    } else {
      records = await getFilesList()
    }
    res.json(records)
  } catch (err) {
    next(err)
  }
})

router.get('/list', async (req, res, next) => {
  try {
    res.json(await getFilesListNames())
  } catch (err) {
    next(err)
  }
})

module.exports = router
