let request = require('request');
let expect = require('chai').expect;
let assert = require('chai').assert
let userURL = 'https://fastfoodfast-api.herokuapp.com/api/v2/auth/users/orders';
let adminURL = 'https://fastfoodfast-api.herokuapp.com/api/v2/orders';
var env = require('node-env-file');

describe('Orders - User', function(){
    let order;
    let user;
    beforeEach(function(done){
        order = { 'items' : {
            'burger': 3,
            'coffee': 1
        }}
        //login before posting order
        // env(__dirname + '/.env');
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
            url: userURL,
            headers: {'x-access-token': user},
            body: order,
            json: true
          },
        function(error, response, body){
            expect(body.Message).to.equal("Order added");
            done();
        });
    })
    it('User can view order history', function(done){
        request.get({
            url: userURL,
            headers: {'x-access-token': user}
          },
        function(error, response, body){
            expect(response.statusCode).to.equal(200);
            done();
        });
    })
})
describe('Orders - Admin', function(){
    let admin;
    beforeEach(function(done){
        //login before accessing orders
        // env(__dirname + '/.env');
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
    it('Admin can view all orders placed', function(done){
        request.get({
            url: adminURL,
            headers: {'x-access-token': admin}
          },
        function(error, response, body){
            expect(response.statusCode).to.equal(200);
            done();
        });
    })
    it('Admin can update status of an order', function(done){
        request.put({
            url: adminURL+'/6',
            headers: {'x-access-token': admin},
            body: {"status": "processing"},
            json: true
          },
        function(error, response, body){
            expect(body.Message).contains("processing")
            done();
        });
    })
})