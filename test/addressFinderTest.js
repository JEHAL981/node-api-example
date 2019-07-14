const request = require('supertest')("http://api.postcodes.io");
const expect = require('chai').expect;

describe("Search for a postcode", function () {

    it("Should retrieve postcode SW1A 1AA", (done) => {
        request
            .get('/postcodes/' + "SW1A 1AA")
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                expect(res.body.result.postcode).to.equal("SW1A 1AA");
                done();
            });
    })

    it("Should return 400 when no post code is provided", (done) => {
        request
            .get('/postcodes/')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                expect(res.body.status).to.equal(400);
                done();
            });
    })

    it("Should 404 when incorrect post code is provided", function (done) {
        request
            .get('/postcodes/' + 'AB123')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                expect(res.body.status).to.equal(404);
                expect(res.body.error).to.equal("Invalid postcode")
                done();
            });
    })
});