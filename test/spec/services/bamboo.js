'use strict';

describe('Service: Bamboo', function () {

  // load the service's module
  beforeEach(module('UsuiApp'));

  // instantiate service
  var Bamboo;
  beforeEach(inject(function (_Bamboo_) {
    Bamboo = _Bamboo_;
  }));

  it('should do something', function () {
    expect(!!Bamboo).toBe(true);
  });

});
