const axios = require('axios')
const baseUrl = 'https://echo-serv.tbxnet.com'
const headers = {
  Authorization: 'Bearer aSuperSecretKey'
}

const getFile = async (fileName) => {
  const response = await axios.get(`${baseUrl}/v1/secret/file/${fileName}`, { headers })
  const records = response.data
    .split('\n')
    .map(rec => rec.split(','))
    .filter(rec => rec.length >= 4 && !rec.some(item => item === ''))
  records.shift()
  return records
}

const getFilesListNames = async () => {
  const response = await axios.get(`${baseUrl}/v1/secret/files`, { headers })
  return response.data.files
}

const parseJSON = (fileInfo) => {
  return fileInfo.map(info => {
    const parsed = {
      file: info[0],
      lines: {
        text: info[1],
        number: info[2],
        hex: info[3]
      }
    }
    return parsed
  })
}

const getFilesList = async () => {
  const fileListNames = await getFilesListNames()
  const apiCalls = []
  for (const fileName of fileListNames) {
    apiCalls.push(getFile(fileName))
  }
  const fileListParsed = []
  const responses = (await Promise.allSettled(apiCalls)) // eslint-disable-line no-unused-vars
    .filter(res => res.status === 'fulfilled' && res.value.length !== 0)
    .forEach(res => {
      const fileInfo = res.value
      fileListParsed.push(...parseJSON(fileInfo))
    })
  return fileListParsed
}

const filterFileInfoByName = (filesInfo, fileName) => {
  return filesInfo?.filter(fileInfo => fileInfo.file === fileName)
}

module.exports = { getFile, getFilesList, getFilesListNames, filterFileInfoByName }
