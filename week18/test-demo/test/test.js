var assert = require('assert');
var add = require('../add');


describe('add function testing', function () {
    it('1 + 2 should 3', function () {
        assert.equal(add(1, 2), 3);
    });

    it('1 + 3 should 4', function () {
        assert.equal(add(1, 3), 4);
    });
})