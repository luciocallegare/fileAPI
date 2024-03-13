/* eslint-disable */

const chai = require('chai')
const chaiHttp = require('chai-http')
const chaiEach = require('chai-each')
const { app } = require('../index')

chai.use(chaiHttp)
chai.use(chaiEach)
chai.should()

describe('Files API', () => {
  describe('GET /files/data', () => {
    it('It should get all the files in the server', (done) => {
      chai.request(app)
        .get('/files/data')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('array')
          res.body.should.each.have.all.keys('file', 'lines')
          res.body.should.each.have.nested.all.property('lines.text')
          res.body.should.each.have.nested.all.property('lines.number')
          res.body.should.each.have.nested.all.property('lines.hex')
          done()
        })
    })
  })

  describe('GET /files/data?fileName=test18.csv', () => {
    it('It should get all the file info from test18.csv', (done) => {
      chai.request(app)
        .get('/files/data?fileName=test18.csv')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('array')
          res.body.length.should.be.eq(5)
          res.body.should.each.have.all.keys('file', 'lines')
          res.body.should.each.have.nested.all.property('lines.text')
          res.body.should.each.have.nested.all.property('lines.number')
          res.body.should.each.have.nested.all.property('lines.hex')
          done()
        })
    })
  })

  describe('GET /files/data?fileName=test4.csv --> File with error', () => {
    it('It should get status 500', (done) => {
      chai.request(app)
        .get('/files/data?fileName=test4.csv')
        .end((err, res) => {
          res.should.have.status(500)
          done()
        })
    })
  })

  describe('GET /files/data?fileName=test5.csv --> File not found', () => {
    it('It should get status 404', (done) => {
      chai.request(app)
        .get('/files/data?fileName=test5.csv')
        .end((err, res) => {
          res.should.have.status(404)
          done()
        })
    })
  })

  describe('GET /files/list', () => {
    it('It should list all file names', (done) => {
      chai.request(app)
        .get('/files/list')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('array')
          res.body.forEach(name => {
            name.should.be.a('string')
          })
          done()
        })
    })
  })
})
