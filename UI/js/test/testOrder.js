let should = require('should');
let request = require('request');
let expect = require('chai').expect;
let assert = require('chai').assert
let baseURL = 'https://fastfoodfast-api.herokuapp.com/api/v2/auth/users/orders';
var env = require('node-env-file');

describe('Orders - User', function(){
    let order;
    let user;
    beforeEach(function(done){
        order = { 'items' : {
            'burger': 3,
            'coffee': 1
        }}
        //login before posting menu
        env(__dirname + '/.env');
        request.post({
            url: 'https://fastfoodfast-api.herokuapp.com/api/v2/auth/login',
            body: {"username": process.env.TEST_USER, "password": process.env.TEST_PASS},
            json: true
          },
        function(error, response, body){
            user = body['token']
            done();
        });
    })
    it('User can post order', function(done){
        request.post({
            url: baseURL,
            headers: {'x-access-token': user},
            body: order,
            json: true
          },
        function(error, response, body){
            expect(response.statusCode).to.equal(201);
            done();
        });
    })
    it('User can view order history', function(done){
        request.get({
            url: baseURL,
            headers: {'x-access-token': user}
          },
        function(error, response, body){
            expect(response.statusCode).to.equal(200);
            done();
        });
    })
})