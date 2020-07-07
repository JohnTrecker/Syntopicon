import { rest_service, resetdb } from '../common'
import should from 'should'

describe('read', function () {
  before(function (done) { resetdb(); done() })
  after(function (done) { resetdb(); done() })

  it('basic', function (done) {
    rest_service()
      .get('/topics?select=id,name')
      .expect('Content-Type', /json/)
      .expect(200, done)
      .expect(r => {
        r.body.length.should.equal(6)
        r.body[0].name.should.equal('Angel')
      })
  })

  it.skip('by primary key', function (done) {
    rest_service()
      .get('/topics/1?select=id,name')
      .expect(200, done)
      .expect(r => {
        r.body.id.should.equal('1')
        r.body.name.should.equal('Angel')
      })
  })
})
