let should = require('should');
let request = require('request');
let expect = require('chai').expect;
let assert = require('chai').assert
let baseURL = 'https://fastfoodfast-api.herokuapp.com/api/v2/menu';
var env = require('node-env-file');

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
describe('Post Menu', function(){
    let item;
    let admin;
    beforeEach(function(done){
        item = {
            "name": "testmenu3",
            "price": "100.00",
            "category": "main",
            "image": "testimage.jpg"
        }
        //login before posting menu
        env(__dirname + '/.env');
        request.post({
            url: 'https://fastfoodfast-api.herokuapp.com/api/v2/auth/login',
            body: {"username": process.env.ADMIN_USER, "password": process.env.ADMIN_PASS},
            json: true
          },
        function(error, response, body){
            admin = body['token']
            done();
        });
    })  
    it('Cannot post menu without admin login', function(done){
        request.post({ url: baseURL},
        function(error, response, body){
            expect(response.statusCode).to.equal(401);
            done();
        });
    });
    it('Can post menu', function(done){
        request.post({
            url: baseURL,
            headers: {'x-access-token': admin},
            body: item,
            json: true
          },
        function(error, response, body){
            expect(response.statusCode).to.equal(201);
            done();
        });
    });
})