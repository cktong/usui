'use strict';

describe('Service: Usimpandas', function () {

  // load the service's module
  beforeEach(module('UsuiApp'));

  // instantiate service
  var Usimpandas;
  beforeEach(inject(function (_Usimpandas_) {
    Usimpandas = _Usimpandas_;
  }));

  it('should do something', function () {
    expect(!!Usimpandas).toBe(true);
  });

});
