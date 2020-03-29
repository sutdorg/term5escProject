describe('name', function() {
    before(function() {
      // excuted before test suite
    });
  
    after(function() {
      // excuted after test suite
    });
  
    beforeEach(function() {
        // excuted before every test
        var request = require ('request');
        request ('http://www.google.com', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log (body);
            }
        });
    });
  
    afterEach(function() {
        // excuted after every test
    });
    
    describe('#example', function() {
        it('this is a test.', function() {
            // write test logic
        });
    });
});