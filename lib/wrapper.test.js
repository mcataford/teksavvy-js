'use strict';

var _wrapper = require('./wrapper');

var _wrapper2 = _interopRequireDefault(_wrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('TeksavvyAPIWrapper', function () {
  var mockKey = 'ABCDE';

  describe('Wrapper object setup', function () {
    it('Default headers contain the API key', function () {
      var wrapper = new _wrapper2.default(mockKey);
      var headers = wrapper._getDefaultHeaders();

      var expectedHeaders = {
        'Teksavvy-APIKey': mockKey
      };

      expect(headers).toEqual(expectedHeaders);
    });
  });
});