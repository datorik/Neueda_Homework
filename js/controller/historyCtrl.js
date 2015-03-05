angular.module('app').controller('HistoryCtrl', function ($scope, DataService) {
    $scope.model = {};
    $scope.tableSettings = {};
    $scope.eventCount = {};
    $scope.chartData = new Array()
    $scope.tableOrderValue;
    $scope.tableOrderReverse = false;

    $scope.tableOrder = function (order) {
        if (order == $scope.tableOrderValue) {
            $scope.tableOrderReverse = !$scope.tableOrderReverse;
        }
        $scope.tableOrderValue = order;
    };

    $scope.setTableSettings = function (datas) {
        $scope.tableSettings.event = {};
        $scope.tableSettings.requirement = {};
        $scope.tableSettings.component = {};
        $scope.eventCount = {};
        $scope.tableSettings.selectedEvent = "";
        $scope.tableSettings.selectedRequirement = "";
        $scope.tableSettings.selectedComponent = "";
        for (var i = 0; i <= datas.length - 1; i++) {
            var data = datas[i];
            $scope.tableSettings.event[data.event] = data.event;
            $scope.tableSettings.requirement[data.testCase.requirement] = data.testCase.requirement;
            $scope.tableSettings.component[data.testCase.component] = data.testCase.component;
            $scope.setEventCount(data.event);
        }
    };

    $scope.setEventCount = function (event) {
        if ($scope.eventCount[event]) {
            $scope.eventCount[event] = $scope.eventCount[event] + 1;
        } else {
            $scope.eventCount[event] = 1;
        }

    };

    $scope.showTest = function (data) {
        var result = true;
        if ($scope.tableSettings.selectedEvent && $scope.tableSettings.selectedEvent != data.event) {
            result = false;
        }
        if ($scope.tableSettings.selectedRequirement && $scope.tableSettings.selectedRequirement != data.testCase.requirement) {
            result = false;
        }
        if ($scope.tableSettings.selectedComponent && $scope.tableSettings.selectedComponent != data.testCase.component) {
            result = false;
        }
        return result;
    };

    $scope.refresh = function () {
        DataService.getHistory($scope.updateHistory);
    };

    $scope.setChartData = function () {
        var i = 0;
        $scope.chartData = new Array()
        for (var key in $scope.eventCount) {
            $scope.chartData.push({
                value: $scope.eventCount[key],
                color: $scope.getColor(key),
                label: key
            });
            i++;
        }
    };

    $scope.updateHistory = function (data) {
        $scope.model = data;
        $scope.setTableSettings(data);
        $scope.setChartData();
    };

    $scope.getColor = function (key) {
        var color = {};
        color.success = '#2ca02c';
        color.error = '#d62728';
        color.started = '#0088CC';
        if (color[key]) {
            return color[key];
        }
        return '#000000';
    };

    DataService.getHistory($scope.updateHistory);
});