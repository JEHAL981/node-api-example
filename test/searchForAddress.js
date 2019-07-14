const request = require('supertest')("http://api.postcodes.io");
const expect = require('chai').expect

describe("Postcode search", () => {
    it("Should retieve list of post codes", (done) => {
        request
            .post('/postcodes')
            .send({
                "postcodes": [
                    "SW1A 0AA",
                    "SW1A 0PW",
                    "SW1A 1AA"]
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                for (let i = 0; i < res.body.result.length; i++) {
                    expect(res.body.result[i].query).to.equal(res.body.result[i].result.postcode)
                }
                done();
            });
    });

    it("Should return null when invalid post code is submitted", function (done) {
        request
            .post('/postcodes')
            .send({
                "postcodes": ["AB123"]
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                expect(res.body.result[0].result).to.equal(null)
                done();
            });
    })
});