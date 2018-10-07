'use strict';

var _wrapper = require('./wrapper');

var _wrapper2 = _interopRequireDefault(_wrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var w = new _wrapper2.default('7E229B47B288ECA6299261E9FD0EF300');
w.usageRecords().then(function (d) {
  console.log(d);
});