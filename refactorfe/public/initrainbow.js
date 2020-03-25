import rainbowSDK from './rainbow-sdk.min.js'; // If you do not use the bundler
// import rainbowSDK from 'rainbow-web-sdk'; // If you use the bundler (for example - Webpack)

var onReady = function onReady() {
    console.log('[Hello World] :: On SDK Ready !');
};

var onLoaded = function onLoaded() {
    console.log('[Hello World] :: On SDK Loaded !');
    var APPID = "f073b5c05e4911ea9a6dcf004cf8c14e";
    var APPSECRET = "qNqw5dEnPTSoBEsxnlj4Mjw2BedJ93gaRXq6KLa8JNHPnNovsMHsB4zjytdP4TVz";
    rainbowSDK
        .initialize(APPID, APPSECRET)
        .then(() => {
            console.log('[Hello World] :: Rainbow SDK is initialized!');
        })
        .catch(err => {
            console.log('[Hello World] :: Something went wrong with the SDK.', err);
        });
};
document.addEventListener(rainbowSDK.RAINBOW_ONREADY, onReady);

document.addEventListener(rainbowSDK.RAINBOW_ONLOADED, onLoaded);
rainbowSDK.start();
rainbowSDK.load();