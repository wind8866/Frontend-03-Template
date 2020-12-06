var assert = require('assert');
// var add = require('../add').add;
// var mul = require('../add').mul;

import { add, mul } from '../add';

describe('add function testing', function () {
    it('1 + 2 should 3', function () {
        assert.equal(add(1, 2), 3);
    });

    it('1 + 3 should 4', function () {
        assert.equal(add(1, 3), 4);
    });

    it('5 * 4 should 20', function () {
        assert.equal(mul(5, 4), 20);
    });
})