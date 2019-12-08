const request = require('supertest')("http://api.postcodes.io");
const expect = require('chai').expect;
const Fixtures = require('./fixtures/fixtures');
const ErrorCodeFixture = Fixtures.ErrorCodeFixture;

describe("Search for a postcode", function () {

    it("Should retrieve postcode SW1A 1AA", (done) => {
        request
            .get('/postcodes/' + "SW1A 1AA")
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                expect(res.body.status).to.equal(200);
                expect(res.body.result.postcode).to.equal("SW1A 1AA");
                done();
            });
    });

    it("Should return 400 when no post code is provided", (done) => {
        request
            .get('/postcodes/')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                expect(res.body.status).to.equal(400);
                expect(res.body.error).to.equal("No postcode query submitted. Remember to include query parameter");
                done();
            });
    });

    it("Should return invalid postcode error message", (done) => {
        request
            .get('/postcodes/' + ErrorCodeFixture.invalidPostCode)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                expect(res.body.status).to.equal(404);
                expect(res.body.error).to.equal("Invalid postcode");
                done();
            });
    });
});