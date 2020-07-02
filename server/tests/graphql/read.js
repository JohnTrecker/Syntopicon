import { graphql_simple, resetdb } from '../common'
import should from 'should'
const graphql = graphql_simple

describe('read', function() {

  before(function(done){ resetdb(); done(); });
  after(function(done){ resetdb(); done(); });

  it('can get all topics', function(done) {
    graphql()
      .withRole('webuser')
      .send({ 
        query: `{ topics { id name } }`
      })
      .expect('Content-Type', /json/)
      .expect(200, done)
      .expect( r => {
        // console.log(r.body)
        r.body.data.topics.length.should.equal(6);
      })
      
  });

  it('can get topics and subtopics', function(done) {
    graphql()
      .withRole('webuser')
      .send({ 
        query: `
          {
            topics{
              id
              name
              subtopics(order: {column: "id", direction: asc}){
                id
                description
              }
            }
          }

        `
      })
      .expect('Content-Type', /json/)
      .expect(200, done)
      .expect( r => {
        r.body.data.topics.length.should.equal(6);
        r.body.data.topics[0].subtopics.length.should.equal(6);
        r.body.data.topics[0].name.should.equal("Angel");
        r.body.data.topics[0].subtopics[3].description.should.equal("Our knowledge of immaterial beings");
      })
      
  });

  it('can get topics and foreign key relations', function(done) {
    graphql()
      .withRole('webuser')
      .send({ 
        query: `
          {
            topics{
              id
              name
              works(where: {author: {eq: "Homer"}}){
                id
                title
              }
            }
          }

        `
      })
      .expect('Content-Type', /json/)
      .expect(200, done)
      .expect( r => {
        r.body.data.topics.length.should.equal(6);
        r.body.data.topics[0].works.length.should.equal(6);
        r.body.data.topics[0].name.should.equal("Angel");
        r.body.data.topics[0].works[1].title.should.equal("The Iliad");
      })
      
  });

});






