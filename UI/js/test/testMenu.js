let should = require('should');
let request = require('request');
let expect = require('chai').expect;
let assert = require('chai').assert
let baseURL = 'https://fastfoodfast-api.herokuapp.com/api/v2/menu';

describe('Fetch Menu', function(){
    it('Returns full menu', function(done){
        request.get({ url: baseURL},
        function(error, response, body){
            expect(response.statusCode).to.equal(200);
            done();
        });
    });
    it('Menu is array', function(done){
        request.get({ url: baseURL},
        function(error, response, body){
            assert.equal(Array.isArray(JSON.parse(body)['Full Menu']), true)
            done();
        });
    });
    it('Menu is not empty', function(done){
        request.get({ url: baseURL},
        function(error, response, body){
            len = JSON.parse(body)['Full Menu'].length
            assert.isAbove(len, 1)
            done();
        });
    });
    it('Wrong url returns 404', function(done){
        request.get({ url: baseURL+"/nowhere"},
        function(error, response, body){
            expect(response.statusCode).to.equal(404);
            done();
        });
    });
});
