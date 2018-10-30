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
describe('Menu Management', function(){
    let newItem, editItem, admin;
    beforeEach(function(done){
        newItem = {
            "name": "newmenutest1",
            "price": "100.00",
            "category": "main",
            "image": "testimage.jpg"
        }
        editItem = {
            "name": "editmenu",
            "price": "100.00",
            "category": "main",
            "image": "testimage.jpg"
        }
        //login before posting menu
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
    it('Cannot post menu without admin login', function(done){
        request.post({ url: baseURL},
        function(error, response, body){
            expect(response.statusCode).to.equal(401);
            done();
        });
    });
    it('Admin can post menu', function(done){
        request.post({
            url: baseURL,
            headers: {'x-access-token': admin},
            body: newItem,
            json: true
          },
        function(error, response, body){
            expect(response.statusCode).to.equal(201);
            done();
        });
    });
    it('Admin can edit menu', function(done){
        request.put({
            url: baseURL+'/62',
            headers: {'x-access-token': admin},
            body: editItem,
            json: true
          },
        function(error, response, body){
            expect(response.statusCode).to.equal(200);
            done();
        });
    });
    it('Deleting missing menu returns 404', function(done){
        request.delete({
            url: baseURL+'/64',
            headers: {'x-access-token': admin}
          },
        function(error, response, body){
            expect(response.statusCode).to.equal(404);
            done();
        });
    });
})