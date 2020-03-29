var sdkFromSDKJS = require ('../sdk.js');

describe ("sdk.js Test", function() {
    describe ("createGuest Test", function() {
        before (function() {
            sdk.SDK.createGuest ("Seyong", "Park", "General", "resFE");
        });
        it ("First name should be Seyong", function() {
            if (log.createGuest.first_name == "Seyong") {
                done();
            }
        });
    });
});