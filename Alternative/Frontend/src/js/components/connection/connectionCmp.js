angular.module("sample").component("rbxConnection", {
  bindings: {
    name: "@"
  },
  controller: function rbcConnectionCtrl(rainbowSDK, $rootScope, $scope, $http) {
    $scope.isConnected = false;

    $scope.isLoading = false;

    $scope.state = rainbowSDK.connection.getState();

    var handlers = [];

    $scope.createGuest = function() {
      $scope.isLoading = true;

      saveToStorage();
      // send http post to backend to create guest user
      // get back guest user id or promise object(JSON file)
      const body = { 'first_name' : $scope.user.name, 'last_name' : $scope.user.name};
      $http.post("http://localhost:3002/createguest", body).then(function (response) {
        if(response.data) {
          $scope.isLoading = false;
          console.log("success");
        }
      }, function (response) {
          $scope.isLoading = false;
          console.log("fail");
      });
    };

    $scope.signout = function() {
      // send http post to backend to delete guest user
      $scope.isLoading = true;
    };

    var saveToStorage = function() {
      sessionStorage.connection = angular.toJson($scope.user);
    };

    var readFromStorage = function() {
      if (sessionStorage.connection) {
        $scope.user = angular.fromJson(sessionStorage.connection);
      } else {
        $scope.user = { name: "" };
      }
    };

    var onConnectionStateChangeEvent = function onConnectionStateChangeEvent(
      event
    ) {
      $scope.state = rainbowSDK.connection.getState();
    };

    this.$onInit = function() {
      // Subscribe to XMPP connection change
      handlers.push(
        document.addEventListener(
          rainbowSDK.connection.RAINBOW_ONCONNECTIONSTATECHANGED,
          onConnectionStateChangeEvent
        )
      );
    };

    this.$onDestroy = function() {
      var handler = handlers.pop();
      while (handler) {
        handler();
        handler = handlers.pop();
      }
    };

    var initialize = function() {
      readFromStorage();
    };

    initialize();
  },
  templateUrl: "./src/js/components/connection/connectionCmp.template.html"
});
