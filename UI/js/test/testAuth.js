const assert = require('chai').assert;
const signUp = require('../signUp');

describe('signUp', function(e){
    it('signup should return success message', function(){
        assert.equal(signUp(), 'registered success');
    });
});