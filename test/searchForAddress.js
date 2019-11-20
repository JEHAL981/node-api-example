const request = require('supertest')("http://api.postcodes.io");
const expect = require('chai').expect;
const Fixtures = require('./fixtures/fixtures');
const PostcodeSearchFixture = Fixtures.PostcodeSearchFixture;
const ErrorCodeFixture = Fixtures.ErrorCodeFixture;

describe("Postcode search", () => {
    it("Should retieve list of post codes", (done) => {
        request
            .post('/postcodes')
            .send(PostcodeSearchFixture.postcodeSearch)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                expect(res.body.status).to.equal(200);
                for (let i = 0; i < res.body.result.length; i++) {
                    expect(res.body.result[i].query).to.equal(res.body.result[i].result.postcode);
                }
                done();
            });
    });

    it("Should return null when invalid post code is submitted", (done) => {
        request
            .post('/postcodes')
            .send(ErrorCodeFixture.errorCode)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                expect(res.body.status).to.equal(200);
                expect(res.body.result[0].result).to.equal(null);
                done();
            });
    });
});