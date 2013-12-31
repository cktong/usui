'use strict';

describe('Service: Chartsdb', function () {

  // load the service's module
  beforeEach(module('UsuiApp'));

  // instantiate service
  var Chartsdb;
  beforeEach(inject(function (_Chartsdb_) {
    Chartsdb = _Chartsdb_;
  }));

  it('should do something', function () {
    expect(!!Chartsdb).toBe(true);
  });

});
