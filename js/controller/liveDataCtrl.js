angular.module('app').controller('LiveDataCtrl',function ($scope, socketio) {
    $scope.model = "";
    socketio.on('test', function (data) {
        $scope.model = data;
    });
}).factory('socketio', ['$rootScope', function ($rootScope) {
        var socket = io('http://testevents.neueda.lv:80', {
            path: '/live'
        });
        return {
            on: function (eventName, callback) {
                socket.on(eventName, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        callback.apply(socket, args);
                    });
                });
            },
            emit: function (eventName, data, callback) {
                socket.emit(eventName, data, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        if (callback) {
                            callback.apply(socket, args);
                        }
                    });
                })
            }
        };
    }]);