function submitSkill() {

}

function enter_form() {
    rainbowSetup();
    var formDiv = document.getElementsByClassName("form")[0];
    formDiv.setAttribute("style", "display: block;");
    var button = document.getElementsByClassName("enter_button")[0];
    button.setAttribute("style", "display:none;");
    var button = document.getElementsByClassName("exit_button")[0];
    button.setAttribute("style", "display:block;");
}

function exit_form() {
    var formDiv = document.getElementsByClassName("form")[0];
    formDiv.setAttribute("style", "display: none;");
    var button = document.getElementsByClassName("enter_button")[0];
    button.setAttribute("style", "display:block;");
    var button = document.getElementsByClassName("exit_button")[0];
    button.setAttribute("style", "display:none;");
}

function rainbowSetup() {
    console.log("[DEMO] :: Rainbow Application started!");


    // Update the variables below with your applicationID and applicationSecret strings
    var applicationID = "f073b5c05e4911ea9a6dcf004cf8c14e",
    applicationSecret = "qNqw5dEnPTSoBEsxnlj4Mjw2BedJ93gaRXq6KLa8JNHPnNovsMHsB4zjytdP4TVz";

    /* Bootstrap the SDK */
    angular.bootstrap(document, ["sdk"]).get("rainbowSDK");

    /* Callback for handling the event 'RAINBOW_ONREADY' */
    var onReady = function onReady() {
        console.log("[DEMO] :: On SDK Ready !");
        // do something when the SDK is ready
    };

    /* Callback for handling the event 'RAINBOW_ONCONNECTIONSTATECHANGED' */
    var onLoaded = function onLoaded() {
        console.log("[DEMO] :: On SDK Loaded !");

        // Activate full SDK log
        rainbowSDK.setVerboseLog(true);

        rainbowSDK
        .initialize(applicationID, applicationSecret)
        .then(function() {
            console.log("[DEMO] :: Rainbow SDK is initialized!");
        })
        .catch(function(err) {
            console.log("[DEMO] :: Something went wrong with the SDK...", err);
        });
    };

    /* Listen to the SDK event RAINBOW_ONREADY */
    document.addEventListener(rainbowSDK.RAINBOW_ONREADY, onReady)

    /* Listen to the SDK event RAINBOW_ONLOADED */
    document.addEventListener(rainbowSDK.RAINBOW_ONLOADED, onLoaded)

    /* Load the SDK */
    rainbowSDK.load();
}
