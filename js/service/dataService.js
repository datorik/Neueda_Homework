angular.module('app').factory('DataService', ['$http', function ($http) {
    return{
        getHistory: function (updateHistory) {
            $http.get('http://testevents.neueda.lv/history').
                success(function (data) {
                    updateHistory(data);
                }).
                error(function (data, status, headers, config) {
                    //TODO log
                });
        }
    }
}]);