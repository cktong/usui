'use strict';

describe('Controller: DisplayCtrl', function () {

  // load the controller's module
  beforeEach(module('usuiApp'));

  var DisplayCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DisplayCtrl = $controller('DisplayCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
